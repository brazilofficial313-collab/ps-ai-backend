// FILE: src/modules/ai/ai.routes.ts
import { Router } from "express";
import {
  testAI,
  chatAI,
  imageAI,
  embedAI,
  ttsAI
} from "./ai.controller";

const router = Router();

router.get("/test", testAI);
router.post("/chat", chatAI);
router.post("/image", imageAI);
router.post("/embed", embedAI);
router.post("/tts", ttsAI);

export default router;
