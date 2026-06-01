import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Price Box - 每一次模型调用，都值得精挑细选",
  description:
    "汇集全网API聚合平台，助力您全面评估选择。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/80">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center">
            <a href="/" className="flex items-center gap-2 font-bold text-gray-900 text-lg hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              AI Price Box
            </a>
          </div>
        </header>

        {children}

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 mt-auto">
          <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-400">
            AI Price Box · 数据仅供参考，请以各平台官网为准
          </div>
        </footer>
      </body>
    </html>
  );
}
