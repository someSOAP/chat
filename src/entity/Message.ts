import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("text")
    text: string;
}
