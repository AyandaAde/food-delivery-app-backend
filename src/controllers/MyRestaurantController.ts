import { Request, Response } from "express";
import Restaurant from "../models/restaurants";
import mongoose from "mongoose";
import { stringToHex } from "../lib/utils";

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      restaurantName,
      city,
      country,
      deliveryPrice,
      estimatedDeliveryTime,
      cuisines,
      menuItems,
      imageUrl,
    } = req.body;

    const dbUserId = stringToHex(userId).slice(-24);
    const existingRestaurant = await Restaurant.findOne({
      user: dbUserId,
    });

    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: "User Restaurant already exists" });
    }

    const restaurant = new Restaurant({
      restaurantName,
      city,
      country,
      deliveryPrice,
      estimatedDeliveryTime,
      cuisines,
      menuItems,
      imageUrl,
    });

    restaurant.user = new mongoose.Types.ObjectId(dbUserId);
    restaurant.lastUpdated = new Date();
    await restaurant.save();

    return res.status(201).send(restaurant);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

async function getMyRestaurant(req: Request, res: Response) {
  try {
    const restuarant = await Restaurant.findOne({
      user: req.params.id,
    });

    if (!restuarant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    return res.json(restuarant);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Error fetching restaurant" });
  }
}

async function updateMyRestaurant(req: Request, res: Response) {
  const {
    userId,
    restaurantName,
    city,
    country,
    deliveryPrice,
    estimatedDeliveryTime,
    cuisines,
    menuItems,
    imageUrl,
  } = req.body;

  try {
    const restaurant = await Restaurant.findOne({
      user: userId,
    });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    restaurant.restaurantName = restaurantName;
    restaurant.city = city;
    restaurant.country = country;
    restaurant.deliveryPrice = deliveryPrice;
    restaurant.estimatedDeliveryTime = estimatedDeliveryTime;
    restaurant.cuisines = cuisines;
    restaurant.menuItems = menuItems;
    restaurant.imageUrl = imageUrl;
    restaurant.lastUpdated = new Date();

    await restaurant.save();
    return res.status(200).send(restaurant);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Something went wrong." });
  }
}

export default {
  createMyRestaurant,
  getMyRestaurant,
  updateMyRestaurant,
};
