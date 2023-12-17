const { Schema, model } = require("mongoose");


const ReceiptSchema = new Schema(
    {
        products: {
            type: Schema.Types.ObjectId,
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

module.exports = ReceiptModel;
