import { Expose } from "class-transformer";

export class User {
    @Expose()
    readonly id: number;
    @Expose()
    readonly cpf: number;
    @Expose()
    readonly name: string;
    @Expose() 
    readonly password: string;
    @Expose() 
    readonly isActive: boolean;
    @Expose() 
    readonly isAdmin: boolean;

}