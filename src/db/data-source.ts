import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Contato } from "../entities/Contato";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [User, Contato],
    subscribers: [],
    migrations: [],
})