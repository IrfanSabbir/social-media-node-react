import { Router } from "express";
import {
  createMurmurs,
  getMurmurs,
  deleteMurmurs,
  likeOrDislikeMurmurs,
  getMurmursDetails
} from "../controller/murmurs";

const router = Router();

router.get("/", getMurmurs);
router.get("/details/:murmurId", getMurmursDetails);

router.post("/", createMurmurs);
router.post("/like/:murmurId", likeOrDislikeMurmurs);

router.delete("/:murmurId", deleteMurmurs);

export default router;
