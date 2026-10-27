export const SITE_URL = "https://granroot.com";
export const SITE_NAME = "FridgeLog";
export const TAGLINE = "냉동고 검은 봉지, 이제 기억하지 않아도 됩니다";

// 애드센스 게시자 ID(ca-pub-...). 비어 있으면 광고 스크립트와 ads.txt를 내보내지 않음.
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() || "";
