import { Expose } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Relation, JoinColumn } from "typeorm";
import { Author } from "./Author.js";
import { EntityInfo } from "./EntityInfo.js";

@Entity({ name: "gallery" })
export class GalleryItem extends EntityInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Expose()
    @ManyToOne(() => Author, (author) => author.collections, { nullable: false })
    @JoinColumn()
    author: Relation<Author>

    @Expose()
    @Column({ type: 'date', nullable: true })
    originalDate: Date;

    @Expose()
    @Column({ type: 'varchar', nullable: false })
    imagePath: string;
}