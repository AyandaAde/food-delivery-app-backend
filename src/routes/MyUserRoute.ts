import express from "express";
import MyUserController from "../controllers/MyUserController";
import { validateMyUserRequest } from "../middleware/validation";
const router = express.Router();

router.post("/", MyUserController.createCurrentUser);
router.put("/", validateMyUserRequest, MyUserController.updateCurrentUser);
router.get("/:id", MyUserController.getCurrentUser);

export default router;
