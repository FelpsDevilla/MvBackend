import { Expose } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "gallery" })
export class GalleryItem{

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ type: 'varchar' })
    name: string;

    @Expose()
    @Column({ name:"creation_date", type: 'date' })
    creationDate: Date;

    @Expose()
    @Column({ name:"image_path", type: 'varchar' })
    imagePath: string;
}