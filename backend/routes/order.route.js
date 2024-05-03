import { Router } from "express";
import {
  getMyOrders,
  getOrders,
  addOrder,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/order.controller.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/").get(protect, admin, getOrders).post(protect, addOrder);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
