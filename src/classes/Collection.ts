import { Expose } from "class-transformer";

export class Collection {
    
    @Expose()
    readonly id: number;
    @Expose()
    readonly name: string;
    @Expose()
    readonly authorId: number;
    @Expose()
    readonly description: string;
    @Expose()
    readonly createAt: Date;
    @Expose()
    readonly updateAt: Date;
}