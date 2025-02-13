import { Expose, plainToInstance } from "class-transformer";
import { SuperItem } from "./SuperItem.js";

export class AcervoItem extends SuperItem{
    
    @Expose()
    technique: string;

    @Expose()
    material: string;
    
    @Expose()
    digitalized: boolean;
    
    constructor(
        id: number,
        thumbnailUrl: string,
        objectName: string,
        creationDate: Date,
        legend: string,
        state: string,
        city: string,
        author: number,
        collection: number,
        donor: string,
        contextHistory: string,
        created: Date,
        updated: Date,
        technique: string,
        material: string,
        digitalized: boolean
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
        this.technique = technique,
        this.material = material,
        this.digitalized = digitalized
    }
}