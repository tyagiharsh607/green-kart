import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(id).select("-password");
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token found");
  }
  next();
});

const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) next();
  else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
});
export { protect, admin };
