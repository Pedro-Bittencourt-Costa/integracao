import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class UserDto {

    @IsNotEmpty()
    @IsString()
    nome!: string;
    
    @IsNotEmpty()
    @IsString()
    senha!: string;

    @IsNotEmpty()
    @IsString()
    sobrenome!: string;

    @IsNotEmpty()
    @IsString()
    dataNascimento!: string;

    @IsNotEmpty()
    @IsString()
    matricula!: string;
}