import { Router } from "express";
const router = Router();

router.get("/test", (req, res) => {
  res.json({ ok: true, message: "AI endpoint working" });
});

export default router;
