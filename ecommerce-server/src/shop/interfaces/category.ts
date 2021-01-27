import { Document } from 'mongoose';

/* should include all the values returned by mongodb model */
export interface Category extends Document {

    name:String;

    shop:String;

    products: Map<String,String>;

    sizes: Map<String,String[]>;

    colours:Map<String,String[]>;

    weights:Map<String,String[]>;

    variants:Map<String,String[]>;

    prices:Map<String,Number[]>;

}