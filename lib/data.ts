import type { Doc, DocListItem, Ingredient } from "./types";

// anon 키 + RLS로 published=true 문서만 보인다. 여기서도 published=eq.true를 붙여 이중으로 막는다.
const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_ANON_KEY;
const REVALIDATE = 3600;

export const hasDb = Boolean(URL && KEY);

async function get<T>(path: string): Promise<T> {
  if (!URL || !KEY) return [] as unknown as T;
  const res = await fetch(`${URL}/rest/v1/${path}`, {
    headers: { apikey: KEY },
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

const LIST_COLS = "slug,kind,title,ingredient_slug,summary,cook_time,difficulty,updated_at";

export function listIngredients() {
  return get<Ingredient[]>("ingredients?select=slug,name,category,storage,caution,affiliate_tag&order=name");
}

export async function getIngredient(slug: string) {
  const rows = await get<Ingredient[]>(
    `ingredients?select=slug,name,category,storage,caution,affiliate_tag&slug=eq.${encodeURIComponent(slug)}`,
  );
  return rows[0] ?? null;
}

export function listPublishedDocs() {
  return get<DocListItem[]>(`documents?select=${LIST_COLS}&published=eq.true&order=title`);
}

export function listDocsFor(ingredientSlug: string) {
  return get<DocListItem[]>(
    `documents?select=${LIST_COLS}&published=eq.true&ingredient_slug=eq.${encodeURIComponent(ingredientSlug)}&order=kind,cook_time`,
  );
}

export async function getDoc(slug: string) {
  const rows = await get<Doc[]>(`documents?select=*&published=eq.true&slug=eq.${encodeURIComponent(slug)}`);
  return rows[0] ?? null;
}

// 보관법은 재료당 하나. 레시피·해동 페이지 하단에 공통으로 붙는다.
export async function getStorageDoc(ingredientSlug: string) {
  const rows = await get<Doc[]>(
    `documents?select=*&published=eq.true&kind=eq.storage&ingredient_slug=eq.${encodeURIComponent(ingredientSlug)}`,
  );
  return rows[0] ?? null;
}
