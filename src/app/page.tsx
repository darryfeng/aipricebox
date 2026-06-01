import { getAllPlatforms } from "@/lib/platforms";
import PlatformList from "@/components/PlatformList";

export default function Home() {
  const platforms = getAllPlatforms();

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-500 pointer-events-auto">
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-cyan-300/20 blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-6 md:py-10">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="hero-title-shimmer text-[5vw] md:text-[2.5vw] lg:text-4xl font-bold tracking-tight mb-2 whitespace-nowrap">
              每一次模型调用，都值得精挑细选
            </h1>
            <p className="text-blue-100/80 text-xs md:text-sm">
              汇集全网API聚合平台，助力您全面评估选择
            </p>
          </div>
        </div>
      </section>

      {/* Platform List */}
      <section className="max-w-6xl mx-auto px-4 py-4 md:py-6">
        <PlatformList platforms={platforms} />
      </section>
    </main>
  );
}
