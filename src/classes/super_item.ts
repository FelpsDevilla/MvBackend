export class item {
    
    readonly id: number
    readonly thumbnailUrl: string;
    readonly objectName: string;
    readonly creationDate: Date;
    readonly legend: string;
    readonly state: string;
    readonly city: string;
    readonly author: string;
    readonly collection: string;
    readonly donor: string;
    readonly contextHistory: string;
    readonly created: Date;
    readonly updated: Date;

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
        updated: Date
    ) {
        this.id = id;
        this.thumbnailUrl = thumbnailUrl;
        this.objectName = objectName;
        this.creationDate = creationDate;
        this.legend = legend;
        this.state = state;
        this.city = city;
        this.author = author;
        this.collection = collection;
        this.donor = donor;
        this.contextHistory = contextHistory;
        this.created = created;
        this.updated = updated;
    }
}