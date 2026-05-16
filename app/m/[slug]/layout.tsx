import { notFound } from "next/navigation";
import { getMemorial, listMemorialSlugs } from "@/lib/memorials";
import BottomNav from "@/components/BottomNav";
import MusicPlayer from "@/components/MusicPlayer";

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
    <div className="relative mx-auto max-w-mobile h-[100dvh] overflow-y-auto overscroll-contain scrollbar-hide">
      <div className="pb-24">{children}</div>
      <BottomNav slug={params.slug} />
      <MusicPlayer src="/audio/ambient.mp3" volume={0.4} />
    </div>
  );
}
