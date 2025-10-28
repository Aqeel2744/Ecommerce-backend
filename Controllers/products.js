import { Products } from '../Models/Products.js'

export const addProduct = async (req, res) => {
    const { title, desc, price, cat, qty, imgsrc } = req.body;
    let product = await Products.create({ title, desc, price, cat, qty, imgsrc });
    res.json({ message: "product added successfully", product, success: true });
}

export const getAllProducts = async (req, res) => {
    let products = await Products.find();
    if (!products) return req.json({ messageL: "No product exists", success: "false" })

    res.json({ message: "fetched all products successfully", products, success: "true" });
}

export const getProductById = async (req, res) => {
    const id = req.params.id;
    let product =await Products.findById(id);
    if (!product) return req.json({ message: "Invalid id", success: "false" })

    res.json({ message: "specific product", product, success: "true" });
}

export const updateProductById = async (req, res) => {
    const id = req.params.id;
    let product =await Products.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) return req.json({ message: "Invalid id", success: "false" })

    res.json({ message: "product updated successfully", product, success: "true" });

}

export const deleteProductById = async (req, res) => {
    const id = req.params.id;
    let product =await Products.findByIdAndDelete(id);
    if (!product) return res.json({ message: "Invalid id", success: "false" })

    res.json({ message: "product deleted", success: "true" })

}