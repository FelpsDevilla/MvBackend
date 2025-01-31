import { Expose } from "class-transformer";
import { super_item } from "./super_item";


export class livraria_item extends super_item {
    
    @Expose()
    digitalizationTechnique: string
    
    constructor(
        id: number,
        thumbnailUrl: string,
        objectName: string,
        creationDate: Date,
        legend: string,
        state: string,
        city: string,
        author: string,
        collection: string,
        donor: string,
        contextHistory: string,
        created: Date,
        updated: Date,
        digitalizationTechnique: string
    ) {
        super(
            id,
            thumbnailUrl,
            objectName,
            creationDate,
            legend,
            state,
            city,
            author,
            collection,
            donor,
            contextHistory,
            created,
            updated
        );
        this.digitalizationTechnique = digitalizationTechnique
    }
}