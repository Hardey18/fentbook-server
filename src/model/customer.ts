import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    customerName: {
      type: "string",
      required: true,
    },
    customerEmail: {
      type: "string",
      required: true,
    },
    userId: {
      type: "string",
      required: true,
    },
    phoneNumber: {
      type: "string",
      required: true,
    },
    addressLine: {
      type: "string",
      required: true,
    },
    city: {
      type: "string",
      required: true,
    },
    state: {
      type: "string",
      required: true,
    },
    note: {
      type: "string",
      required: true,
    }
  },
  { timestamps: true }
);

export const CustomerModel = mongoose.model("Customer", CustomerSchema);
