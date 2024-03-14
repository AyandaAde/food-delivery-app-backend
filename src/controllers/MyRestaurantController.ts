import { Request, Response } from "express";
import Restaurant from "../models/restaurants";
import mongoose from "mongoose";
import User from "../models/user";
import Order from "../models/order";

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

    const user = await User.findOne({
      userId,
    });
    if (!user) {
      throw new Error("User not found");
    }
    const existingRestaurant = await Restaurant.findOne({
      user: user._id,
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

    restaurant.user = new mongoose.Types.ObjectId(user._id);
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
    const user = await User.findOne({
      userId: req.params.userId,
    });
    if (!user) {
      throw new Error("User not found");
    }

    const restaurant = await Restaurant.findOne({
      user: user._id,
    });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    return res.json(restaurant);
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

async function getMyRestaurantOrders(req: Request, res: Response) {
  try {
    const user = await User.findOne({
      userId: req.params.userId,
    });
    if (!user) {
      throw new Error("User not found");
    }
    const restaurant = await Restaurant.findOne({ user: user._id });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    const orders = await Order.find({ restaurant: restaurant._id })
      .populate("restaurant")
      .populate("user");

    return res.json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wring." });
  }
}

async function updateOrderStatus(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const restaurant = await Restaurant.findById(order.restaurant);

    const user = await User.findOne({
      userId: req.params.userId,
    });
    if (!user) {
      throw new Error("User not found");
    }
    if (restaurant?.user?._id.toString() !== user._id.toString()) {
      return res.status(401).send();
    }

    order.status = status;
    await order.save();

    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unable to update order status" });
  }
}

export default {
  createMyRestaurant,
  getMyRestaurant,
  updateMyRestaurant,
  getMyRestaurantOrders,
  updateOrderStatus,
};
