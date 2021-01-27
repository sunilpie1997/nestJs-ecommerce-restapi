import { IsNotEmpty, Length, IsString, IsNumberString } from "class-validator";

export class UpdateShopDto{


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






    




}