import { Expose } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Relation } from "typeorm";
import { Author } from "./Author.js";
import { Collection } from "./Collection.js";
import { EntityInfo } from "./EntityInfo.js";

@Entity({ name: "libary" })
export class LibraryItem extends EntityInfo {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ type: "varchar", nullable: false })
  name: string;

  @Expose()
  @Column({ type: "varchar", nullable: false })
  description: string;

  @Expose()
  @Column({ type: "varchar", nullable: true })
  state: string;

  @Expose()
  @Column({ type: "varchar", nullable: true })
  city: string;

  @Expose()
  @Column({ type: "date", nullable: true })
  originalDate: Date;

  @Expose()
  @Column({ type: "varchar", nullable: true })
  imagePath: string;

  @Expose()
  @Column({ type: "varchar", nullable: false })
  bookPath: string;

  @Expose()
  @ManyToOne(() => Author, (author) => author.archiveItems, { nullable: false })
  @JoinColumn()
  author: Relation<Author>;

  @Expose()
  @ManyToOne(() => Collection, (collection) => collection.libraryeItems, { nullable: false })
  @JoinColumn()
  collection: Relation<Collection>;

  @Expose()
  @Column({ type: "varchar", nullable: true })
  donor: string;

  @Expose()
  @Column({ type: "text", nullable: true })
  contextHistory: string;

  @Expose()
  @Column({ type: "varchar", nullable: true })
  digitalizationTechnique: string;
}