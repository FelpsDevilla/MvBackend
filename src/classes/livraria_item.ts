import { item } from "./super_item";

class livraria_item extends item {
    
    digitalizationThecnique: string;

    constructor(
        id: number,
        thumbnailUrl: string,
        city: string,
        state: string,
        objectName: string,
        creationDate: Date,
        legend: string,
        author: string,
        digitalizationThecnique: string,
        colection: string,
        donator: string,
        historyContext: string,
        createAt: Date,
        updateAt: Date
    ) {
     super(id, thumbnailUrl, objectName, creationDate, legend, state, city, author, colection, donator, historyContext, createAt, updateAt);
     this.digitalizationThecnique = digitalizationThecnique;
    }
}