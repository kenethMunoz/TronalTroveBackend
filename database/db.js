import mongoose from "mongoose";
import { NAME_DATABASE, URL_DATABASE } from "../config/config.js";

export const connectDB = async () => {
  await mongoose.connect(URL_DATABASE + "/" + NAME_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to mongodb");
};

export default mongoose;
