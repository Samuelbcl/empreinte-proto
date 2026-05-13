"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Heart } from "lucide-react";
import OliveDivider from "@/components/OliveDivider";
import InitialAvatar from "@/components/InitialAvatar";
import type { FamilyMember, Memorial } from "@/data/memorials/jean-dupont";

const ease = [0.22, 0.61, 0.36, 1] as const;

function FamilyCard({ member, size = 52 }: { member: FamilyMember; size?: number }) {
  const hasRealPhoto = !!member.photo && !member.photo.endsWith("placeholder.svg");
  return (
    <div className="flex flex-col items-center gap-1 min-w-0">
      <div
        className={clsx(
          "relative rounded-full overflow-hidden shadow-soft shrink-0",
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
          member.isDeceased ? "text-[13px] text-gold-700 font-medium" : "text-[11px] text-ink-900"
        )}
      >
        {member.name.split(" ")[0]}
      </p>
      {member.isDeceased && (
        <p className="text-[9px] tracking-wider uppercase text-gold-700/80 italic -mt-0.5">
          En mémoire
        </p>
      )}
    </div>
  );
}

/** Vertical line, centered horizontally by the parent flex */
function VLine({ h = 18 }: { h?: number }) {
  return <div className="mx-auto tree-line" style={{ width: 1, height: h }} aria-hidden />;
}

/**
 * T-split connector. Vertical descends from the top center, then a horizontal bar
 * spans `width%`, with descending verticals at left/right (and optionally middle).
 */
function TSplit({
  width = 60,
  middleStop = false,
  vTop = 14,
  vBottom = 14,
}: {
  width?: number;
  middleStop?: boolean;
  vTop?: number;
  vBottom?: number;
}) {
  const inset = (100 - width) / 2;
  return (
    <div className="relative w-full" style={{ height: vTop + vBottom + 1 }} aria-hidden>
      <div
        className="absolute top-0 left-1/2 tree-line"
        style={{ width: 1, height: vTop, transform: "translateX(-0.5px)" }}
      />
      <div
        className="absolute tree-line"
        style={{ height: 1, top: vTop, left: `${inset}%`, right: `${inset}%` }}
      />
      <div
        className="absolute tree-line"
        style={{ width: 1, height: vBottom, top: vTop, left: `${inset}%`, transform: "translateX(-0.5px)" }}
      />
      <div
        className="absolute tree-line"
        style={{ width: 1, height: vBottom, top: vTop, right: `${inset}%`, transform: "translateX(0.5px)" }}
      />
      {middleStop && (
        <div
          className="absolute tree-line"
          style={{ width: 1, height: vBottom, top: vTop, left: "50%", transform: "translateX(-0.5px)" }}
        />
      )}
    </div>
  );
}

/** Sub-tree column: a child + their grandchildren below, with proper connectors */
function ChildSubtree({
  child,
  grandchildren,
}: {
  child: FamilyMember;
  grandchildren: FamilyMember[];
}) {
  return (
    <div className="flex flex-col items-center gap-0">
      <FamilyCard member={child} size={48} />
      {grandchildren.length === 0 && null}
      {grandchildren.length === 1 && (
        <>
          <VLine h={18} />
          <FamilyCard member={grandchildren[0]} size={40} />
        </>
      )}
      {grandchildren.length >= 2 && (
        <>
          <TSplit width={70} vTop={10} vBottom={10} />
          <div className="flex gap-2 justify-center -mt-px">
            {grandchildren.map((g) => (
              <FamilyCard key={g.id} member={g} size={40} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function FamilyTreeContent({ memorial: m }: { memorial: Memorial }) {
  const { parents, siblings, children, grandchildren } = m.family;
  const jean = siblings.find((s) => s.isDeceased) ?? siblings[0];
  const others = siblings.filter((s) => !s.isDeceased);

  const grandchildrenByChild = children.map((c) => ({
    child: c,
    gc: grandchildren.filter((g) => g.parentId === c.id),
  }));

  return (
    <main className="px-3 pt-8 pb-6">
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="text-center mb-7"
      >
        <p className="text-[10px] tracking-wider2 uppercase text-gold-700/80">
          Arbre généalogique
        </p>
        <h1 className="mt-2 text-3xl">Notre famille</h1>
        <OliveDivider className="mt-3" />
      </motion.header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease }}
        className="space-y-0"
      >
        {/* Génération 1 : parents (couple) */}
        <div className="flex justify-center items-end gap-2.5">
          <FamilyCard member={parents[0]} size={52} />
          <Heart className="text-gold-500/70 mb-6 shrink-0" size={14} strokeWidth={1.5} fill="currentColor" />
          <FamilyCard member={parents[1]} size={52} />
        </div>

        {/* Connecteur 1 → 2 : T-split vers Jean (gauche) et Claire (droite) */}
        <TSplit width={50} vTop={16} vBottom={14} />

        {/* Génération 2 : Jean + sa fratrie */}
        <div className="grid grid-cols-2 max-w-[280px] mx-auto -mt-1">
          <div className="flex justify-center">
            <FamilyCard member={jean} size={74} />
          </div>
          <div className="flex justify-center pt-3">
            {others[0] && <FamilyCard member={others[0]} size={52} />}
          </div>
        </div>

        {/* Connecteur 2 → 3 : descend de Jean (colonne gauche, ~25%) puis hooke vers centre puis split */}
        <div className="relative w-full" style={{ height: 36 }} aria-hidden>
          {/* descend depuis sous Jean (colonne gauche du grid centré, ~25% du parent) */}
          <div
            className="absolute tree-line"
            style={{
              width: 1,
              height: 12,
              top: 0,
              left: "25%",
              transform: "translateX(-0.5px)",
            }}
          />
          {/* hook horizontal vers le centre */}
          <div
            className="absolute tree-line"
            style={{
              height: 1,
              top: 12,
              left: "25%",
              right: "50%",
            }}
          />
          {/* descend depuis le centre vers la barre horizontale finale */}
          <div
            className="absolute tree-line"
            style={{
              width: 1,
              height: 10,
              top: 12,
              left: "50%",
              transform: "translateX(-0.5px)",
            }}
          />
          {/* barre horizontale couvrant les 3 enfants */}
          <div
            className="absolute tree-line"
            style={{
              height: 1,
              top: 22,
              left: "16%",
              right: "16%",
            }}
          />
          {/* trois verticales vers chaque enfant */}
          <div
            className="absolute tree-line"
            style={{ width: 1, height: 12, top: 22, left: "16%", transform: "translateX(-0.5px)" }}
          />
          <div
            className="absolute tree-line"
            style={{ width: 1, height: 12, top: 22, left: "50%", transform: "translateX(-0.5px)" }}
          />
          <div
            className="absolute tree-line"
            style={{ width: 1, height: 12, top: 22, right: "16%", transform: "translateX(0.5px)" }}
          />
        </div>

        {/* Génération 3 + 4 : enfants avec leur sous-arbre de petits-enfants */}
        <div className="grid grid-cols-3 gap-1 mt-1">
          {grandchildrenByChild.map(({ child, gc }) => (
            <ChildSubtree key={child.id} child={child} grandchildren={gc} />
          ))}
        </div>
      </motion.div>

      {/* Légende */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6, ease }}
        className="text-center text-[10px] text-warm-400 italic mt-8"
      >
        Quatre générations rassemblées autour de sa mémoire
      </motion.p>
    </main>
  );
}
