import { compare } from "bcrypt";
import { UserRepository } from "../repositorys/userRepository";
import { LoginDto } from "../dtos/LoginDto";
import { createToken } from "../auth/auth";

export class LoginService {

    public userRepository: UserRepository

    constructor(usuarioRepository: UserRepository){
        this.userRepository = usuarioRepository;
    }

    async signin(data: LoginDto): Promise<string> {

        const userExist = await this.userRepository.findByMatricula(data.matricula)

        const passwordConfirmed = await compare(data.senha, userExist!.senha);

        if(!userExist || !passwordConfirmed) throw new Error('Matricula / senha invalidos');
        
        const accessToken = createToken(
            {
                usuario: userExist
            }
        )

        return accessToken;
    }
}