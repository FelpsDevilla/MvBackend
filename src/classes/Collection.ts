import { Expose } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'collections' })
export class Collection {
    @Expose()
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Expose()
    @Column({ type: 'varchar' })
    readonly name: string;

    @Expose()
    @Column({ name: 'author_id', type: 'integer' })
    readonly authorId: number;

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