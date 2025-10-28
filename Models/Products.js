import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title:{type:String,require:true},
    desc:{type:String,require:true},
    price:{type:Number,require:true},
    cat:{type:String,require:true},
    qty:{type:Number,require:true},
    imgsrc:{type:String,require:true},
    createdAt:{type:Date,default:Date.now},
})

export const Products =mongoose.model("product" , productSchema);