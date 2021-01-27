import { Document } from 'mongoose';


export interface Shop extends Document {

  shop_name: String;

  owner_name:String;

  owner_email:String;

  shop_type:String;

  categories:Map<String,String>,

  shop_email: String;

  contact_no:String,

  can_sell:Boolean;

  status:Boolean;

  area:String;

  city:String;

  state:String;

  pincode:String;

  retailer:String;



  
}