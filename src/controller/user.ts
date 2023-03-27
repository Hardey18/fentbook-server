import { Request, Response } from "express";
import { UserModel } from "../model/user";
import cloudinary from "../services/cloudinary";
import { ErrorType } from "../typings";
import { compare, toHash } from "../utils/passwordHashing";
import { generateToken } from "../utils/token";
import { userSchema } from "../utils/validation/user";

export const createUser = async (req: Request, res: Response) => {
  const userData = req.body;
  const error: any = userSchema.safeParse(userData);
  try {
    if (error.success === false) {
      return res.status(400).send({
        success: false,
        path: req.url,
        message: error.error.issues[0].message,
      });
    }
    const getExistingUser = await UserModel.findOne({ email: userData.email });
    if (getExistingUser) {
      return res.status(409).send({
        status: "error",
        path: req.url,
        message: `User with the email - '${userData.email}' already exist`,
      });
    }
    let hashedPassword = await toHash(userData.password);
    const user = await new UserModel({
      ...userData,
      companyName: "",
      about: "",
      accountBalance: 0,
      totalIncome: 0,
      totalExpenses: 0,
      netWorth: 0,
      profilePhoto: "",
      password: hashedPassword,
    });
    user.save();
    res.status(201).send({
      status: "success",
      path: req.url,
      message: `New user with email - ${userData.email} added successfully`,
      data: user,
    });
  } catch (error: any) {
    res.send({
      message: error.message,
      route: "/create-user",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const userData = req.body;
  try {
    const getExistingUser = await UserModel.findOne({ email: userData.email });
    if (!getExistingUser) {
      return res.status(409).send({
        success: false,
        path: req.url,
        message: `Email or password is incorrect`,
      });
    }
    if (getExistingUser) {
      const { _id, firstname, lastname, email } = getExistingUser;
      const token = generateToken({
        _id,
        firstname,
        lastname,
        email,
      });
      console.log({
        existing: getExistingUser.password,
        current: userData.password,
      });
      const verifyPassword = await compare(
        getExistingUser.password,
        userData.password
      );
      console.log("VERIFY", verifyPassword);
      if (!verifyPassword) {
        return res.status(401).send({
          status: "error",
          path: req.url,
          message: `Email or password is incorrect`,
        });
      }
      if (verifyPassword) {
        return res.status(201).send({
          status: "success",
          path: req.url,
          data: getExistingUser,
          token,
        });
      }
    }
  } catch (error: any) {
    return res.status(500).send({
      status: "error",
      error: error.message,
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      return res.status(409).send({
        status: "error",
        path: req.url,
        message: `User with the id - '${id}' does not exist`,
      });
    }
    res.status(201).send({
      status: "success",
      path: req.url,
      data: user,
    });
  } catch (error: any) {
    const err = error as ErrorType;
    return res.status(500).send({
      status: "error",
      error: err.message,
    });
  }
};

export const updateUser = async (req: any, res: Response) => {
  try {
    const currentUser = req.user;
    await UserModel.findByIdAndUpdate(
      currentUser._id,
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        companyName: req.body.companyName,
        about: req.body.about
      },
      { new: true }
    );
    res.status(201).send({
      status: "success",
      path: req.url,
      message: `User details updated successfully`,
    });
  } catch (error: any) {
    return res.status(500).send({
      status: "error",
      error: error.message,
    });
  }
};
export const updatePhoto = async (req: any, res: Response) => {
  try {
    const currentUser = req.user;
    const profilePhoto = await cloudinary.uploader.upload(
      req.body.profilePhoto,
      {
        allowed_formats: ["jpg", "png", "svg", "jpeg"],
        public_id: "",
        folder: "fentbooks",
      }
    );
    if (!profilePhoto) {
      throw new Error('Image is not a valid format. Only jpg, png, svg and jpeg allowed');
    }
    await UserModel.findByIdAndUpdate(
      currentUser._id,
      {
        profilePhoto: profilePhoto?.url,
      },
      { new: true }
    );
    res.status(201).send({
      status: "success",
      path: req.url,
      message: `User photo updated successfully`,
    });
  } catch (error: any) {
    console.log("ERROR", error);
    return res.status(500).send({
      status: "error",
      error: error.message,
    });
  }
};
