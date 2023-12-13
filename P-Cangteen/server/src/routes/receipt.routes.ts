import { Router } from "express";
import * as receiptController from '../controllers/receipt.controllers'
import { verifyToken } from "~/middlewares";

const receiptRouter = Router()

receiptRouter.get('/', receiptController.getAllReceipt)
receiptRouter.get('/:id', receiptController.getReceipt)
receiptRouter.get('/search/:key', receiptController.searchReceipt)
receiptRouter.post('/', receiptController.createReceipt)

export default receiptRouter