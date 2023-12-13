import { Router } from "express";
import * as productController from '../controllers/product.controllers'
import { verifyToken } from "~/middlewares";

const productRouter = Router()

productRouter.get('/', productController.getAllProduct)
productRouter.get('/:id', productController.getProduct)
productRouter.get('/search/:key', productController.searchProduct)
productRouter.post('/', verifyToken, productController.createProduct)

export default productRouter