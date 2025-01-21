import { super_item } from "./super_item.js";

export class acervo_item extends super_item {
    
    
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
        public readonly technique: string,
        public readonly material: string,
        public readonly digitized: boolean
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
    }
    
}