import { Expose } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { EntityInfo } from "./EntityInfo.js";

@Entity({ name: 'users' })
export class User extends EntityInfo {

  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ type: "varchar", length: 11, unique: true, nullable: false })
  cpf: string;

  @Expose()
  @Column({ type: "varchar", nullable: false })
  name: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Expose()
  @Column({ type: "boolean", default: "false", nullable: false })
  isActive: boolean;

  @Expose()
  @Column({ type: "boolean", default: "false", nullable: false })
  isAdmin: boolean;

}