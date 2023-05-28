import express from "express";
import {
  getUser,
  getUserFriends,
  getUserInvitations,
  addRemoveFriend,
  updateUser,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/:id/invitations", verifyToken, getUserInvitations);
/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.patch("/:id", verifyToken, updateUser);

export default router;
