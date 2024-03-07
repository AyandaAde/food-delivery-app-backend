import express from "express";
import { param } from "express-validator";
import RestaurantsController from "../controllers/RestaurantsController";

const router = express.Router();

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a valid string"),
  RestaurantsController.searchRestaurants
);

export default router;