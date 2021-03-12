import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class PasswordChangeDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(50)
    password:string
}