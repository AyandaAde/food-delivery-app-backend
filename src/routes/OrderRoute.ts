import express from "express";
import OrderController from "../controllers/OrderController";

const router = express.Router();

router.post(
  "/checkout/:userId/create-checkout-session/",
  OrderController.createCheckoutSession
);

router.post("/checkout/webhook", OrderController.stripeWebhookHandler);

export default router;
