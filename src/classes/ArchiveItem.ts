import { Expose } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Author } from "./Author.js";
import { Collection } from "./Collection.js";

@Entity({ name: 'archive' })
export class ArchiveItem {
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column()
    objectName: string;

    @Expose()
    @Column()
    city: string;

    @Expose()
    @Column()
    originalDate: Date;

    @Expose()
    @Column()
    technique: string;

    @Expose()
    @Column()
    material: string;

    @Expose()
    @Column()
    legend: string;

    @Expose()
    @Column()
    isDigitalized: boolean;

    @Expose()
    @Column()
    imagePath: string;

    @Expose()
    @Column()
    state: string;

    @Expose()
    @ManyToOne('Author', 'items')
    author: Promise<Author>;

    @Expose()
    @ManyToOne('Collection', 'items')
    collection: Promise<Collection>;

    @Expose()
    @Column()
    donor: string;

    @Expose()
    @Column()
    contextHistory: string;

    @Expose()
    @Column()
    createdAt: Date;

    @Expose()
    @Column()
    updatedAt: Date;
}