import { hash } from "bcrypt";
import { User } from "../entities/User";
import { UserRepository } from "../repositorys/userRepository";
import { BaseService } from "./BaseService";
import { ContatoRepository } from "../repositorys/ContatoRepository";
import { UserDto } from "../dtos/UserDto";

export class UserService extends BaseService<User, UserDto> {

    public repository: UserRepository;

    constructor(repository: UserRepository) {
        super(repository);
        this.repository = repository;
    }

    findAll(): Promise<User[]> {
        return this.repository.findAll(['contatos'])
    }

    async findById(id: number): Promise<User> {
        const user = await this.repository.findById(id, ['contatos']);
        if(!user) throw new Error('user not found');
        return user;
    }

    async create(data: UserDto): Promise<User> {
       const matriculaExist = await this.repository.findByMatricula(data.matricula);
       if(matriculaExist) throw new Error('Matricula already exists');

       data.senha = await hash(data.senha, 10);

       const user = new User();
       user.nome = data.nome;
       user.sobrenome = data.sobrenome;
       user.senha = data.senha;
       user.dataNascimento = data.dataNascimento;
       user.matricula = data.matricula;

       return this.repository.create(user);

    }

    async update(id: number, data: UserDto): Promise<void> {
        
        const userExist = await this.repository.findById(id);
        if(!userExist) throw new Error('User not found');

        if(data.matricula !== userExist.matricula) {
            const matriculaExist = await this.repository.findByMatricula(data.matricula);
            if(matriculaExist) throw new Error('Matricula already exists');
            userExist.matricula = data.matricula;
        }

        data.senha = await hash(data.senha, 10);

        userExist.dataNascimento = data.dataNascimento;
        userExist.nome = data.nome;
        userExist.sobrenome = data.sobrenome;
        userExist.senha = data.senha;

        this.repository.update(id, userExist);
    } 
}