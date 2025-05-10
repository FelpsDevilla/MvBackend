import { Expose } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { Author } from "./Author";
import { AcervoItem } from "./AcervoItem";

@Entity({ name: 'collections' })
export class Collection {
    @Expose()
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Expose()
    @Column({ type: 'varchar' })
    readonly name: string;

    @Expose()
    @ManyToOne(() => Author, (author) => author.collections)
    readonly author: Author;

    @OneToMany(() => AcervoItem, (acervoItem) => acervoItem.collection)
    items: AcervoItem[]

    @Expose()
    @Column({ type: 'varchar' })
    readonly description: string;

    @Expose()
    @Column({ name: 'created_at', type: 'date' })
    readonly createdAt: Date;

    @Expose()
    @Column({ name: 'updated_at', type: 'date'})
    readonly updatedAt: Date;
}