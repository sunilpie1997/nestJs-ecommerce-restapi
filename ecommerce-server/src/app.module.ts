/******************************** External Modules ****************************************************/
import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import {MongooseModule} from '@nestjs/mongoose';
import {config} from 'dotenv';
/*********************************** Files residing in this Module **************************************/
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';

/************************************ MODULES IN THIS APP ***********************************************/
import { RetailerModule } from 'src/retailer/retailer.module';
import { AuthModule } from 'src/auth/auth.module';
import { AdminModule } from 'src/admin/admin.module';
import { ShopModule } from 'src/shop/shop.module';
import { UserModule } from 'src/user/user.module';
import { CloudMartModule } from 'src/cloud-mart/cloud-mart.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './exception-filters/all-exception.filter';

/************************************* ENTITIES ***********************************************************/
//import { User } from './users/entities/user.entity';
//import { Profile } from './users/entities/profile.entity';

/* load env variables */
config();

@Module({

  /* when using two databases,make sure to give name to second one */
  imports: [
    
/* postgres database will be used later */
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'sunilpie',
      database: 'ecomm-project',
      /*
      entities: [User,Profile],
      this can be tedious if you have different entities acreoss diff. modules : Tight-coupling */
      autoLoadEntities:true,

      /***************  NOTE:DISABLE THIS OPTION WHILE IN PRODUCTION *******************/
      synchronize: true,
  
    }),
    MongooseModule.forRoot(process.env.MONGODB_CLOUD_URI,{
      connectionName:"mongodb",
    }),

    RetailerModule,
    AuthModule,
    AdminModule,
    ShopModule,
    UserModule,
    CloudMartModule,
   
  ],
  controllers: [AppController],
  providers: [AppService,
    
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    
  ],
})
export class AppModule {

  constructor(private connection:Connection
    
    ){
    console.log("connected to postgres");
    
  }
}
