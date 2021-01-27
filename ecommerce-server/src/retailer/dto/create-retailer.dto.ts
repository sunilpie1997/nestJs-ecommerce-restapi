import { IsNotEmpty, Length, IsString, IsOptional, IsNumberString } from "class-validator";

export class CreateRetailerDto{

    @IsNotEmpty()
    @Length(3,50)
    @IsString()
    readonly first_name:String;

    /* last name is optional  */
    @Length(3,50)
    @IsString()
    @IsOptional()
    readonly last_name:String;

    

    @IsNotEmpty()
    @Length(10,10)
    @IsNumberString()
    readonly contact_no:String;




}