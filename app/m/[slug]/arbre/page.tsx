import { notFound } from "next/navigation";
import { getMemorial } from "@/lib/memorials";
import FamilyTreeContent from "./_components/FamilyTreeContent";

export default function FamilyTreePage({ params }: { params: { slug: string } }) {
  const m = getMemorial(params.slug);
  if (!m) notFound();
  return <FamilyTreeContent memorial={m} />;
}
