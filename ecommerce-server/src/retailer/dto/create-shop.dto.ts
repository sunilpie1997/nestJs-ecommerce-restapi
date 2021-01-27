import { IsNotEmpty, Length, IsString, IsNumberString } from "class-validator";

export class CreateShopDto{


    @IsNotEmpty()
    @Length(3,50)
    @IsString()
    readonly shop_name:String;

    @IsNotEmpty()
    @Length(3,50)
    @IsString()
    readonly shop_email:String;

    /* last name is optional  */
    @Length(3,50)
    @IsString()
    @IsNotEmpty()
    readonly shop_type:String;

    @IsNotEmpty()
    @Length(10,10)
    @IsNumberString()
    readonly contact_no:String;

    @IsNotEmpty()
    @Length(3,50)
    @IsString()
    readonly area:String;

    @IsNotEmpty()
    @Length(3,50)
    @IsString()
    readonly city:String;

    @IsNotEmpty()
    @Length(3,50)
    @IsString()
    readonly state:String;

    @IsNotEmpty()
    @Length(6,6)
    @IsNumberString()
    readonly pincode:String;




    




}