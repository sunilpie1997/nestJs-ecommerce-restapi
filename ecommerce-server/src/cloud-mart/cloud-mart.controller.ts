import { Controller, Param, Get, UseGuards, HttpException, HttpStatus, CacheInterceptor, UseInterceptors, Query } from '@nestjs/common';
import { CloudMartService } from 'src/cloud-mart/cloud-mart.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Shop } from 'src/retailer/interfaces/shop';
import { Category } from 'src/shop/interfaces/category';

@UseGuards(JwtAuthGuard)
@Controller('cloud-mart/')
export class CloudMartController {

    constructor(private readonly cloudService:CloudMartService){}

    /* check if page_no can be optional, for example,while retrieving first page */
    @Get(':shop_type')
    async getShopsByType(
        @Param('shop_type') shop_type:String,
        @Query('page_no') page_no?:number
    ):Promise<Shop[]>
    {

        try
        {
            
            return await this.cloudService.getShopsByType(shop_type,page_no);
            
        }

        catch(error)
        {
            throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
 
        }
    }

    @Get('shops/:shop_id/:category_name/')
    async getAllProductsByCategory(
        @Param('shop_id') shop_id:String,
        @Param('category_name') category_name:String

    ):Promise<Category>
    {

        try
        {
            
            return await this.cloudService.getProductsFromShopByCategory(shop_id,category_name);
            
        }

        catch(error)
        {
            throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
 
        }

    }













}
