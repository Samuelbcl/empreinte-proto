import { jeanDupont, type Memorial } from "@/data/memorials/jean-dupont";

const memorials: Record<string, Memorial> = {
  "jean-dupont": jeanDupont,
};

export function getMemorial(slug: string): Memorial | null {
  return memorials[slug] ?? null;
}

export function listMemorialSlugs(): string[] {
  return Object.keys(memorials);
}
