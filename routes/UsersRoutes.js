import { Router } from "express";
import {
  createUsers,
  getUsers,
  updateUsers,
  deleteUsers,
  getPublicUser,
} from "../controllers/UsersControllers.js";

export const router = Router();

router.get("/getOne/:userName", getPublicUser);
router.get("/getAll", getUsers);
router.post("/create", createUsers);
router.put("/update", updateUsers);
router.delete("/delete", deleteUsers);
