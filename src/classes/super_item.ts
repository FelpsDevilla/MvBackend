import { Expose } from "class-transformer";

export abstract class super_item {
   
    @Expose()
    id: number;

    @Expose()
    thumbnailUrl: string;

    @Expose()
    objectName: string;

    @Expose()
    creationDate: Date;

    @Expose()
    legend: string;

    @Expose()
    state: string;

    @Expose()
    city: string;

    @Expose()
    author: string;

    @Expose()
    collection: string;

    @Expose()
    donor: string;

    @Expose()
    contextHistory: string;

    @Expose()
    created: Date;

    @Expose()
    updated: Date;

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
