import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import restaurantsRoute from "./routes/RestaurantsRoute";

mongoose.connect(process.env.DATABASE_URL!).then(() => {
  console.log("Connected to database");
});

const app = express();
app.use(express.json());
app.use(cors());

//* Health endpoint
app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "Health Ok!" });
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurants", restaurantsRoute);
app.listen(5000, () => {
  console.log("server started on localhost:5000");
});
