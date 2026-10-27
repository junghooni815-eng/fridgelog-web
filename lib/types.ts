export type Storage = "냉장" | "냉동";
export type Caution = "low" | "mid" | "high";
export type Kind = "recipe" | "thaw" | "storage";

export interface Ingredient {
  slug: string;
  name: string;
  category: string;
  storage: Storage;
  caution: Caution;
  affiliate_tag: string | null;
}

export interface TitledText {
  title: string;
  body: string;
}

export interface ThawMethod {
  name: string;
  time: string;
  recommend: "권장" | "가능" | "비권장";
  body: string;
}

export interface RecipeBody {
  condition_intro?: string;
  condition_ok?: string[];
  condition_discard?: string[];
  condition_note?: string;
  ingredients_main?: string[];
  ingredients_sub?: string[];
  ingredients_note?: string;
  steps?: TitledText[];
  mistakes?: TitledText[];
  affiliate_line?: string;
}

export interface ThawBody {
  total_time?: string;
  condition_intro?: string;
  condition_frozen?: string[];
  condition_ok?: string[];
  condition_discard?: string[];
  condition_note?: string;
  methods?: ThawMethod[];
  quality_note?: string;
  affiliate_line?: string;
}

export interface StorageBody {
  storage_intro?: string;
  storage_method?: string;
  storage_steps?: string[];
  storage_limit?: string;
  affiliate_line?: string;
}

export interface Doc<B = RecipeBody | ThawBody | StorageBody> {
  slug: string;
  kind: Kind;
  title: string;
  ingredient_slug: string;
  summary: string | null;
  cook_time: number | null;
  difficulty: string | null;
  serving: number | null;
  is_raw: boolean | null;
  body: B;
  updated_at: string | null;
}

export type DocListItem = Pick<Doc, "slug" | "kind" | "title" | "ingredient_slug" | "summary" | "cook_time" | "difficulty" | "updated_at">;
