import { Controller } from '~/type';
import { ProductModel } from '~/models/database';

const createProduct: Controller = async (req, res) => {
    const newProduct = new ProductModel(req.body)
    try {
        await newProduct.save();
        return res.status(200).json({ message: "product created successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "failed to create the product" })

    }
}

const getAllProduct: Controller = async (req, res) => {
    try {
        const products = await ProductModel.find().sort({ createdAt: -1 })
        res.status(200).json(products)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "failed to get the product" })

    }
}

const getProduct: Controller = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "failed to get the product" })

    }
}


const searchProduct: Controller = async (req, res) => {
    try {
        const result = await ProductModel.aggregate([
            {
                $match: {
                    $or: [
                        { title: { $regex: new RegExp(req.params.key, "i") } },
                        { description: { $regex: new RegExp(req.params.key, "i") } },
                    ],
                },
            },
        ]);
        return res.status(200).json(result);
    } catch (error) {
        console.error("Search error:", error);
        return res.status(500).json({ message: "failed to search the product" });
    }
};

export {
    createProduct,
    getAllProduct,
    getProduct,
    searchProduct
}