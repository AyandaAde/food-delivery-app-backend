import express from "express";
import OrderController from "../controllers/OrderController";

const router = express.Router();

router.post(
  "/checkout/:userId/create-checkout-session/",
  OrderController.createCheckoutSession
);

router.post("/checkout/webhook", OrderController.stripeWebhookHandler);

router.get("/:userId", OrderController.getMyOrders);

export default router;
