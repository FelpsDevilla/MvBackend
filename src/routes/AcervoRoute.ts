import { AcervoController } from "controllers/AcervoController";
import  express, { Router }  from "express";

const router: Router = express.Router();
const url: string = "/acervo_itens";

router.post(url, AcervoController.insertItem);
router.get(url, AcervoController.getAllItens)
router.get(`${url}/:id`, AcervoController.getItemByID)
router.put(url, AcervoController.updateItem)
router.delete(url, AcervoController.deleteItem)