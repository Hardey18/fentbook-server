import { Response } from "express";
import { CategoryModel } from "../model/category";
import { ProductModel } from "../model/product";
import { ErrorType } from "../typings";

export const createProduct = async (req: any, res: Response) => {
  const categoryId = req.params.categoryId;
  const productData = req.body;
  const currentUser: any = req.user;

  try {
    const myCategories = await CategoryModel.find({ userId: currentUser._id });
    const myProducts = await ProductModel.find({ userId: currentUser._id });
    const category = myCategories.filter((item: any) => {
      return item._id.toString() === categoryId;
    });
    const product = myProducts.filter((item: any) => {
      return item.productName === productData.productName;
    });

    if (!category.length) {
      return res.status(409).send({
        status: "error",
        path: req.url,
        message: `Category does not exist`,
      });
    }
    if (product.length) {
      return res.status(409).send({
        status: "error",
        path: req.url,
        message: `Product with the name - '${productData.productName}' already exist`,
      });
    }
    const newProduct = await new ProductModel({
      ...productData,
      userId: currentUser._id,
      category,
    });
    newProduct.save();
    res.status(201).send({
      status: "success",
      path: req.url,
      message: `New product with name - ${productData.productName} added successfully`,
      data: newProduct,
    });
  } catch (error: any) {
    res.send({
      message: error.message,
      path: req.url,
    });
  }
};

export const getAllProducts = async (req: any, res: Response) => {
  try {
    const currentUser: any = req.user;
    const allProducts = await ProductModel.find({ userId: currentUser._id });
    if (!allProducts.length) {
      return res.status(401).send({
        status: "error",
        path: req.url,
        message: `No products created`,
      });
    }
    if (allProducts.length) {
      res.status(201).send({
        status: "success",
        path: req.url,
        data: allProducts,
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
