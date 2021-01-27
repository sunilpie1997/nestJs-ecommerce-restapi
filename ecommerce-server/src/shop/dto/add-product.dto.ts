import { IsNotEmpty, Length, IsString, IsArray, ArrayMinSize, ArrayMaxSize, IsOptional } from "class-validator";

//NOTE: In below cases where there is an array, add validation for required types:
//  ex: price:Number[] -> each value in array must be a number

//NOTE: add extra options from schema like 'variants','weights',etc.
/* will be edited in future */
export class AddProductDto{


    @IsNotEmpty()
    @Length(3,50)
    @IsString()
    readonly id:String;

    @IsNotEmpty()
    @Length(3,50)
    @IsString()
    readonly name:String;

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(10)
    readonly price:Number[];

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(10)
    readonly colour:String[];

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(10)
    readonly size:String[];



}