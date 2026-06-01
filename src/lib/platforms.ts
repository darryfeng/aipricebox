import platformsData from "@/data/platforms.json";
import { Platform } from "@/types/platform";

export function getAllPlatforms(): Platform[] {
  return platformsData as Platform[];
}

export function getPlatformById(id: string): Platform | undefined {
  return (platformsData as Platform[]).find((p) => p.id === id);
}
