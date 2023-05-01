import { Response } from "express";
import { CategoryModel } from "../model/category";
import { TransactionModel } from "../model/transaction";
import { UserModel } from "../model/user";
import { ErrorType } from "../typings";

export const createTransaction = async (req: any, res: Response) => {
  const categoryId = req.params.categoryId;
  const transactionData = req.body;
  const currentUser: any = req.user;

  try {
    const myCategories = await CategoryModel.find({ userId: currentUser._id });
    const category = myCategories.filter((item: any) => {
      return item._id.toString() === categoryId;
    });
    if (!category.length) {
      return res.status(409).send({
        status: "error",
        path: req.url,
        message: `Category does not exist`,
      });
    }
    const user: any = await UserModel.findOne({ _id: currentUser._id });
    const updatedBalance = user.accountBalance - +transactionData.amount;
    const updatedExpenses = user.totalExpenses + +transactionData.amount;
    if (user.accountBalance < transactionData.amount) {
      return res.status(401).send({
        status: "error",
        path: req.url,
        message: `Insufficient balance`,
      });
    }
    await UserModel.findByIdAndUpdate(
      { _id: currentUser._id },
      {
        accountBalance: updatedBalance,
        totalExpenses: updatedExpenses,
        netProfit: (user.totalIncome - +transactionData.amount) - user.totalExpenses
      }
    );
    const newTransaction = await new TransactionModel({
      ...transactionData,
      userId: currentUser._id,
      category,
    });
    newTransaction.save();
    res.status(201).send({
      status: "success",
      path: req.url,
      message: `Transaction recorded successfully`,
      data: newTransaction,
    });
  } catch (error: any) {
    console.log("ERROR", error)
    const err = error as ErrorType;
    return res.status(500).send({
      status: "error",
      error: err.message,
      path: req.url,
    });
  }
};

export const getAllTransactions = async (req: any, res: Response) => {
  try {
    const currentUser: any = req.user;
    const allTransactions = await TransactionModel.find({
      userId: currentUser._id,
    });
    res.status(201).send({
      status: "success",
      path: req.url,
      data: allTransactions,
    });
  } catch (error: any) {
    const err = error as ErrorType;
    return res.status(500).send({
      status: "error",
      error: err.message,
      path: req.url,
    });
  }
};
