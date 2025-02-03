import { Expose, plainToInstance } from "class-transformer";
import { super_item } from "./super_item.js";

export class acervo_item extends super_item{
    
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
    
    static fromJson(json: any): acervo_item {
        return plainToInstance(acervo_item, json)[0];
    }
}