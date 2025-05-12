import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('contatos')
export class Contato {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true})
    email!: string;

    @Column()
    telefone!: string;

    @ManyToOne(() => User, user => user.contatos)
    @JoinColumn({name: 'id_user'})
    user!: User;
}