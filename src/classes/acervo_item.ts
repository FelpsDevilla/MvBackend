class Acervo_item{
    readonly id: number
    readonly city: string;               
    readonly objectName: string;          
    readonly creationDate: string;        
    readonly legend: string;              
    readonly technique: string;           
    readonly material: string;            
    readonly digitized: boolean;          
    readonly stateOrigin: string;              
    readonly author: string;              
    readonly collection: string;          
    readonly donor: string;               
    readonly contextHistory: string;      
    readonly thumbnailUrl: string;
    readonly createAt: Date;
    readonly updateAt: Date;
    
    constructor(
        id: number,
        city: string,
        objectName: string,
        creationDate: string,
        legend: string,
        technique: string,
        material: string,
        digitized: boolean,
        stateOrigin: string,
        author: string,
        collection: string,
        donor: string,
        contextHistory: string,
        thumbnailUrl: string,
        createAt: Date,
        updateAt: Date,
    ) {
        this.id = id;
        this.city = city;
        this.objectName = objectName;
        this.creationDate = creationDate;
        this.legend = legend;
        this.technique = technique;
        this.material = material;
        this.digitized = digitized;
        this.stateOrigin = stateOrigin;
        this.author = author;
        this.collection = collection;
        this.donor = donor;
        this.contextHistory = contextHistory;
        this.thumbnailUrl = thumbnailUrl;
        this.createAt = createAt;
        this.updateAt = updateAt;
    }
}
