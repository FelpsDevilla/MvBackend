export class super_item {
    constructor(
        public readonly id: number,
        public readonly thumbnailUrl: string,
        public readonly objectName: string,
        public readonly creationDate: Date,
        public readonly legend: string,
        public readonly state: string,
        public readonly city: string,
        public readonly author: string,
        public readonly collection: string,
        public readonly donor: string,
        public readonly contextHistory: string,
        public readonly created: Date,
        public readonly updated: Date
    ) {}
}