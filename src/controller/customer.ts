import { Response } from "express";
import { CustomerModel } from "../model/customer";
import cloudinary from "../services/cloudinary";
import { ErrorType } from "../typings";

export const createCustomer = async (req: any, res: Response) => {
  const customerData = req.body;
  const currentUser: any = req.user;
  try {
    const customerPhoto = await cloudinary.uploader.upload(
      req.body.customerPhoto,
      {
        allowed_formats: ["jpg", "png", "svg", "jpeg"],
        public_id: "",
        folder: "fentbooksCustomers",
      }
    );
    if (!customerPhoto) {
      throw new Error('Image is not a valid format. Only jpg, png, svg and jpeg allowed');
    }
    const getExistingCustomer = await CustomerModel.findOne({
      customerEmail: customerData.customerEmail,
    });
    if (getExistingCustomer) {
      return res.status(409).send({
        status: "error",
        path: req.url,
        message: `Category with the name - '${customerData.customerEmail}' already exist`,
      });
    }
    const newCustomer = await new CustomerModel({
      ...customerData,
      userId: currentUser._id,
      customerPhoto: customerPhoto?.url
    });
    newCustomer.save();
    res.status(201).send({
      status: "success",
      path: req.url,
      message: `New customer with name - ${customerData.customerName} added successfully`,
      data: newCustomer,
    });
  } catch (error: any) {
    res.send({
      message: error.message,
      path: req.url,
    });
  }
};

export const getAllCustomers = async (req: any, res: Response) => {
  try {
    const currentUser: any = req.user;
    const myCustomers: any = await CustomerModel.find({ userId: currentUser._id });
    if (!myCustomers.length) {
      return res.status(409).send({
        status: "error",
        path: req.url,
        message: `No customers created`,
      });
    }
    if (myCustomers.length) {
      res.status(201).send({
        status: "success",
        path: req.url,
        data: myCustomers,
      });
    }
  } catch (error: any) {
    const err = error as ErrorType;
    return res.status(500).send({
      status: "error",
      error: err.message,
    });
  }
};
