export class uteis{

    private static camelCaseToSnakeCase(camel: string): string {
        return camel.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    }

    static ObjectKeysToDbCollums(obj: object){
        return Object.keys(obj).map(this.camelCaseToSnakeCase)
    }

    static placeHolderBuilder(values: string[]): string{
        return values.map((_, i) => `$${i + 1}`).join(", ");
    }
}