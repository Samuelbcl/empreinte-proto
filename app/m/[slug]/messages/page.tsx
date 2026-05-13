import { notFound } from "next/navigation";
import { getMemorial } from "@/lib/memorials";
import MessagesContent from "./_components/MessagesContent";

export default function MessagesPage({ params }: { params: { slug: string } }) {
  const m = getMemorial(params.slug);
  if (!m) notFound();
  return <MessagesContent memorial={m} />;
}
