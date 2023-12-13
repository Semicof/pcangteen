import { Controller } from '~/type';
import { ReceiptModel } from '../models/database'

const createReceipt: Controller = async (req, res) => {
    const newReceipt = new ReceiptModel(req.body)
    try {
        await newReceipt.save();
        return res.status(200).json({ message: "Receipt created successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "failed to create the Receipt" })

    }
}

const getAllReceipt: Controller = async (req, res) => {
    try {
        const Receipts = await ReceiptModel.find().sort({ createdAt: -1 })
        res.status(200).json(Receipts)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "failed to get the Receipt" })

    }
}

const getReceipt: Controller = async (req, res) => {
    try {
        const Receipt = await ReceiptModel.find({ user: req.params.id }).populate({
            path: 'products.item',
            select:
                'title supplier price imageUrl description product_location',
        })
        console.log('run here?');

        res.status(200).json(Receipt)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "failed to get the Receipt" })

    }
}


const searchReceipt: Controller = async (req, res) => {
    try {
        const result = await ReceiptModel.aggregate(
            [
                {
                    $search: {
                        index: "default",
                        text: {
                            query: req.params.key,
                            path: {
                                wildcard: "*"
                            }
                        }
                    }
                }
            ]
        )
        return res.status(200).json(result)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "failed to search the Receipt" })

    }
}


export {
    createReceipt,
    getAllReceipt,
    getReceipt,
    searchReceipt
}