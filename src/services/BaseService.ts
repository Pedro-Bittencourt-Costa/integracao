import { ObjectLiteral } from "typeorm";
import { BaseRepository } from "../repositorys/BaseRepository";

export abstract class BaseService<T extends ObjectLiteral, CreateDto = T> {

    public repository: BaseRepository<T>;

    constructor(repository: BaseRepository<T>) {
        this.repository = repository;
    }

    findAll(relations?: string[]): Promise<T[]> {
        return this.repository.findAll(relations);
    }

    async findById(id: number, relations?: string[]): Promise<T> {
        const item = await this.repository.findById(id, relations);
        if(!item) throw new Error('Not Found');
        return item;
    }

    abstract create(data: CreateDto): Promise<T>;

    abstract update(id: number, data: CreateDto): Promise<void>;

    async delete(id: number): Promise<void> {
        const item = await this.repository.findById(id);
        if(!item) throw new Error('Not Found');
        this.repository.delete(id);
    }

}