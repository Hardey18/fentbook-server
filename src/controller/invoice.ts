import { Response } from "express";
import { CustomerModel } from "../model/customer";
import { InvoiceModel } from "../model/invoice";
import { ProductModel } from "../model/product";
import { UserModel } from "../model/user";
import { ErrorType } from "../typings";
import { getRandomNumber } from "../utils/randomNumber";

export const createInvoice = async (req: any, res: Response) => {
  const customerId = req.params.customerId;
  const productId = req.params.productId;
  const invoiceData = req.body;
  const currentUser: any = req.user;

  try {
    const customer = await CustomerModel.findOne({ _id: customerId });
    const product = await ProductModel.findOne({ _id: productId });
    const user: any = await UserModel.findOne({ _id: currentUser._id });
    const price = +invoiceData.totalPrice * invoiceData.quantity;
    let totalPrice = +invoiceData.shippingCost + price;
    let vatRate = (+invoiceData.vat / 100) * price;
    console.log({ totalPrice, vatRate, invoiceData, price });
    let grandTotal = totalPrice + vatRate;
    await UserModel.findOneAndUpdate(
      { _id: user._id },
      {
        totalIncome: user.totalIncome + grandTotal,
        netProfit: user.totalIncome + grandTotal - user.totalExpenses,
      }
    );
    const newInvoice = await new InvoiceModel({
      ...invoiceData,
      fullname: `${currentUser.firstname} ${currentUser.lastname}`,
      userId: currentUser._id,
      customer,
      product,
      grandTotal,
      trackTotal: grandTotal,
      netProfit: user.totalIncome - user.totalExpenses,
      invoiceId: `INVOICE-${getRandomNumber()}`,
      verified: false,
    });
    newInvoice.save();
    res.status(201).send({
      status: "success",
      path: req.url,
      message: `New invoice added successfully`,
      data: newInvoice,
    });
  } catch (error: any) {
    res.send({
      message: error.message,
      path: req.url,
    });
  }
};

export const verifyInvoice = async (req: any, res: Response) => {
  const invoiceData = req.body;
  const currentUser: any = req.user;
  const invoiceId = req.params.invoiceId;
  try {
    const invoice = await InvoiceModel.findOne({ _id: invoiceId });
    const user: any = await UserModel.findOne({ _id: currentUser._id });
    const updatedBalance = +invoiceData.amount + user.accountBalance;
    if (!invoice) {
      return res.status(409).send({
        status: "error",
        path: req.url,
        message: `Invoice does not exist`,
      });
    }
    if (+invoiceData.amount > invoice.trackTotal) {
      return res.status(409).send({
        status: "error",
        path: req.url,
        message: `Amount greater than balance`,
      });
    } else {
      await UserModel.findOneAndUpdate(
        { _id: currentUser._id },
        { accountBalance: updatedBalance }
      );
      await InvoiceModel.findOneAndUpdate(
        { _id: invoiceId },
        { trackTotal: invoice.trackTotal - +invoiceData.amount }
      );
    }
    if (invoice.trackTotal - +invoiceData.amount === 0) {
      await InvoiceModel.findOneAndUpdate(
        { _id: invoiceId },
        { verified: true }
      );
    }
    res.status(201).send({
      status: "success",
      path: req.url,
      message: "Invoice verified and account balance updated succefully",
    });
  } catch (error) {}
};

export const getAllInvoices = async (req: any, res: Response) => {
  try {
    const currentUser: any = req.user;
    const allInvoices = await InvoiceModel.find({ userId: currentUser._id });
    res.status(201).send({
      status: "success",
      path: req.url,
      data: allInvoices,
    });
  } catch (error: any) {
    const err = error as ErrorType;
    return res.status(500).send({
      status: "error",
      error: err.message,
    });
  }
};

export const getSingleInvoice = async (req: any, res: Response) => {
  try {
    const invoiceId = req.params.id;
    const invoice: any = await InvoiceModel.find({ _id: invoiceId });
    res.status(201).send({
      status: "success",
      path: req.url,
      data: invoice,
    });
  } catch (error: any) {
    const err = error as ErrorType;
    return res.status(500).send({
      status: "error",
      error: err.message,
    });
  }
};
