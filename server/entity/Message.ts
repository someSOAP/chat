import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class Message {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column({default: ()=> `'${new Date().toISOString()}'`})
    dateString: string;
}

export default Message;
