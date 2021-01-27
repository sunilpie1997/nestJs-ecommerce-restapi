import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/interfaces/user';
import { Model } from 'mongoose';
import { UserErrors } from 'src/user/errors/user.errors';
import { Profile } from 'src/user/interfaces/profile';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private readonly UserModel: Model<User>,
        @InjectModel('Profile') private readonly ProfileModel: Model<Profile>
    ){}
    
        /* used by  modules to search user by email */
        async findUser(email:String):Promise<User>
        {
    
            const user:User=await this.UserModel.findOne({email:email}).exec();
    
            if(user===null)
            {
                throw new Error(UserErrors.USER_DOES_NOT_EXISTS);
            }
            else
            {
                return user;
            }
        }




    async getRegisteredshops(email:String):Promise<Map<String,String>>
    {

        const user:User=await this.findUser(email);

        return user.profile.registered_shops;
        
    }

    async getUserModel():Promise<Model<User>>
    {
        return this.UserModel;
    }


    async newUser():Promise<User>
    {

        const profile:Profile=new this.ProfileModel();
        const user:User=new this.UserModel();
        user.profile=profile;
        return user;
    }

}
