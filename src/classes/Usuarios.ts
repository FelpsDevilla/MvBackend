class Usuario {
    readonly cpf: number;
    readonly nome: string;
    readonly senha: string;
    readonly ativo: boolean;
    readonly atualFuncao: string;

    constructor(cpf:number, nome:string, senha:string, ativo:boolean, atualFuncao:string){
        this.cpf = cpf;
        this.ativo = ativo;
        this.nome = nome;
        this.senha = senha;
        this.atualFuncao = atualFuncao;
    }

}