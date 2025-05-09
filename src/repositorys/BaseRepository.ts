import { DeleteResult, FindManyOptions, ObjectLiteral, Repository, UpdateResult } from "typeorm";


export class BaseRepository<T extends ObjectLiteral> {

    public repository: Repository<T>;

    constructor(repository: Repository<T>) {
        this.repository = repository;
    }

    findAll(relations?: string[]): Promise<T[]> {
        const options: FindManyOptions<T> = {};
        options.relations = relations;
        return this.repository.find(options);
    }

    findById(id: number, relations?: string[]): Promise<T | null> {
         const options: FindManyOptions<T> = {};
        options.relations = relations;
        return this.repository.findOne({
            where: { id: id} as any,
            ...options
        });
    }

    create(data: T): Promise<T> {
        return this.repository.save(data);
    }

    update(id: number, data: T): Promise<UpdateResult> {
        return this.repository.update(id, data);
    }

    delete(id: number): Promise<DeleteResult> {
        return this.repository.delete(id);
    }
}