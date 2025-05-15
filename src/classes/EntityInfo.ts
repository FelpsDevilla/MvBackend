import { Expose } from "class-transformer";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class EntityInfo{
    @Expose()
    @CreateDateColumn()
    createdAt: Date;

    @Expose()
    @UpdateDateColumn()
    updatedAt: Date;
}