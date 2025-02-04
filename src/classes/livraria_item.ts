import { Expose } from "class-transformer";
import { super_item } from "./super_item.js";


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
        authorId: number,
        collectionId: number,
        donor: string,
        contextHistory: string,
        createdAt: Date,
        updatedAt: Date,
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
            authorId,
            collectionId,
            donor,
            contextHistory,
            createdAt,
            updatedAt
        );
        this.digitalizationTechnique = digitalizationTechnique
    }
}