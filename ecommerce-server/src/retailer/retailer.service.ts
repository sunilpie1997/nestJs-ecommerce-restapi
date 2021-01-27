import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Retailer } from 'src/retailer/interfaces/retailer';
import { CreateRetailerDto } from 'src/retailer/dto/create-retailer.dto';
import { UpdateRetailerDto } from 'src/retailer/dto/update-retailer.dto';
import { CreateShopDto } from 'src/retailer/dto/create-shop.dto';
import { Shop } from 'src/retailer/interfaces/shop';
import { FindRetailerDto } from 'src/retailer/dto/find-retailer.dto';
import { RetailerQueryEnum } from 'src/retailer/enums/retailer-query-enum';
import { RetailerErrors } from 'src/retailer/errors/retailer.errors';
import { AdminErrors } from 'src/admin/errors/admin.errors';
import { ShopErrors } from 'src/retailer/errors/shop.errors';

@Injectable()
export class RetailerService {

    constructor(
        @InjectModel('Retailer') private readonly RetailerModel: Model<Retailer>,
        @InjectModel('Shop') private readonly ShopModel: Model<Shop>,
        @InjectConnection('mongodb') private connection: Connection,
    ){
        console.log("connected to mongodb cloud through mongoose");
    }


    async findRetailer(email:String):Promise<Retailer>{
        
        const retailer:Retailer=await this.RetailerModel.findOne({email:email}).exec();
        
        if(retailer===null)
        {
            throw new Error(RetailerErrors.DOES_NOT_EXIST);
        }
        else
        {
            return retailer;
        }
    
    }


    async registerRetailer(email:String,user:CreateRetailerDto):Promise<Retailer>{


        try{
        var new_retailer:Retailer=new this.RetailerModel(user);
    
        new_retailer.email=email;
        

        const saved_retailer:Retailer=await new_retailer.save();

        if(saved_retailer===new_retailer){
            return saved_retailer;
        }

        }

        catch(error)
        {
            /** other errors are not catched  */
            if(error.name==='MongoCryptError'|| error.name==='MongoNetworkTimeoutError' || error.name==='MongoNetworkError')
                
                throw new Error(error.name);

            else
            {
                if(error.name==='MongoError')
                {
                    if(error.code===11000)
                    {
                        throw new Error(RetailerErrors.USER_EXIST);
                    }
    
    
                }
    

            }
            console.log(error);

            throw new Error(error.message);
        }

    }

    async updateRetailer(email:String,user:UpdateRetailerDto):Promise<Retailer>
    {

        try{

        var retailer:Retailer=await this.findRetailer(email);

        retailer.first_name=user.first_name;

        retailer.last_name=user.last_name;

        retailer.contact_no=user.contact_no;
        
        

        const saved_retailer:Retailer= await retailer.save();

        if(saved_retailer===retailer){
            return saved_retailer;
        }

        }
        catch(error)
        {
            if(error.name==='MongoError')
                {
                    if(error.code===11000)
                    {
                        throw new Error(RetailerErrors.USER_EXIST);
                    }
    
    
                }

            throw new Error(error.message);
    
        }

    }



    async registerShopByRetailer(email:String,new_shop:CreateShopDto):Promise<Shop>
    {

        
            const retailer= await this.findRetailer(email);
        
        
            var shop=new this.ShopModel(new_shop);

            const owner_name=retailer.first_name+" "+retailer.last_name;

            shop.owner_name=owner_name;

            shop.owner_email=retailer.email;
            
            shop.retailer=retailer._id;

            const saved_shop=await shop.save();

            return saved_shop;


        }


    async searchRetailerByAdmin(findRetailerDto:FindRetailerDto):Promise<Retailer[]>{

        var retailers:Retailer[];
        const type:String=findRetailerDto.type;
        const value:String=findRetailerDto.value;
    
        if(type==RetailerQueryEnum.CONTACT_NO)
            {
                retailers=await this.RetailerModel.find({contact_no:value}).exec();
    
            }
        else
            {
                
                        if(type==RetailerQueryEnum.EMAIL)
                            {
                                retailers=await this.RetailerModel.find({email:value}).exec();
                            }
    
                        else
                            {
                                /* this code is unreachable as nestJs will not allow valus not defined in RetailerQueryEnum
                                still if in future 'RetailerQueryEnum' has additional search parameter,we can add below functionality */
                                throw new Error(AdminErrors.SUPPORTED_SEARCH);
                            }
                    
            }
            
    
            return retailers;
            
                
        }


        async getAllShopsOfRetailer(email:String):Promise<Shop[]>
        {
            const retailer:Retailer=await this.findRetailer(email);

            const shops:Shop[]=await  this.ShopModel.find({retailer:retailer._id}).exec();

           return shops;
            
        }


        async getParticularShop(email:String,shop_name:String):Promise<Shop>
        {

            const shops:Shop[]=await this.ShopModel.find({owner_email:email,shop_name:shop_name}).exec();

            if(shops.length==0)
            {
                throw new Error(ShopErrors.DOES_NOT_EXIST);
            }
            else
            {
                if(shops.length>1)
                {
                    throw new Error(ShopErrors.MULTIPLE_SHOPS_WITH_SAME_NAME);
                }

                else
                {
                    return shops[0];
                }

            }
    
        
        }


        async getShopModel():Promise<Model<Shop>>{

            return this.ShopModel;
        }




    }







