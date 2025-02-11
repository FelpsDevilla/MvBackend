import { AcervoController } from "controllers/AcervoController";
import  express, { Router }  from "express";

const router: Router = express.Router();
const url: string = "/acervo_itens";

router.post(url, AcervoController.createItem);
router.get(url, AcervoController.getAllItens)
router.get(url, AcervoController.getItem)
router.put(url, AcervoController.updateItem)
router.delete(url, AcervoController.deleteItem)