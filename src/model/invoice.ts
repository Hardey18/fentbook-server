import mongoose from "mongoose";

const Schema = mongoose.Schema;

const InvoiceSchema = new Schema(
  {
    fullname: {
      type: "string",
      required: true,
    },
    userId: {
      type: "string",
      required: true,
    },
    customer: {
      type: [
        {
          customerName: "string",
          customerEmail: "string",
          phoneNumber: "string",
          addressLine: "string",
          city: "string",
          state: "string",
          note: "string",
          customerPhoto: "string",
        },
      ],
      required: true,
    },
    product: {
      type: [{ productName: "string", description: "string", price: "string" }],
      required: true,
    },
    shippingCost: {
      type: "number",
      required: true,
    },
    vat: {
      type: "number",
      required: true,
    },
    totalPrice: {
      type: "number",
      required: true,
    },
    trackTotal: {
      type: "number",
      required: true,
    },
    grandTotal: {
      type: "number",
      required: true,
    },
    quantity: {
      type: "number",
      required: true,
    },
    invoiceId: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    verified: {
      type: "boolean",
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export const InvoiceModel = mongoose.model("Invoice", InvoiceSchema);
