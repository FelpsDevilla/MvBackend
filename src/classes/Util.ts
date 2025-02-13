export class Util {
    private static camelCaseToSnakeCase(camel: string): string {
        return camel.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    }

    static objectKeysToDbColumns(obj: object): string[] {
        return Object.keys(obj).map(this.camelCaseToSnakeCase);
    }

    static buildPlaceholders(values: string[]): string {
        return values.map((_, i) => `$${i + 1}`).join(", ");
    }

    static buildUpdateSetClause(updatedItem: any): { setClause: string; values: any[] } {
        const filteredEntries = Object.entries(updatedItem).filter(([_, value]) => value !== undefined);
        const columns = filteredEntries.map(([key]) => this.camelCaseToSnakeCase(key));
        const values = filteredEntries.map(([_, value]) => value);
        const setClause = columns.map((column, i) => `${column} = $${i + 1}`).join(', ');

        return { setClause, values };
    }
}
