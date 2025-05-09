import { AppDataSource } from "../db/data-source";
import { User } from "../entities/User";
import { BaseRepository } from "./BaseRepository";

export class UserRepository extends BaseRepository<User> {

    constructor() {
        super(AppDataSource.getRepository(User))
    }

    findByMatricula(matricula: string): Promise<User | null> {
        return this,this.repository.findOne({
            where: {matricula}
        });
    }
}