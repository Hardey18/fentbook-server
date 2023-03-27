import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    category: {
        type: "string",
        required: true
    },
    userId: {
        type: "string",
        required: true
    },
}, { timestamps: true })

export const CategoryModel = mongoose.model('Category', CategorySchema);