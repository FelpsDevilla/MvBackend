class Usuario {
    readonly cpf: number;
    readonly name: string;
    readonly passwrd: string;
    readonly active: boolean;
    readonly isAdmin: boolean;

    constructor(cpf:number, name:string, passwrd:string, active:boolean, isAdmin:boolean){
        this.cpf = cpf;
        this.active = active;
        this.name = name;
        this.passwrd = passwrd;
        this.isAdmin = isAdmin;
    }

}