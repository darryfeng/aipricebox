export interface Platform {
  id: string;
  name: string;
  description: string;
  models: string[];
  supportsProxy: boolean;
  website: string;
  region: "国内" | "国外";
  hot: boolean;
}

export const ALL_MODELS = [
  "GPT",
  "Claude",
  "Gemini",
  "Deepseek",
  "Qwen",
  "文心一言",
  "通义千问",
  "百川",
  "MiniMax",
  "Kimi",
  "智谱GLM",
  "Llama",
  "Mistral",
] as const;

export type ModelName = (typeof ALL_MODELS)[number];
