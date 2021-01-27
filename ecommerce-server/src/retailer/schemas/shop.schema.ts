import * as mongoose from 'mongoose';
import { ShopConstraints } from 'src/retailer/constraints/shop';
import { AddressConstraints } from 'src/shared/constraints/address';

const S=ShopConstraints;
const A=AddressConstraints;

export const ShopSchema = new mongoose.Schema({
  
    shop_name:{
        type:String,
        maxlength:[S.SHOPNAME_MAXVALUE,S.SHOPNAME_MAXLENGTH],
        required:true,
        index:true,
        },

    owner_email:{

        type:String,
        required:true,
        index:true,
        lowercase:true,
    },

    owner_name:{

        type:String,
        maxlength:[S.OWNERNAME_MAXVALUE,S.OWNERNAME_MAXLENGTH],
        required:true,
        },

    shop_type:{


        type:String,
        maxlength:[S.SHOPTYPE_MAXVALUE,S.SHOPTYPE_MAXLENGTH],
        required:true,
        index:true,
        lowercase:true,

        },



        shop_email:{

        type:String,
        maxlength:[S.EMAIL_MAXVALUE,S.EMAIL_MAXLENGTH],
        required:true,
        lowercase:true,

            },

        area:{

            type:String,
            maxlength:[A.AREA_MAXVALUE,A.AREA_MAXLENGTH],
            required:true,
            lowercase:true,
        },

        city:{

            type:String,
            maxlength:[A.CITY_MAXVALUE,A.CITY_MAXLENGTH],
            required:true,
            index:true,
            lowercase:true,
        },

        state:{

            type:String,
            maxlength:[A.STATE_MAXVALUE,A.STATE_MAXLENGTH],
            required:true,
            lowercase:true,
        },

        pincode:{


            type:String,
            maxlength:[A.PINCODE_MAXVALUE,A.PINCODE_MAXLENGTH],
            required:true,
            index:true,
            },

  
        contact_no:{
            type:String,
            maxlength:[A.CONTACTNO_MAXVALUE,A.CONTACTNO_MAXLENGTH]

        },

        can_sell:{

            type:Boolean,
            default:false,

        },

        status:{

            type:Boolean,
            default:false,

        },

        retailer:{

            type:mongoose.Types.ObjectId,
            ref:'Retailer',
            required:true,
            index:true,

        },

        categories:{

            type:Map,
            of:mongoose.Types.ObjectId,
            ref:'Category',
            default:new Map<String,String>(),


            },
        
            date_added:{
                type:Date,
                required:true,
                default:Date.now()
            }
    
});