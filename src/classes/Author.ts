import { Expose } from "class-transformer";
import { Collection } from "./Collection";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { AcervoItem } from "./AcervoItem";

@Entity({ name: 'authors' })
export class Author {
    @Expose()
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Expose()
    @Column({type: 'varchar'})
    readonly name: string;

    @Expose()
    @Column({type: 'varchar'})
    readonly description: string;

    @OneToMany(() => Collection, (collection) => collection.author)
    collections: Collection[]

    @OneToMany(() => AcervoItem, (acervoItem) => acervoItem.author)
    items: AcervoItem[]

    @Expose()
    @Column({ name: 'created_at', type: 'date' })
    readonly createdAt: Date;

    @Expose()
    @Column({ name: 'updated_at', type: 'date'})
    readonly updatedAt: Date;
}