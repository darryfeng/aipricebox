import { ModelName } from "@/types/platform";

interface ModelTagProps {
  model: string;
  size?: "sm" | "md";
}

const modelColors: Record<string, string> = {
  GPT: "bg-emerald-100 text-emerald-700",
  Claude: "bg-amber-100 text-amber-700",
  Gemini: "bg-blue-100 text-blue-700",
  Deepseek: "bg-indigo-100 text-indigo-700",
  Qwen: "bg-purple-100 text-purple-700",
  文心一言: "bg-rose-100 text-rose-700",
  通义千问: "bg-cyan-100 text-cyan-700",
  百川: "bg-orange-100 text-orange-700",
  MiniMax: "bg-pink-100 text-pink-700",
  Kimi: "bg-teal-100 text-teal-700",
  智谱GLM: "bg-violet-100 text-violet-700",
  Llama: "bg-lime-100 text-lime-700",
  Mistral: "bg-sky-100 text-sky-700",
};

export default function ModelTag({ model, size = "sm" }: ModelTagProps) {
  const colorClass = modelColors[model] || "bg-gray-100 text-gray-600";
  const sizeClass = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm";

  return (
    <span
      className={`inline-block rounded-full font-medium ${colorClass} ${sizeClass}`}
    >
      {model}
    </span>
  );
}
