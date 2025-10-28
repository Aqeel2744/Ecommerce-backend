import mongoose from "mongoose";


export const cartItemsSchema = ({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", require: true },
    title: { type: String, require: true },
    price: { type: Number, require: true },
    qty: { type: Number, require: true },
    imgsrc: { type: String, require: true },

})

export const cartSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    items: [cartItemsSchema],
})

export const Cart = mongoose.model("cart" , cartSchema);