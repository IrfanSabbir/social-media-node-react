import { Router } from "express";
import {
  createMurmurs,
  getMurmurs,
  deleteMurmurs,
  likeOrDislikeMurmurs,
} from "../controller/murmurs";

const router = Router();

router.get("/", getMurmurs);
router.post("/", createMurmurs);
router.post("/like/:murmurId", likeOrDislikeMurmurs);
router.delete("/:murmurId", deleteMurmurs);

export default router;
