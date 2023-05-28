import express from "express";
import {
  getFeedActivities,
  getUserActivities,
  joinActivity,
  patchActivity,
} from "../controllers/activity.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:userId", verifyToken, getFeedActivities);
router.get("/:profileId/activities/:userId", verifyToken, getUserActivities);

/* UPDATE */
router.patch("/:id/join", verifyToken, joinActivity);

export default router;
