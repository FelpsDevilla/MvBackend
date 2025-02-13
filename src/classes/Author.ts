import { Expose } from "class-transformer";

export class Author{

    @Expose()
    id: number

    @Expose()
    name: string
}