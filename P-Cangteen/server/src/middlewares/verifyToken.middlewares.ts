import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken'

export const verifyToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers?.authorization;
  const token = authHeader && authHeader.split(" ")[1];


  if (!token || !process.env.SECRET_TOKEN) {
    return res.status(401).json({ success: false, message: "Token not found" });
  }
  try {
    const decode = <jwt.JwtPayload>jwt.verify(token, process.env.SECRET_TOKEN);
    req.userId = decode.id;
    console.log(decode);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Invalid token" });
  }
};

