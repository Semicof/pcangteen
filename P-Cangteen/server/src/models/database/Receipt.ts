import { Schema, model } from "mongoose";
import { ProductModel } from ".";
import UserModel from "./User";

const ReceiptSchema = new Schema(
    {
        products: {
            type: [{ item: Schema.Types.ObjectId, count: Number }],
            ref: "Products"
        },
        price: {
            type: String,
            require: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        },
        address: {
            type: String,
            require: true,
        }

    }, {
    timestamps: true
}
)
const ReceiptModel = model('Receipts', ReceiptSchema)

export default ReceiptModel
