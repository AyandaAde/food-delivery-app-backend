import express from "express";
import MyRestaurantController from "../controllers/MyRestaurantController";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();

router.post("/", MyRestaurantController.createMyRestaurant);
router.get("/:id", MyRestaurantController.getMyRestaurant);
router.put("/", MyRestaurantController.updateMyRestaurant);
export default router;
