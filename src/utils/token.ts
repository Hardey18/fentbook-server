import jwt from "jsonwebtoken";

export const generateToken = (userData: any) => {
  const token = jwt.sign(userData, "shhhhh", { expiresIn: "1d" });
  return token;
};

export const verifyToken = async (token: string, secret: string = "shhhhh") => {
  const decoded = await jwt.verify(token, secret);
  return decoded;
};
