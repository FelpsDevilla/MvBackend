import { Expose } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "libary" })
export class LibraryItem {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  city: string;

  @Expose()
  @Column()
  objectName: string;

  @Expose()
  @Column()
  original_date: Date;

  @Expose()
  @Column()
  legend: string;

  @Expose()
  @Column()
  imagePath: string;

  @Expose()
  @Column()
  bookPath: string;

  @Expose()
  @Column()
  state: string;

  @Expose()
  @Column()
  authorId: number;

  @Expose()
  @Column()
  collectionId: number;

  @Expose()
  @Column()
  donor: string;

  @Expose()
  @Column()
  contextHistory: string;

  @Expose()
  @Column()
  digitalizationTechnique: string;

  @Expose()
  @Column()
  createdAt: Date;

  @Expose()
  @Column()
  updatedAt: Date;

}