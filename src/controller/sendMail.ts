import { Response } from "express";
// import { email } from "../services/nodemailer";
import { invoiceTemplate } from "../services/emailTemplate";
import Mailer from "../services/nodemailer";
import path from "path";
import { InvoiceModel } from "../model/invoice";
import { UserModel } from "../model/user";

export const sendMail = async (req: any, res: Response) => {
  const invoiceId = req.params.invoiceId;
  const currentUser: any = req.user;

  try {
    const invoice = await InvoiceModel.findOne({ _id: invoiceId });
    const user = await UserModel.findOne({ _id: currentUser._id });
    console.log("INVOICE", invoice, user);
    // invoiceId = invoice.invoiceId
    // grandTotal = invoice.grandTotal
    // quantity = invoice.quantity
    // totalPrice = invoice.totalPrice
    // shippingCost = invoice.shippingCost
    // description = invoice.description
    // productName = invoice.product.productName
    // customerName = invoice.customer.customerName
    // customerEmail = invoice.customer.customerEmail
    // customerPhone = invoice.customer.phoneNumber
    // customerAddress = invoice.customer.addressLine, invoice.customer.city, invoice.customer.state
    // vat = invoice.vat
    // profilePhoto = user.profilePhoto
    // email = user.email
    // firstname = user.firstname
    // lastname = user.lastname
    // companyName = user.companyName

    const html = invoiceTemplate(
      user.profilePhoto,
      invoice.invoiceId,
      user.companyName,
      user.email,
      invoice.product[0].productName,
      invoice.customer[0].customerName,
      invoice.customer[0].addressLine,
      invoice.customer[0].city,
      invoice.customer[0].state,
      invoice.customer[0].customerEmail,
      invoice.createdAt,
      invoice.description,
      invoice.totalPrice,
      invoice.quantity,
      invoice.vat,
      invoice.shippingCost,
      invoice.grandTotal
    );
    await Mailer.sendEmail(
      user.email,
      invoice.customer[0].customerEmail,
      `INVOICE DETAILS FROM - ${user.companyName}`,
      html
    );
    return res.status(200).send({
      status: "success",
      path: req.url,
      method: req.method,
      data: "Invoice sent to customer",
    });
  } catch (error) {
    console.log("ERROR", error);
  }
};
