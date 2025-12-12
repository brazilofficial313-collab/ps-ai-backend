// FILE: src/modules/ai/ai.controller.ts
import { Request, Response } from "express";
import openai from "../../utils/openai";

export const testAI = (req: Request, res: Response) => {
  res.json({ ok: true, message: "AI Module Working" });
};

export const chatAI = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ ok: false, error: "Missing prompt" });
    }

    const reply = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      ok: true,
      reply: reply.choices[0].message.content,
    });
  } catch (error: any) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const imageAI = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ ok: false, error: "Missing prompt" });

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    res.json({ ok: true, image: result.data[0].url });
  } catch (error: any) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const embedAI = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ ok: false, error: "Missing text" });

    const embed = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    res.json({ ok: true, embedding: embed.data[0].embedding });
  } catch (error: any) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const ttsAI = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    const audio = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "alloy",
      input: text,
    });

    res.json({ ok: true, audio: audio.url });
  } catch (error: any) {
    res.status(500).json({ ok: false, error: error.message });
  }
};
