import { ImageResponse } from "next/og";
import { SITE_NAME } from "./site";

export const OG_SIZE = { width: 1200, height: 630 };

// 기본 글꼴에는 한글이 없어서, 그림에 들어갈 글자만 담은 Noto Sans KR을 받아 쓴다.
async function loadKoreanFont(text: string) {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&text=${encodeURIComponent(text)}`)
    ).text();
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    if (!src) return null;
    return await (await fetch(src[1])).arrayBuffer();
  } catch {
    return null;
  }
}

export async function ogCard(title: string, sub: string) {
  const font = await loadKoreanFont(`${title}${sub}${SITE_NAME}`);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: "72px 80px", background: "#fbfaf7", color: "#1d1d1b", fontFamily: font ? "NotoKR" : undefined,
        }}
      >
        <div style={{ fontSize: 32, color: "#2f6f5e" }}>{SITE_NAME}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, lineHeight: 1.2 }}>{title}</div>
          {sub && <div style={{ fontSize: 36, color: "#6b6a66" }}>{sub}</div>}
        </div>
        <div style={{ height: 12, width: 160, background: "#2f6f5e", borderRadius: 6 }} />
      </div>
    ),
    { ...OG_SIZE, fonts: font ? [{ name: "NotoKR", data: font, weight: 700, style: "normal" }] : undefined },
  );
}
