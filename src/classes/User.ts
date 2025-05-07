import { Expose } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @Expose()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Expose()
  @Column({type: 'varchar', length: 11, unique: true})
  readonly cpf: number;

  @Expose()
  @Column({type: 'varchar'})
  readonly name: string;

  @Column({type: 'varchar'})
  private password: string;

  @Expose()
  @Column({ name: 'is_active', type: 'boolean' })
  readonly isActive: boolean;

  @Expose()
  @Column({ name: 'is_admin', type: 'boolean' })
  readonly isAdmin: boolean;

  public setPassword(newPassword: string): void {
    this.password = newPassword;
  }

  public getPassword(): string {
    return this.password;
  }
}