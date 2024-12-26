class livraria_item {
    readonly urlMiniatura: string;
    readonly cidade: string;
    readonly nomeObjeto: string;
    readonly dataCriacao: Date;
    readonly legenda: string;
    readonly autor: string;
    readonly tecnicaDigitalizacao: string;
    readonly colecao: string;
    readonly doador: string;
    readonly tamanhoArquivoMB: number;
    readonly contextoHistorico: string;
    readonly criadoEm: Date;
    readonly atualizadoEm: Date;

    constructor(
        id: number,
        urlMiniatura: string,
        cidade: string,
        nomeObjeto: string,
        dataCriacao: Date,
        legenda: string,
        autor: string,
        tecnicaDigitalizacao: string,
        colecao: string,
        doador: string,
        tamanhoArquivoMB: number,
        contextoHistorico: string,
        criadoEm: Date,
        atualizadoEm: Date
    ) {
        this.urlMiniatura = urlMiniatura;
        this.cidade = cidade;
        this.nomeObjeto = nomeObjeto;
        this.dataCriacao = dataCriacao;
        this.legenda = legenda;
        this.autor = autor;
        this.tecnicaDigitalizacao = tecnicaDigitalizacao;
        this.colecao = colecao;
        this.doador = doador;
        this.tamanhoArquivoMB = tamanhoArquivoMB;
        this.contextoHistorico = contextoHistorico;
        this.criadoEm = criadoEm;
        this.atualizadoEm = atualizadoEm;
    }
}