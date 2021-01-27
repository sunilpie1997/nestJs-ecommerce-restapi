import * as mongoose from 'mongoose';
import { AddressConstraints } from 'src/shared/constraints/address';

const A=AddressConstraints;

export const profileSchema=new mongoose.Schema({


    
        contact_no:{
            type:String,
            maxlength:[A.CONTACTNO_MAXVALUE,A.CONTACTNO_MAXLENGTH],
            default:null

        },
    
        area:{

            type:String,
            maxlength:[A.AREA_MAXVALUE,A.AREA_MAXLENGTH],
            lowercase:true,
            default:null
        },

        city:{

            type:String,
            maxlength:[A.CITY_MAXVALUE,A.CITY_MAXLENGTH],
            lowercase:true,
            default:null
        },

        state:{

            type:String,
            maxlength:[A.STATE_MAXVALUE,A.STATE_MAXLENGTH],
            lowercase:true,
            default:null
        },

        pincode:{


            type:String,
            maxlength:[A.PINCODE_MAXVALUE,A.PINCODE_MAXLENGTH],
            default:null
            },

        registered_shops:{

            type:Map,
            of:mongoose.Types.ObjectId,
            ref:'Shop',
            default:new Map<String,String>(),


        },

        image: {

            type:String,
            default:null,
            maxlength:[200,"profile image link max length should be 200"]
        }


});