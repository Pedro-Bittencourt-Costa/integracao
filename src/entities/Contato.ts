import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('contatos')
export class Contato {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true})
    email!: string;

    @Column()
    telefone!: string;

    @OneToOne(() => User, user => user.contato)
    user!: User;
}