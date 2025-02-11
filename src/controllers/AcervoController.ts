import { acervo_item } from "classes/acervo_item";
import { Request, Response } from "express";
import { AcervoModel } from "models/AcervoModel";

export class AcervoController{

    static async getAllItens(){

    }

    static async getItem(){

    }

    static async createItem(req: Request, res: Response){
        try {
            const item: acervo_item = req.body;        
            
            await AcervoModel.create(item)

            res.status(200).send("Adcionado ");
          } catch (error) {
            console.log(error)
            res.status(500).send("Error")
          }
    }

    static async updateItem(){

    }

    static async deleteItem(){

    }

}