import { Expose } from "class-transformer";

export class User {
    @Expose()
    readonly id: number;
    @Expose()
    readonly cpf: number;
    @Expose()
    readonly name: string;
    @Expose() 
    private password: string;
    @Expose({ name: 'is_active' }) 
    readonly isActive: boolean;
    @Expose({ name: 'is_admin' }) 
    readonly isAdmin: boolean;

    public setPassword(newPassword: string): void{
        this.password = newPassword
    }

    public getPassword(): string{
        return this.password
    }
}