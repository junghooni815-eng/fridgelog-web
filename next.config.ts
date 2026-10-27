import type { NextConfig } from "next";

const BLOG = "https://blog.granroot.com";

const nextConfig: NextConfig = {
  // 루트 도메인을 Vercel로 옮긴 뒤에도 예전 티스토리 주소가 끊기지 않도록 blog 서브도메인으로 보낸다.
  async redirects() {
    return [
      { source: "/entry/:path*", destination: `${BLOG}/entry/:path*`, permanent: true },
      { source: "/category/:path*", destination: `${BLOG}/category/:path*`, permanent: true },
      { source: "/tag/:path*", destination: `${BLOG}/tag/:path*`, permanent: true },
      { source: "/notice/:path*", destination: `${BLOG}/notice/:path*`, permanent: true },
      { source: "/guestbook", destination: `${BLOG}/guestbook`, permanent: true },
      { source: "/rss", destination: `${BLOG}/rss`, permanent: true },
      { source: "/:id(\\d+)", destination: `${BLOG}/:id`, permanent: true },
    ];
  },
};

export default nextConfig;
