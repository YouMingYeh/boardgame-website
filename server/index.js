import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import findingsRoutes from "./routes/findings.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import activityRoutes from "./routes/activities.js";
import { register } from "./controllers/auth.js";
import { createActivity, patchActivity } from "./controllers/activity.js";
import { verifyToken } from "./middleware/auth.js";


/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(cors());
}
// define routes
app.get("/api", (req, res) => {
  // send the request back to the client
  res.set('Access-Control-Allow-Origin', '*');
  console.log("GET /api");
  res.send({ message: "Hello from the server!" }).status(200);
});

if (process.env.NODE_ENV === "production") {
  
  app.use(express.static(path.join(__dirname, "../client", "build")));
  
  
}

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/api/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/api/auth/register", upload.single("picture"), register);
app.post("/api/activities", verifyToken, upload.single("picture"), createActivity);

/* ROUTES */
app.use("/api/findings", findingsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/activities", activityRoutes);
app.patch("/api/activities/:id", verifyToken,upload.single("picture"),  patchActivity);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));

