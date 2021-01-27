import { Controller, Get ,Request, Body, HttpException, HttpStatus, UseGuards, Param, Patch} from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { FindRetailerDto } from 'src/retailer/dto/find-retailer.dto';
import { Retailer } from 'src/retailer/interfaces/retailer';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Shop } from 'src/retailer/interfaces/shop';

@UseGuards(JwtAuthGuard)
@Controller('admin/')
export class AdminController {

    constructor(private adminService:AdminService){}

    @Get('retailer/')
    async searchRetailer(
        @Request() request,
        @Body() findRetailer:FindRetailerDto
    ):Promise<Retailer[]>{

        try
        {
            const admin:boolean=request.user.admin;
            if(admin)
            {
                return await this.adminService.findRetailer(findRetailer);
            }
            else
            {
                throw new Error("you are not authorised");
            }
        }
        catch(error)
        {
            throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
        }

    }

   
    @Get(':email/shops/')
    async getAllShops(
        @Request() request,
        @Param('email') email:String,
        
    ):Promise<Shop[]>
    {
        try
        {
            const admin:boolean=request.user.admin;
            if(admin)
            {
                return await this.adminService.findAllShops(email);
            }
            else
            {
                throw new Error("you are not authorised");
            }
        }
        catch(error)
        {
            throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
        }

    }
    

    @Patch(':email/shops/:shop_name/')
    async setShopStatus(
        @Request() request,
        @Param('email') email:String,
        @Param('shop_name') shop_name:String,
        @Body() can_sell:Boolean
        
    ):Promise<Shop>
    {
        try
        {
            const admin:boolean=request.user.admin;
            if(admin)
            {
                return await this.adminService.setShopCanSellStatus(email,shop_name,can_sell);
            }
            else
            {
                throw new Error("you are not authorised");
            }
        }
        catch(error)
        {
            throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
        }

    }













}
