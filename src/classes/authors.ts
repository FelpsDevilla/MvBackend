import { Expose } from "class-transformer";

export class authors{

    @Expose()
    id: number

    @Expose()
    name: string
}