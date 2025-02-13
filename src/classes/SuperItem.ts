import { Expose } from "class-transformer";

export abstract class SuperItem {
   
    @Expose()
    id: number;
    
    @Expose()
    city: string;

    @Expose()
    objectName: string;
    
    @Expose()
    creationDate: Date;

    @Expose()
    legend: string;
    
    @Expose()
    thumbnailUrl: string;

    @Expose()
    state: string;

    @Expose()
    authorId: number;

    @Expose()
    collectionId: number;

    @Expose()
    donor: string;

    @Expose()
    contextHistory: string;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

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
        updatedAt: Date
    ) {
        this.id = id;
        this.thumbnailUrl = thumbnailUrl;
        this.objectName = objectName;
        this.creationDate = creationDate;
        this.legend = legend;
        this.state = state;
        this.city = city;
        this.authorId = authorId;
        this.collectionId = collectionId;
        this.donor = donor;
        this.contextHistory = contextHistory;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}
