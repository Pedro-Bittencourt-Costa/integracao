import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ContatoDto {

    @IsNotEmpty()
    @IsString()
    email!: string;

    @IsNotEmpty()
    @IsString()
    telefone!: string;

    @IsNotEmpty()
    @IsNumber()
    idUser!: number;
}