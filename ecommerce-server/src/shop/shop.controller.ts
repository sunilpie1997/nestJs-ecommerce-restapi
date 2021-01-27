import { Controller, Get, UseGuards,Request, HttpException, HttpStatus, Param, Post, Body, Patch } from '@nestjs/common';
import { ShopService } from 'src/shop/shop.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Shop } from 'src/retailer/interfaces/shop';
import { Category } from 'src/shop/interfaces/category';
import { AddProductDto } from 'src/shop/dto/add-product.dto';

@UseGuards(JwtAuthGuard)
@Controller('shop/')
export class ShopController {

    constructor(private shopService:ShopService)
    {}

    @Get(':shop_name/')
    async getShopDetails(
        @Request() req,
        @Param('shop_name') shop_name:String,
        ):Promise<Shop>
        {

            try
            {
                const email:String=req.user.email;

                
               return await this.shopService.getShopDetails(email,shop_name);

                

            }
            catch(error)
            {
                throw new HttpException(error.message,HttpStatus.BAD_REQUEST);

            }
            
        }




    
    @Get(':shop_name/categories/')
    async getAllCategories(
        @Request() req,
        @Param('shop_name') shop_name:String,

    ):Promise<Map<String,String>>
    {

        try
        {
            const email:String=req.user.email;

            return await this.shopService.getAllCategories(email,shop_name);
            
        }

        catch(error)
        {
            throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
 
        }

    }

    /* NOTE:IF THIS ROUTE IS PLACED ABOVE,THEN ':shop_name/categories/' route never get executed */
        /* enable pagination in future */
        @Get(':shop_name/:category/')
        async getAllProductsByCategory(
            @Request() req,
            @Param('shop_name') shop_name:String,
            @Param('category') category:String,
    
        ):Promise<Category>
        {
            try
            {
                const email:String=req.user.email;
    
                return await this.shopService.getProductsByCategory(email,shop_name,category);
                
            }
    
            catch(error)
            {
                throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
     
            }
        }
    
        @Post(':shop_name/:category/add/')
        async addCategory(
            @Request() req,
            @Param('shop_name') shop_name:String,
            @Param('category') category:String,

        )
        {

            try
            {
                const email:String=req.user.email;
    

                await this.shopService.addCategory(email,shop_name,category);
              


            }
            catch(error)
            {
                throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
            }

        }

        @Post(':shop_name/:category/add_product/')
        async addProductsByCategory(
            @Request() req,
            @Param('shop_name') shop_name:String,
            @Param('category') category:String, 
            @Body() add_product:AddProductDto,
        )
        {

            try
            {
                const email:String=req.user.email;
    

                await this.shopService.addProductByCategory(email,shop_name,category,add_product);
              


            }
            catch(error)
            {
                throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
            }

        }

    

        @Patch(':shop_name/status/:new_status/')
        async setShopStatusByRetailer(
            @Request() req,
            @Param('shop_name') shop_name:String,
            @Param('new_status') status:Boolean,

        ):Promise<Shop>
        {

            try
            {
                const email:String=req.user.email;
    

                return await this.shopService.setShopStatus(email,shop_name,status);
              


            }
            catch(error)
            {
                throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
            }
            
        }

        @Post(':shop_name/user/:email/add/')
        async registerUserAsMember(
            @Request() req,
            @Param('shop_name') shop_name:String,
            @Param('email') user_email:String
        )
        {

            try
            {
                const email:String=req.user.email;
    

                await this.shopService.registerUserByShop(email,shop_name,user_email);
              


            }
            catch(error)
            {
                throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
            }
            
        }


}
