import { Expose } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, Relation } from "typeorm";
import { Author } from "./Author.js";
import { ArchiveItem } from "./ArchiveItem.js";

@Entity({ name: 'collections' })
export class Collection {
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ type: 'varchar' })
    name: string;

    @Expose()
    @ManyToOne(() => Author, (author) => author.collections)
    @JoinColumn()
    author: Relation<Author>;

    @OneToMany(() => ArchiveItem, (archiveItem) => archiveItem.collection)
    @JoinColumn()
    items: Relation<ArchiveItem[]>

    @Expose()
    @Column({ type: 'varchar' })
    description: string;

    @Expose()
    @Column({ name: 'created_at', type: 'date' })
    createdAt: Date;

    @Expose()
    @Column({ name: 'updated_at', type: 'date' })
    updatedAt: Date;
}