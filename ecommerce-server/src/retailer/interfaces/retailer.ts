import { Document } from 'mongoose';

/* should include all the values returned by mongodb model */
export interface Retailer extends Document {

  first_name:String;

  last_name: String;

  email:String;

  contact_no:String;

  last_update:Date;

}