import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Shop } from 'src/retailer/interfaces/shop';
import { ShopService } from 'src/shop/shop.service';
import { Category } from 'src/shop/interfaces/category'
import { CloudMartErrors } from 'src/cloud-mart/errors/cloud-mart.errors';
import { CategoryErrors } from 'src/shop/errors/category.errors';

@Injectable()
export class CloudMartService {


    constructor(
        private readonly shopService:ShopService
      ){}
    
      /* fetch models to use them from shopService */
    
      /* Model<Shop> */
      async getShopModel():Promise<Model<Shop>>
      {
    
        return await this.shopService.getShopModel();
      }
    
    
      /* Model<Category> */
      async getCategoryModel():Promise<Model<Category>>
      {
    
        return await this.shopService.getCategoryModel();
      }
    
      
      
     async  getShopsByType(shop_type:String,page_no:number=1):Promise<Shop[]>
      {
    
        if(shop_type)
        {
        const shopModel:Model<Shop>=await this.getShopModel();
        const shops:Shop[]=await shopModel.find({shop_type:shop_type,can_sell:true}).skip((page_no-1)*10).limit(10).exec();

        return shops;
    
        }
        else
        {
          throw new Error(CloudMartErrors.INVALID_SHOP_TYPE);
        }

    
      }
    

      /* get all products From a particular (unique) category from a shop 
      Note:valiadtion to check if above shop can sell.
      */
      async getProductsFromShopByCategory(shop_id:String,category_name:String):Promise<Category>
      {

        const categoryModel:Model<Category>=await this.getCategoryModel();

        const categories:Category[]=await categoryModel.find({name:category_name,shop:shop_id});

        if(categories.length>1)
        {
          throw new Error(CategoryErrors.DUPLICATE_CATEGORY);
        }

       
        return categories[0];
      }





      

}
