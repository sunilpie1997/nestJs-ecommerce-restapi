import * as mongoose from 'mongoose';
import { UserConstraints } from 'src/user/constraints/user';
import { AddressConstraints } from 'src/shared/constraints/address';
import { profileSchema } from 'src/user/schemas/profile.schema';

const U=UserConstraints;
const A=AddressConstraints;

export const UserSchema=new mongoose.Schema({


    email:{

        type:String,
        required:true,
        index:{unique:true},
        unique:true,
        maxlength:[U.EMAIL_MAXVALUE,U.EMAIL_MAXLENGTH],
        lowercase:true

        },

        password:{

            type:String,
            required:false,
            maxlength:[U.PASSWORD_MAXVALUE,U.PASSWORD_MAXLENGTH],
        
            },

        first_name:{

            type:String,
            maxlength:[U.FIRSTNAME_MAXVALUE,U.FIRSTNAME_MAXLENGTH],
            default:null
            
            },

        last_name:{

            type:String,
            maxlength:[U.LASTNAME_MAXVALUE,U.LASTNAME_MAXLENGTH],
            default:null
                
            },

        last_login:{

            type:Date,
            default:null
            
                
            },

        is_admin: {

            type:Boolean,
            default:false
        },
        
        profile:{

            type:profileSchema,
        }

        


});