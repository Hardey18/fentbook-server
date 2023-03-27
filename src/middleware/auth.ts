import { NextFunction, Response } from "express";

import { ErrorType } from "../typings";
import { verifyToken } from "../utils/token";

export const auth = async (req: any, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;

    if (authorization === undefined) throw new Error("no auth");
    const token = authorization.split(" ")[1];

    if (!token || token === "") {
      return res.status(401).send({
        status: "error",
        path: req.url,
        method: req.method,
        data: "Access denied",
      });
    }
    const decoded = await verifyToken(token);
    req.user = decoded;
    return next();
  } catch (error) {
    const err = error as ErrorType;
    if (err.message === "no auth" || err.message === "jwt expired") {
      return res.status(401).send({
        status: "error",
        path: req.url,
        method: req.method,
        data: "Authorization failed",
      });
    }
    return res.status(500).send({
      status: "error",
      path: req.url,
      method: req.method,
      data: "Server error",
    });
  }
};
