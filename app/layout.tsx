import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { SITE_NAME, SITE_URL, TAGLINE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} · ${TAGLINE}`, template: `%s · ${SITE_NAME}` },
  description: "냉장고·냉동고 재료의 상태 확인법, 남은 재료 레시피, 해동과 보관법.",
  openGraph: { siteName: SITE_NAME, locale: "ko_KR", type: "website" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <header className="site-header">
          <div className="wrap">
            <Link href="/" className="brand">{SITE_NAME}</Link>
          </div>
        </header>
        <main className="wrap">{children}</main>
        <footer className="site-footer">
          <div className="wrap">
            <p>상태 판단은 날짜가 아니라 눈과 코로 합니다. 애매하면 버리세요.</p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
