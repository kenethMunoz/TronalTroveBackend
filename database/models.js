import mongoose from "mongoose";

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  palettesCreated: { type: Array },
  savedPalettes: { type: Array },
});

const paletteSchema = new Schema({
  name: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  colors: { type: Array, required: true },
  usersHaveSaved: { type: Array },
  tags: { type: Array },
});

export const users = mongoose.model("users", usersSchema);
export const palettes = mongoose.model("palettes", paletteSchema);
