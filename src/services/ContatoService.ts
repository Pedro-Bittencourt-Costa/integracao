import { ContatoDto } from "../dtos/ContatoDto";
import { Contato } from "../entities/Contato";
import { ContatoRepository } from "../repositorys/ContatoRepository";
import { UserRepository } from "../repositorys/userRepository";
import { BaseService } from "./BaseService";

export class ContatoService extends BaseService<Contato, ContatoDto>{

    public repository: ContatoRepository;
    public userRepository: UserRepository;

    constructor(repository: ContatoRepository, userRespository: UserRepository){
        super(repository);
        this.repository = repository;
        this.userRepository = userRespository;
    }

    findAll(relations?: string[]): Promise<Contato[]> {
        return this.repository.findAll(['user'])
    }

    async findById(id: number): Promise<Contato> {
        const contato = await this.repository.findById(id, ['user']);
        if(!contato) throw new Error('Contato not fond');
        return contato;
    }

    async create(data: ContatoDto): Promise<Contato> {
        
        const emailExist = await this.repository.findByEmail(data.email);
        if(emailExist) throw new Error('Email already exists');

        const userExist = await this.userRepository.findById(data.idUser);
        if(!userExist) throw new Error('User not found');

        const contato = new Contato();
        contato.email = data.email;
        contato.telefone = data.telefone;
        contato.user = userExist;

        return this.repository.create(contato);

    }

    async update(id: number, data: ContatoDto): Promise<void> {
        
        const contatoExist = await this.repository.findById(id, ['user']);
        if(!contatoExist) throw new Error('Contato not found');

        if(data.email !== contatoExist.email) {
            const emailExist = await this.repository.findByEmail(data.email);
            if(emailExist) throw new Error('Email already exists');
            contatoExist.email = data.email;
        }

        const userExist = await this.userRepository.findById(data.idUser);
        if(!userExist) throw new Error('User not found');
        contatoExist.user = userExist;

        contatoExist.telefone = data.telefone;

        this.repository.update(id, contatoExist);

    }

}