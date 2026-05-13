import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { ArrowUpRight } from "lucide-react";
import { getMemorial } from "@/lib/memorials";
import OliveDivider from "@/components/OliveDivider";

export default function QRPreviewPage({ params }: { params: { slug: string } }) {
  const m = getMemorial(params.slug);
  if (!m) notFound();

  const qrPath = `/qr/${params.slug}.png`;
  const exists = existsSync(join(process.cwd(), "public", "qr", `${params.slug}.png`));

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center max-w-mobile mx-auto">
      <p className="text-[10px] tracking-wider2 uppercase text-gold-700/80 mb-1">
        QR code de démonstration
      </p>
      <h1 className="text-3xl">{m.name}</h1>
      <p className="text-sm text-warm-500 mt-1">{m.born} — {m.died}</p>
      <OliveDivider className="my-5" />

      {exists ? (
        <div className="relative w-72 h-72 mb-4 bg-sand-50 rounded-xl shadow-soft p-3">
          <Image
            src={qrPath}
            alt={`QR code vers ${m.name}`}
            fill
            sizes="288px"
            className="object-contain p-3"
            priority
            unoptimized
          />
        </div>
      ) : (
        <div className="w-72 h-72 mb-4 flex items-center justify-center bg-sand-200/60 rounded-xl border border-dashed border-warm-400">
          <p className="text-warm-500 text-sm px-6">
            Aucun QR généré.<br />
            Lance{" "}
            <code className="bg-sand-50 px-1.5 py-0.5 rounded text-ink-900 text-xs font-mono">
              npm run qr
            </code>
          </p>
        </div>
      )}

      <p className="text-sm text-warm-600 max-w-xs leading-relaxed">
        Scannez ce code avec votre téléphone pour ouvrir la page mémorial.
      </p>

      <Link
        href={`/m/${params.slug}`}
        className="mt-6 inline-flex items-center gap-1.5 text-sm text-gold-700 hover:text-gold-800 transition-colors"
      >
        Ouvrir directement
        <ArrowUpRight size={14} />
      </Link>
    </main>
  );
}
