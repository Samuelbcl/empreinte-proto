import { notFound } from "next/navigation";
import { getMemorial, listMemorialSlugs } from "@/lib/memorials";
import BottomNav from "@/components/BottomNav";

export function generateStaticParams() {
  return listMemorialSlugs().map((slug) => ({ slug }));
}

export default function MemorialLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const memorial = getMemorial(params.slug);
  if (!memorial) notFound();

  return (
    <div className="mx-auto max-w-mobile min-h-screen pb-24">
      {children}
      <BottomNav slug={params.slug} />
    </div>
  );
}
