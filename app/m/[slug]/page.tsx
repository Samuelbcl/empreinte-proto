import { notFound } from "next/navigation";
import { getMemorial } from "@/lib/memorials";
import HomeContent from "./_components/HomeContent";

export default function MemorialHomePage({ params }: { params: { slug: string } }) {
  const m = getMemorial(params.slug);
  if (!m) notFound();
  return <HomeContent memorial={m} slug={params.slug} />;
}
