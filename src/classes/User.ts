import { Expose } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
  @Expose()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Expose()
  @Column()
  readonly cpf: string;

  @Expose()
  @Column()
  readonly name: string;

  @Column()
  private password: string;

  @Expose()
  @Column()
  readonly isActive: boolean;

  @Expose()
  @Column()
  readonly isAdmin: boolean;

  public setPassword(newPassword: string): void {
    this.password = newPassword;
  }

  public getPassword(): string {
    return this.password;
  }
}