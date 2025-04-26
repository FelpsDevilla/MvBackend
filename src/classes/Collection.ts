import { Expose } from "class-transformer";

export class Collection {
    
    @Expose()
    readonly id: number;
    @Expose()
    readonly name: string;
    @Expose({ name:'author_id'})
    readonly authorId: number;
    @Expose()
    readonly description: string;
    @Expose({ name:'created_at'})
    readonly createdAt: Date;
    @Expose({ name: 'updated_at' })
    readonly updatedAt: Date;
}