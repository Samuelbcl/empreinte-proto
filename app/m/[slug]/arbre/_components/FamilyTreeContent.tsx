"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";
import OliveDivider from "@/components/OliveDivider";
import InitialAvatar from "@/components/InitialAvatar";
import type { FamilyMember, Memorial } from "@/data/memorials/jean-dupont";

const ease = [0.22, 0.61, 0.36, 1] as const;

function FamilyCard({ member, size = 56 }: { member: FamilyMember; size?: number }) {
  const hasRealPhoto = !!member.photo && !member.photo.endsWith("placeholder.svg");

  return (
    <div className="flex flex-col items-center gap-1.5 min-w-0 max-w-[80px]">
      <div
        className={clsx(
          "relative rounded-full overflow-hidden shadow-soft",
          member.isDeceased ? "ring-2 ring-gold-500 gold-glow" : "ring-1 ring-sand-300"
        )}
        style={{ width: size, height: size }}
      >
        {hasRealPhoto ? (
          <Image
            src={member.photo!}
            alt={member.name}
            fill
            sizes={`${size}px`}
            className="object-cover"
          />
        ) : (
          <InitialAvatar name={member.name} size={size} />
        )}
      </div>
      <p
        className={clsx(
          "font-serif text-center leading-tight",
          member.isDeceased ? "text-sm text-gold-700" : "text-[13px] text-ink-900"
        )}
      >
        {member.name}
      </p>
      {member.role && member.role !== "—" && (
        <p className="text-[9.5px] tracking-wider uppercase text-warm-500 text-center">
          {member.role}
        </p>
      )}
      {member.isDeceased && (
        <p className="text-[9.5px] tracking-wider uppercase text-gold-700/90 italic">
          En mémoire
        </p>
      )}
    </div>
  );
}

function Row({
  label,
  children,
  delay = 0,
}: {
  label: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease }}
    >
      <p className="text-[10px] tracking-wider2 uppercase text-gold-700/80 text-center mb-3.5">
        {label}
      </p>
      <div className="flex justify-center gap-4 flex-wrap items-start">{children}</div>
    </motion.div>
  );
}

export default function FamilyTreeContent({ memorial: m }: { memorial: Memorial }) {
  return (
    <main className="px-5 pt-8 pb-6">
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="text-center mb-8"
      >
        <p className="text-[10px] tracking-wider2 uppercase text-gold-700/80">
          Arbre généalogique
        </p>
        <h1 className="mt-2 text-3xl">Notre famille</h1>
        <OliveDivider className="mt-3" />
      </motion.header>

      <div className="space-y-9">
        <Row label="Ses parents" delay={0.05}>
          {m.family.parents.map((p) => (
            <FamilyCard key={p.id} member={p} size={56} />
          ))}
        </Row>

        {/* connector */}
        <div aria-hidden className="mx-auto w-px h-4 bg-gold-500/40" />

        <Row label="Sa génération" delay={0.15}>
          {m.family.siblings.map((s) => (
            <FamilyCard key={s.id} member={s} size={s.isDeceased ? 80 : 56} />
          ))}
        </Row>

        <div aria-hidden className="mx-auto w-px h-4 bg-gold-500/40" />

        <Row label="Ses enfants" delay={0.25}>
          {m.family.children.map((c) => (
            <FamilyCard key={c.id} member={c} size={56} />
          ))}
        </Row>

        <div aria-hidden className="mx-auto w-px h-4 bg-gold-500/40" />

        <Row label="Ses petits-enfants" delay={0.35}>
          {m.family.grandchildren.map((g) => (
            <FamilyCard key={g.id} member={g} size={48} />
          ))}
        </Row>
      </div>
    </main>
  );
}
