import { Router } from "express";
import {
  createPalettes,
  getPalettes,
  getOnePalette,
  updatePalettes,
  deletePalettes,
  getPalettesByUsers,
  getSavedPalettes,
  getTotalPalettes,
  searchPalette,
} from "../controllers/PalettesControles.js";

export const router = Router();

router.post("/create", createPalettes);
router.post("/getAll", getPalettes);
router.get("/getOne/:name", getOnePalette);
router.post("/getByUser", getPalettesByUsers);
router.get("/totalPalettes", getTotalPalettes);
router.post("/getSavedPalettes", getSavedPalettes);
router.put("/update", updatePalettes);
router.delete("/delete", deletePalettes);
router.post("/search", searchPalette);
