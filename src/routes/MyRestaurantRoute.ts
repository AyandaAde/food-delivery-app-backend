import express from "express";
import MyRestaurantController from "../controllers/MyRestaurantController";

const router = express.Router();

router.post("/", MyRestaurantController.createMyRestaurant);
router.get("/:userId", MyRestaurantController.getMyRestaurant);
router.put("/", MyRestaurantController.updateMyRestaurant);
router.get("/order/:userId", MyRestaurantController.getMyRestaurantOrders);
router.patch(
  "/order/:orderId/status/:userId",
  MyRestaurantController.updateOrderStatus
);
export default router;
