import { notFound } from "next/navigation";
import { getMemorial } from "@/lib/memorials";
import HistoryContent from "./_components/HistoryContent";

export default function HistoryPage({ params }: { params: { slug: string } }) {
  const m = getMemorial(params.slug);
  if (!m) notFound();
  return <HistoryContent memorial={m} />;
}
