import { Expose } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Author {
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({type: 'varchar'})
    name: string;
}