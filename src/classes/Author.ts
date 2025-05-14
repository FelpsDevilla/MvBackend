import { Expose } from "class-transformer";
import { Collection } from "./Collection.js";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ArchiveItem } from "./ArchiveItem.js";

@Entity({ name: 'authors' })
export class Author {
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column()
    name: string;

    @Expose()
    @Column()
    description: string;

    @OneToMany(() => Collection, (collection) => collection.author)
    collections: Collection[]

    @OneToMany(() => ArchiveItem, (archiveItem) => archiveItem.author)
    items: ArchiveItem[]

    @Expose()
    @Column()
    createdAt: Date;

    @Expose()
    @Column()
    updatedAt: Date;
}