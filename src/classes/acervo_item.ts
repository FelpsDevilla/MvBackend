import { item } from "./super_item";

class Acervo_item extends item{
    
    readonly technique: string;           // Técnica usada
    readonly material: string;            // Material do objeto
    readonly digitized: boolean;          // Se o item foi digitalizado
    readonly bornDigital: boolean;        // Se é nativo digital
    readonly digitizationTechnique: string; // Técnica usada na digitalização

    constructor(
        
        id: number,
        thumbnailUrl: string,
        city: string,
        objectName: string,
        creationDate: Date,
        legend: string,
        technique: string,
        material: string,
        digitized: boolean,
        bornDigital: boolean,
        state: string,
        author: string,
        digitizationTechnique: string,
        collection: string,
        donor: string,
        contextHistory: string,
        created: Date,
        updated: Date
    ) {
        super(id, thumbnailUrl, objectName, creationDate, legend, state, city, author, collection, donor, contextHistory, created, updated);
        this.technique = technique;
        this.material = material;
        this.digitized = digitized;
        this.bornDigital = bornDigital;
        this.digitizationTechnique = digitizationTechnique;
    }
}
