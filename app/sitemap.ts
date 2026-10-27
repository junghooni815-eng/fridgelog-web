import type { MetadataRoute } from "next";
import { listPublishedDocs } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docs = await listPublishedDocs();
  const hubs = [...new Set(docs.map((d) => d.ingredient_slug))];
  return [
    { url: SITE_URL },
    ...hubs.map((s) => ({ url: `${SITE_URL}/i/${s}` })),
    ...docs
      .filter((d) => d.kind !== "storage")
      .map((d) => ({ url: `${SITE_URL}/r/${d.slug}`, lastModified: d.updated_at ?? undefined })),
  ];
}
