import { Controller, UseGuards, Get ,Request, HttpException, HttpStatus, Post,Put, Body} from '@nestjs/common';
import { RetailerService } from 'src/retailer/retailer.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Retailer } from 'src/retailer/interfaces/retailer';
import { CreateRetailerDto } from 'src/retailer/dto/create-retailer.dto';
import { UpdateRetailerDto } from 'src/retailer/dto/update-retailer.dto';
import { CreateShopDto } from 'src/retailer/dto/create-shop.dto';
import { Shop } from 'src/retailer/interfaces/shop';

@UseGuards(JwtAuthGuard)
@Controller('retailer/')
export class RetailerController {

    constructor(private readonly retailerService: RetailerService) {}

  @Get()
  async getRetailerDetails(

    @Request() req): Promise<Retailer> {

    try{

      /* email is present in token payload, and is extracted by above 'JwtAuthGuard'  */
      const email=req.user.email;
      
      return await this.retailerService.findRetailer(email);
    
    }
    
    catch(error)
    {
    
      throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
    
    }
  }

/* errors thrown by 'RetailerService' will be catched here and proper message will be thrown */
  @Post('create/')
  async registerRetailer(
    @Request() req,
    @Body() new_retailer:CreateRetailerDto
  ):Promise<Retailer>{
    
    try{

      const email=req.user.email;

      
      return await this.retailerService.registerRetailer(email,new_retailer);
      
      }
      
      catch(error){
        
      throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
    
    }
    

  }


  @Put('update/')
  async updateRetailer(
    @Request() req,
    @Body() old_retailer:UpdateRetailerDto
  ):Promise<Retailer>{
    
    try{

      const email=req.user.email;

  
      return await this.retailerService.updateRetailer(email,old_retailer);
      
      }
      
      catch(error){
        
      throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
    
    }
    

  }

  @Post('create_shop/')
  async registerShop(
    @Request() req,
    @Body() new_shop:CreateShopDto
  ):Promise<Shop>{

    try
    {

      const email=req.user.email;

      return await this.retailerService.registerShopByRetailer(email,new_shop);

    }
    catch(error)
    {

      throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
    }


  }

  
  @Get('shops/')
  async getAllShops(
    @Request() req
  ):Promise<Shop[]>
  {

    try
    {

      const email=req.user.email;

      return await this.retailerService.getAllShopsOfRetailer(email);

    }
    catch(error)
    {

      throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
    }


  }



  

}
