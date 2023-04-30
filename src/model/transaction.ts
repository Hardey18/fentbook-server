import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    amount: {
      type: "number",
      required: true,
    },
    description: {
      type: "string",
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
    vendor: {
      type: "string",
      required: true,
    },
  },
  { timestamps: true }
);

export const TransactionModel = mongoose.model("Transaction", TransactionSchema);
