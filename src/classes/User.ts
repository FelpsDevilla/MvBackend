import { Expose } from "class-transformer";

export class User {
    @Expose()
    readonly cpf: number;
    @Expose()
    readonly name: string;
    @Expose() 
    readonly passwrd: string;
    @Expose() 
    readonly active: boolean;
    @Expose() 
    readonly isAdmin: boolean;

}