import { Router } from "express";
import {
  createPalettes,
  getPalettes,
  getOnePalette,
  updatePalettes,
  deletePalettes,
} from "../controllers/PalettesControles.js";

export const router = Router();

router.post("/create", createPalettes);
router.get("/getAll", getPalettes);
router.get("/getOne/:name", getOnePalette);
router.put("/update", updatePalettes);
router.delete("/delete", deletePalettes);
