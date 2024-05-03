import { Router } from "express";
import {
  getGroceries,
  addGrocery,
  getGroceryById,
  deleteGroceryById,
  updateGroceryById,
  addReview,
  getTopGroceries,
} from "../controllers/grocery.controller.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/top").get(getTopGroceries);
router.route("/").get(getGroceries).post(protect, admin, addGrocery);
router.route("/:id").get(getGroceryById);
router.route("/:id").delete(protect, admin, deleteGroceryById);
router.route("/").post(protect, admin, addGrocery);
router.route("/:id").put(protect, admin, updateGroceryById);
router.route("/:id/reviews").post(protect, addReview);

export default router;
