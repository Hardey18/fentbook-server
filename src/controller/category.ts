import { Response } from "express";
import { CategoryModel } from "../model/category";
import { ErrorType } from "../typings";

export const createCategory = async (req: any, res: Response) => {
  const categoryData = req.body;
  const currentUser: any = req.user;
  try {
    const getExistingCategory = await CategoryModel.findOne({
      category: categoryData.category,
    });
    if (getExistingCategory) {
      return res.status(409).send({
        status: "error",
        path: req.url,
        message: `Category with the name - '${categoryData.category}' already exist`,
      });
    }
    const newCategory = await new CategoryModel({
      ...categoryData,
      userId: currentUser._id,
    });
    newCategory.save();
    res.status(201).send({
      status: "success",
      path: req.url,
      message: `New category with name - ${categoryData.category} added successfully`,
      data: newCategory,
    });
  } catch (error: any) {
    res.send({
      message: error.message,
      path: req.url,
    });
  }
};

export const getAllCategories = async (req: any, res: Response) => {
  try {
    const currentUser: any = req.user;
    const allCategories = await CategoryModel.find({ userId: currentUser._id });
    if (!allCategories.length) {
      return res.status(401).send({
        status: "error",
        path: req.url,
        message: `No categories created`,
      });
    }
    if (allCategories.length) {
      res.status(201).send({
        status: "success",
        path: req.url,
        data: allCategories,
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
