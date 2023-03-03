import express from "express";
import { PORT } from "./config/config.js";
import { router as userRouter } from "./routes/UsersRoutes.js";
import { router as palettsRouter } from "./routes/PalettesRoutes.js";
import cors from "cors";
import { connectDB } from "./database/db.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/palettes", palettsRouter);
app.listen(PORT);

console.log(`server running on port ${4000}`);

connectDB();
