import { plainToInstance } from "class-transformer";

export class Util {
    private static camelCaseToSnakeCase(camel: string): string {
        return camel.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    }

    static objectKeysToDbColumns(entries: [string, any][]): string[] {
        return entries.map(([key]) => this.camelCaseToSnakeCase(key));
    }

    static objectValuestoDbValues(entries: [string, any][]): string[]{
        return entries.map(([_, value]) => value)
    }

    static buildPlaceholders(values: string[]): string {
        return values.map((_, i) => `$${i + 1}`).join(", ");
    }

    static buildUpdateSetClause(filteredEntries: [string, any][]): string {
        const columns = filteredEntries.map(([key]) => this.camelCaseToSnakeCase(key));
        const setClause = columns.map((column, i) => `${column} = $${i + 1}`).join(', ');
        return setClause;
    }

    static getNonUndefinedEntries(obj: object): [string, any][]{
        const filteredEntries = Object.entries(obj).filter(([_, value]) => value !== undefined);
        return filteredEntries;
    }

    static deserializeToInstance<T>(cls: new () => T, data: object | object[]): T {
      const instances = plainToInstance(cls, data);
      return Array.isArray(instances) ? instances[0] : instances;
    }
}
