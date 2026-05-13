import { notFound } from "next/navigation";
import { getMemorial } from "@/lib/memorials";
import GalleryContent from "./_components/GalleryContent";

export default function GalleryPage({ params }: { params: { slug: string } }) {
  const m = getMemorial(params.slug);
  if (!m) notFound();
  return <GalleryContent memorial={m} />;
}
