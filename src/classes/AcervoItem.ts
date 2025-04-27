import { Expose } from "class-transformer";

export class AcervoItem{
    @Expose()
    id: number;
    
    @Expose()
    city: string;

    @Expose({ name: 'object_name' })
    objectName: string;
    
    @Expose({ name: 'creation_date' })
    creationDate: Date;

    @Expose()
    legend: string;
    
    @Expose({ name: 'thumbnail_url' })
    thumbnailUrl: string;

    @Expose()
    state: string;

    @Expose({ name: 'author_id' })
    authorId: number;

    @Expose({ name: 'collection_id' })
    collectionId: number;

    @Expose()
    donor: string;

    @Expose({ name: 'context_history' })
    contextHistory: string;

    @Expose({ name: 'created_at' })
    createdAt: Date;

    @Expose({ name: 'updated_at'})
    updatedAt: Date;
    
    @Expose()
    technique: string;

    @Expose()
    material: string;
    
    @Expose()
    digitalized: boolean;
    
}