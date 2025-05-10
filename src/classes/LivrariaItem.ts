import { Expose } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "livraria" })
export class LivrariaItem {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ type: 'varchar' })
  city: string;

  @Expose()
  @Column({ name: 'object_name', type: 'varchar' })
  objectName: string;

  @Expose()
  @Column({ name: 'original_date', type: 'date' })
  original_date: Date;

  @Expose()
  @Column({ type: 'varchar' })
  legend: string;

  @Expose()
  @Column({ name: 'image_path', type: 'varchar' })
  imagePath: string;

  @Expose()
  @Column({ type: 'varchar' })
  state: string;

  @Expose()
  @Column({ name: 'author_id', type: 'integer' })
  authorId: number;

  @Expose()
  @Column({ name: 'collection_id', type: 'integer' })
  collectionId: number;

  @Expose()
  @Column({ type: 'varchar' })
  donor: string;

  @Expose()
  @Column({ name: 'context_history', type: 'varchar' })
  contextHistory: string;

  @Expose()
  @Column({ name: 'created_at', type: 'date' })
  createdAt: Date;

  @Expose()
  @Column({ name: 'updated_at', type: 'date' })
  updatedAt: Date;

  @Expose()
  @Column({ name: 'digitalization_technique', type: 'varchar' })
  digitalizationTechnique: string;
}