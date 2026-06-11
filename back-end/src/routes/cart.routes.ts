import { Router } from "express";
import { getCart, addItem, removeItem, incrementItem, subtractItem } from "../controllers/cart.controller.ts";

const router = Router();

router.get("/", getCart);
router.post("/:id", addItem);
router.delete("/:id", removeItem);
router.patch("/:id/increment", incrementItem);
router.patch("/:id/subtract", subtractItem);

export default router;