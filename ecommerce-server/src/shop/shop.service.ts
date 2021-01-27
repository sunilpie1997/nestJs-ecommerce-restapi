import { Injectable } from '@nestjs/common';
import { RetailerService } from 'src/retailer/retailer.service';
import { Shop } from 'src/retailer/interfaces/shop';
import { Category } from 'src/shop/interfaces/category';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryErrors } from 'src/shop/errors/category.errors';
import { AddProductDto } from 'src/shop/dto/add-product.dto';
import { CategoryConstraints } from 'src/shop/constraints/category';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/interfaces/user';
import { UserErrors } from 'src/user/errors/user.errors';

@Injectable()
export class ShopService {

    constructor(
        private retailerService:RetailerService,
        private readonly userService:UserService,
        @InjectModel('Category') private readonly CategoryModel: Model<Category>,

        ){}

    async getAllCategories(email:String,shop_name:String):Promise<Map<String,String>>
    {
        const shop:Shop=await this.retailerService.getParticularShop(email,shop_name);


                var categories:Map<String,String>=shop.categories;


                return categories;



            
        }

    async getProductsByCategory(email:String,shop_name:String,category_name:String):Promise<Category>
    {

        const shop:Shop=await this.retailerService.getParticularShop(email,shop_name);

                var categories:Map<String,String>=shop.categories;

            
                
                if(categories.has(category_name))
                {
                    const categoryObjectId:String=categories.get(category_name);

                    const category=this.CategoryModel.findOne({_id:categoryObjectId}).exec();

                    return category;


                    
                }
                else
                {
                    throw new Error(CategoryErrors.DOES_NOT_EXIST);
                }

                

    }


    async getShopDetails(email:String,shop_name:String):Promise<Shop>
    {

        const shop:Shop=await this.retailerService.getParticularShop(email,shop_name);
        return shop;
    }

/* add transaction in future as bot sides needs to be saved */

    async addCategory(email:String,shop_name:String,category_name:String)
    {

        var saved_category_id:String=null;
        var status:Boolean=null;

        try
        {

        const shop:Shop=await this.retailerService.getParticularShop(email,shop_name);

        /* checking if category exists */

        var categories:Map<String,String>=shop.categories;

        if(categories.has(category_name))
        {
            throw new Error(CategoryErrors.CATEGORY_EXIST);
        }
        
        /* if category does not exist ,create one */
        var new_category:Category=new this.CategoryModel();

        new_category.name=category_name;

        new_category.shop=shop._id;

        const saved_category:Category=await new_category.save();

        status=false;

        console.log("new category object created for shop"+shop.shop_name);

        /* to delete saved 'category' object if below query throws error  */
        saved_category_id=saved_category._id;

        /* add saved_category 'name' and 'ObjectId' to 'categories' map in 'shop' */
        shop.categories.set(saved_category.name,saved_category._id);

        shop.save();

        console.log("new category object linked to shop"+shop.shop_name);
    
        status=true;

        }
        catch(error)
        {

            if(status===false)
            {
                this.CategoryModel.deleteOne({_id:saved_category_id}).exec();
            }
        
        throw new Error(error.message);
       
        }

    }

    /* add functionality to add multiple products at once and set limit for total products in on category */
    async addProductByCategory(email:String,shop_name:String,category_name:String,product:AddProductDto)
    {

        const shop:Shop=await this.retailerService.getParticularShop(email,shop_name);

        /* checking if category exists */

        var categories:Map<String,String>=shop.categories;

        if(!categories.has(category_name))
        {
            throw new Error(CategoryErrors.DOES_NOT_EXIST);
        }

        const categoryObjectId:String=categories.get(category_name);

        var category:Category=await this.CategoryModel.findOne({_id:categoryObjectId});

        if(category.products.size===CategoryConstraints.MAX_PRODUCTS_PER_CATEGORY_VALUE)
        {
            throw new Error(CategoryErrors.MAX_PRODUCTS_PER_CATEGORY_MESSAGE)
        }
        category.products.set(product.id,product.name);

        category.prices.set(product.id,product.price);
        
        if(product.colour)
        {
            category.colours.set(product.id,product.colour);
        }
        if(product.size)
        {
            category.sizes.set(product.id,product.size);
        }

        await category.save();



    }

    async setShopStatus(email:String,shop_name:String,status:Boolean):Promise<Shop>
    {
        var shop:Shop=await this.retailerService.getParticularShop(email,shop_name);
        shop.status=status;

        const saved_shop:Shop=await shop.save();

        return saved_shop;

    }
    


    /*  to register user by shop owner.This user has special priveleges */

    async registerUserByShop(email:String,shop_name:String,user_email:String)
    {

        var user:User=await this.userService.findUser(email);


        const shop:Shop=await this.retailerService.getParticularShop(email,shop_name);

        if(user.profile.registered_shops.has(shop_name))
        {
            throw new Error(UserErrors.USER_ALREADY_REGISTERED_AS_MEMBER);
        }

        else
        {
            user.profile.registered_shops.set(shop_name,shop._id);
        }

    }



    async getCategoryModel():Promise<Model<Category>>
    {

        return this.CategoryModel;
    }


    async getShopModel():Promise<Model<Shop>>
    {

        return await this.retailerService.getShopModel();
    }



}
