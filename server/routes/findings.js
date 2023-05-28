import express from "express";
import { getFindings } from "../controllers/findings.js";

const router = express.Router();

/* READ */
router.post("/", getFindings);

export default router;