import { NextApiRequest, NextApiResponse } from "next";
import openai from "@/lib/chatgpt";

export default async function handler(req, res) {
  const models = await openai.listModels().then((res) => res.data.data);

  const modelOptions = models.map((model) => ({ value: model.id, label: model.id }));

  res.status(200).json({
    modelOptions,
  });
}
