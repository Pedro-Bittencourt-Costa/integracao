import { Extension } from "typescript";
import { BaseRepository } from "./BaseRepository";
import { Contato } from "../entities/Contato";
import { AppDataSource } from "../db/data-source";


export class ContatoRepository extends BaseRepository<Contato> {

    constructor() {
        super(AppDataSource.getRepository(Contato));
    }

    findByEmail(email: string): Promise<Contato | null> {
        return this.repository.findOne({
            where: { email }
        });
    }
}