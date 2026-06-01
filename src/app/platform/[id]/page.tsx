import { getPlatformById, getAllPlatforms } from "@/lib/platforms";
import { notFound } from "next/navigation";
import Link from "next/link";
import PlatformLogo from "@/components/PlatformLogo";
import ModelTag from "@/components/ModelTag";
import ProxyBadge from "@/components/ProxyBadge";

interface PlatformDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const platforms = getAllPlatforms();
  return platforms.map((platform) => ({
    id: platform.id,
  }));
}

export async function generateMetadata({ params }: PlatformDetailPageProps) {
  const { id } = await params;
  const platform = getPlatformById(id);
  if (!platform) return { title: "平台未找到" };
  return {
    title: `${platform.name} - AI API 平台导航`,
    description: platform.description,
  };
}

export default async function PlatformDetailPage({ params }: PlatformDetailPageProps) {
  const { id } = await params;
  const platform = getPlatformById(id);

  if (!platform) {
    notFound();
  }

  return (
    <main className="flex-1">
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          返回首页
        </Link>

        {/* Platform Detail Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-gray-50">
            <div className="flex items-start gap-4 md:gap-5">
              <PlatformLogo name={platform.name} size="lg" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {platform.name}
                  </h1>
                  <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-500 text-xs font-medium">
                    {platform.region}
                  </span>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <ProxyBadge supportsProxy={platform.supportsProxy} />
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Description */}
            <div>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                平台简介
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                {platform.description}
              </p>
            </div>

            {/* Supported Models */}
            <div>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                支持模型
              </h2>
              <div className="flex flex-wrap gap-2">
                {platform.models.map((model) => (
                  <ModelTag key={model} model={model} size="md" />
                ))}
              </div>
            </div>

            {/* Proxy Info */}
            <div>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                代理分销
              </h2>
              {platform.supportsProxy ? (
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-green-800 text-sm">支持代理分销</p>
                    <p className="text-green-700 text-sm mt-0.5">
                      该平台支持代理模式，您可以成为代理引入客户并获得分佣收益。
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600 text-sm">暂不支持代理分销</p>
                    <p className="text-gray-500 text-sm mt-0.5">
                      该平台目前不提供代理分销功能，仅支持直接使用API服务。
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-100">
            <a
              href={platform.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              访问官网
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
