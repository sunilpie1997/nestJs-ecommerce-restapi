import * as mongoose from 'mongoose';
import {RetailerConstraints} from 'src/retailer/constraints/retailer';
import { AddressConstraints } from 'src/shared/constraints/address';

const R=RetailerConstraints;
const A=AddressConstraints;

export const RetailerSchema = new mongoose.Schema({

    first_name: {
        
        type:String,
        maxlength:[R.FIRSTNAME_MAXVALUE,R.FIRSTNAME_MAXLENGTH],
        required:true,

        },

    last_name:{

        type:String,
        maxlength:[R.LASTNAME_MAXVALUE,R.LASTNAME_MAXLENGTH],

        },

    email: {

        type:String,
        max_length:[R.EMAIL_MAXVALUE,R.EMAIL_MAXLENGTH],
        unique:true,
        index:{unique:true},
        required:true,
        lowercase:true,


        },

    contact_no: {

        type:String,
        maxlength:[A.CONTACTNO_MAXVALUE,A.CONTACTNO_MAXLENGTH],
        unique:true,
        index:{unique:true},
        required:true,
        },


    last_update:{

        type:Date,
        default:null

        },


    
});