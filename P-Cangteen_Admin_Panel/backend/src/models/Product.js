const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
    {
        title: { type: String, require: true },
        supplier: { type: String, require: true },
        price: { type: String, require: true },
        imageUrl: { type: String, require: true },
        description: { type: String, require: true },
        product_location: { type: String, require: true },
    },
    {
        timestamps: true
    }
);
ProductSchema.index({ title: "text", description: "text" });

const ProductModel = model('Products', ProductSchema);

module.exports = ProductModel;
