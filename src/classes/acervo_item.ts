class Acervo_item{
    readonly id: number
    readonly thumbnailUrl: string;        // URL da miniatura
    readonly city: string;                // Cidade
    readonly objectName: string;          // Nome do objeto
    readonly creationDate: string;        // Data de criação inicial
    readonly legend: string;              // Legenda
    readonly technique: string;           // Técnica usada
    readonly material: string;            // Material do objeto
    readonly digitized: boolean;          // Se o item foi digitalizado
    readonly bornDigital: boolean;        // Se é nativo digital
    readonly registryNumber: string;      // Número de registro
    readonly state: string;               // Estado
    readonly author: string;              // Autoria da digitalização
    readonly digitizationTechnique: string; // Técnica usada na digitalização
    readonly collection: string;          // Coleção
    readonly donor: string;               // Doador
    readonly fileSizeMB: number;          // Tamanho do arquivo (MB)
    readonly contextHistory: string;      // Histórico/contexto
    
    constructor(
        id: number,
        thumbnailUrl: string,
        city: string,
        objectName: string,
        creationDate: string,
        legend: string,
        technique: string,
        material: string,
        digitized: boolean,
        bornDigital: boolean,
        registryNumber: string,
        state: string,
        author: string,
        digitizationTechnique: string,
        collection: string,
        donor: string,
        fileSizeMB: number,
        contextHistory: string
    ) {
        this.id = id;
        this.thumbnailUrl = thumbnailUrl;
        this.city = city;
        this.objectName = objectName;
        this.creationDate = creationDate;
        this.legend = legend;
        this.technique = technique;
        this.material = material;
        this.digitized = digitized;
        this.bornDigital = bornDigital;
        this.registryNumber = registryNumber;
        this.state = state;
        this.author = author;
        this.digitizationTechnique = digitizationTechnique;
        this.collection = collection;
        this.donor = donor;
        this.fileSizeMB = fileSizeMB;
        this.contextHistory = contextHistory;
    }
}
