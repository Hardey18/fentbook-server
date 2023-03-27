import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    productName: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    price: {
      type: "number",
      required: true,
    },
    userId: {
      type: "string",
      required: true,
    },
    category: {
      type: [{ category: "string" }],
      required: true,
    },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("Product", ProductSchema);
