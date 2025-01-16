import { instanceToPlain, plainToInstance } from "class-transformer";

export class util {

    private constructor() {};

    static serializeClass<T>(type: new () => T,json: string[]): T{

        const item = (plainToInstance(type, json))[0]
        return item
    }

    static deserializeClas<T>(item: T): T{
        const itemJson = instanceToPlain(item)
        return itemJson.string;
    }
}