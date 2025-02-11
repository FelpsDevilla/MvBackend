import { acervo_item } from "classes/acervo_item";
import { uteis } from "classes/uteis";
import dbPool from "db/Database";
import { DbConnection } from "db/DbConnection";

export class AcervoModel {
  private static table = "acervo_table";

  static async create(newItem: acervo_item): Promise<void> {

    const columns = uteis.ObjectKeysToDbCollums(acervo_item);
    const values = Object.values(acervo_item);
    const placeholders = uteis.placeHolderBuilder(values);

    const query = {
      text: `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders})`,
      values: values,
    };

    await dbPool.query(query)
  }

  
}
