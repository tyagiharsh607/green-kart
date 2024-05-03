import Order from "../models/order.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

const getMyOrders = asyncHandler(async (req, res) => {
  const _id = req.user._id;
  const orders = await Order.find({ user: _id }).select(
    "_id createdAt totalPrice isPaid isDelivered paidAt deliveredAt"
  );
  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("No orders found");
  }
});

const addOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const user = req.user._id;
  const order = await Order.create({
    user,
    orderItems,
    shippingAddress,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  if (order) {
    res.status(201).json(order);
  } else {
    res.status(400);
    throw new Error("Invalid order data");
  }
});
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const { id, status, update_time, payer } = req.body;
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id,
      status,
      update_time,
      email_address: payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export {
  getOrders,
  addOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
};
