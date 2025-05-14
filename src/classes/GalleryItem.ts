import { Expose } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Author } from "./Author";

@Entity({ name: "gallery" })
export class GalleryItem {

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ type: 'varchar' })
    name: string;

    @Expose()
    @ManyToOne(() => Author, (author) => author.collections)
    author: Author;

    @Expose()
    @Column({ name: "original_date", type: 'date' })
    original_date: Date;

    @Expose()
    @Column({ name: "image_path", type: 'varchar' })
    imagePath: string;
}