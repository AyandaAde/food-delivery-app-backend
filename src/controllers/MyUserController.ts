import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(200).send();
    }

    const newUser = new User(req.body);
    await newUser.save();

    return res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating the user." });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, role, addressLine1, country, city } =
      req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.role = role;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();
    return res.send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error updating user" });
  }
};

const getCurrentUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const currentUser = await User.findOne({ userId });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export default {
  createCurrentUser,
  updateCurrentUser,
  getCurrentUser,
};
