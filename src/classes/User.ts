import { Expose } from "class-transformer";

export class User {
    @Expose()
    readonly cpf: number;
    @Expose()
    readonly name: string;
    @Expose() 
    readonly password: string;
    @Expose() 
    readonly active: boolean;
    @Expose({ name: 'is_admin'}) 
    readonly isAdmin: boolean;

}