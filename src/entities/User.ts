import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Contato } from "./Contato";

@Entity('users')
export class User {
  
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome!: string;

    @Column()
    senha!: string;

    @Column()
    sobrenome!: string;

    @Column({ name: 'data_nascimento' })
    dataNascimento!: string;

    @Column({ unique: true})
    matricula!: string;

    @OneToMany(() => Contato, c => c.user, { cascade: true }) // cascade opcional
    contatos!: Contato[];
}
