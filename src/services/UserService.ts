import { hash } from "bcrypt";
import { User } from "../entities/User";
import { UserRepository } from "../repositorys/userRepository";
import { BaseService } from "./BaseService";
import { ContatoRepository } from "../repositorys/ContatoRepository";
import { UserDto } from "../dtos/UserDto";

export class UserService extends BaseService<User, UserDto> {

    public repository: UserRepository;
    public contatoRepository: ContatoRepository;

    constructor(repository: UserRepository, contatoRepository: ContatoRepository) {
        super(repository);
        this.repository = repository;
        this.contatoRepository = contatoRepository;
    }

    async create(data: UserDto): Promise<User> {
       const matriculaExist = await this.repository.findByMatricula(data.matricula);
       if(matriculaExist) throw new Error('Matricula already exists');

       const contatoExist = await this.contatoRepository.findById(data.idContato);
       if(!contatoExist) throw new Error('Contato not found');

       data.senha = await hash(data.senha, 10);

       const user = new User();
       user.nome = data.nome;
       user.sobrenome = data.sobrenome;
       user.contato = contatoExist;
       user.senha = data.senha;
       user.dataNascimento = data.dataNascimento;
       user.matricula = data.matricula;

       return this.repository.create(user);

    }

    async update(id: number, data: UserDto): Promise<void> {
        
        const userExist = await this.repository.findById(id);
        if(!userExist) throw new Error('User not found');

        const matriculaExist = await this.repository.findByMatricula(data.matricula);
        if(matriculaExist) throw new Error('Matricula already exists');
        userExist.matricula = data.matricula;

        const contatoExist = await this.contatoRepository.findById(data.idContato);
        if(!contatoExist) throw new Error('Contato not found');
        userExist.contato = contatoExist;

        data.senha = await hash(data.senha, 10);

        userExist.dataNascimento = data.dataNascimento;
        userExist.nome = data.nome;
        userExist.sobrenome = data.sobrenome;
        userExist.senha = data.senha;

        this.repository.update(id, userExist);
    } 
}