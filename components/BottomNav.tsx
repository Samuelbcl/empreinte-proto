"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Clock, MessageCircle, Image as ImageIcon, type LucideIcon } from "lucide-react";
import clsx from "clsx";

type Tab = {
  label: string;
  icon: LucideIcon;
  build: (slug: string) => string;
  match: (pathname: string, slug: string) => boolean;
};

const tabs: Tab[] = [
  { label: "Accueil",  icon: Home,          build: (s) => `/m/${s}`,           match: (p, s) => p === `/m/${s}` },
  { label: "Famille",  icon: Users,         build: (s) => `/m/${s}/arbre`,     match: (p, s) => p.startsWith(`/m/${s}/arbre`) },
  { label: "Histoire", icon: Clock,         build: (s) => `/m/${s}/histoire`,  match: (p, s) => p.startsWith(`/m/${s}/histoire`) },
  { label: "Messages", icon: MessageCircle, build: (s) => `/m/${s}/messages`,  match: (p, s) => p.startsWith(`/m/${s}/messages`) },
  { label: "Galerie",  icon: ImageIcon,     build: (s) => `/m/${s}/galerie`,   match: (p, s) => p.startsWith(`/m/${s}/galerie`) },
];

export default function BottomNav({ slug }: { slug: string }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-mobile z-50 border-t border-sand-200/80 bg-sand-50/90 backdrop-blur-md"
    >
      <ul className="flex items-stretch justify-around px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = tab.match(pathname, slug);
          return (
            <li key={tab.label} className="flex-1">
              <Link
                href={tab.build(slug)}
                className={clsx(
                  "flex flex-col items-center gap-1 py-1.5 transition-colors",
                  active ? "text-gold-600" : "text-warm-500 hover:text-ink-800"
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={20} strokeWidth={active ? 2 : 1.5} />
                <span
                  className={clsx(
                    "text-[9.5px] tracking-wider2 uppercase",
                    active ? "font-medium" : "font-normal"
                  )}
                >
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
