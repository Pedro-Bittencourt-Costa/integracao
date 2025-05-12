import { IsNotEmpty, IsString } from "class-validator";


export class LoginDto {

    @IsNotEmpty()
    @IsString()
    matricula!: string;

    @IsNotEmpty()
    @IsString()
    senha!: string;
}