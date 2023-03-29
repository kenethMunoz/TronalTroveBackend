import { Router } from "express";
import {
  createUsers,
  getUsers,
  updateUsers,
  deleteUsers,
  getPublicUser,
  logInUser,
  savePalettes,
  unsavePalettes,
} from "../controllers/UsersControllers.js";

export const router = Router();

router.get("/getOne/:userName", getPublicUser);
router.get("/getAll", getUsers);
router.post("/login", logInUser);
router.post("/create", createUsers);
router.post("/savePalette", savePalettes);
router.post("/unsavePalette", unsavePalettes);
router.put("/update", updateUsers);
router.delete("/delete", deleteUsers);
