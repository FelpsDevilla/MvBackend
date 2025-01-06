class livraria_item {
    readonly id: number;
    readonly city: string;
    readonly ObjectName: string;
    readonly creationDate: Date;
    readonly legend: string;
    readonly stateOrigin: string;
    readonly author: string;
    readonly digitalizationTchenique: string;
    readonly collection: string;
    readonly donor: string;
    readonly contextHistory: string;
    readonly thubnailUrl: string;
    readonly createAt: Date;
    readonly updateAt: Date;

    constructor(
        id: number,
        thubnailUrl: string,
        city: string,
        ObjectName : string,
        creationDate: Date,
        stateOrigin: string,
        legend: string,
        author: string,
        digitalizationTchenique: string,
        collection: string,
        donor: string,
        contextHistory: string,
        createAt: Date,
        updateAt: Date
    ) {
        this.id = id;
        this.thubnailUrl = thubnailUrl;
        this.city = city;
        this.ObjectName = ObjectName   ;
        this.creationDate = creationDate;
        this.legend = legend;
        this.stateOrigin = stateOrigin;
        this.author = author;
        this.digitalizationTchenique = digitalizationTchenique;
        this.collection = collection;
        this.donor = donor;
        this.contextHistory = contextHistory;
        this.createAt = createAt;
        this.updateAt = updateAt;
    }
}