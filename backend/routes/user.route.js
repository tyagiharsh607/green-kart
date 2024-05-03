import { Router } from "express";
import {
  getUsers,
  signIn,
  signUp,
  logout,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/").get(protect, admin, getUsers);
router.route("/signin").post(signIn);
router.route("/signup").post(signUp);
router.route("/logout").post(protect, logout);
router.route("/updateuser").put(protect, updateUser);
router.route("/:id").delete(protect, admin, deleteUser);

export default router;
