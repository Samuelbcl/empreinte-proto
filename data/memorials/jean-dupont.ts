export type FamilyMember = {
  id: string;
  name: string;
  role?: string;
  birth?: number;
  death?: number;
  photo?: string;
  isDeceased?: boolean;
  parentId?: string;
};

export type TimelineEvent = {
  year: number;
  title: string;
  description?: string;
};

export type Message = {
  author: string;
  relation?: string;
  text: string;
  date: string;
};

export type Photo = {
  src: string;
  alt: string;
  caption?: string;
};

export type Memorial = {
  slug: string;
  name: string;
  firstName: string;
  lastName: string;
  born: number;
  died: number;
  epitaph: string;
  bio: string;
  candles: number;
  hero: { src: string; alt: string };
  cover: { src: string; alt: string };
  family: {
    parents: FamilyMember[];
    siblings: FamilyMember[];
    children: FamilyMember[];
    grandchildren: FamilyMember[];
  };
  timeline: TimelineEvent[];
  messages: Message[];
  photos: Photo[];
};

const J = (file: string) => `/images/jean-dupont/${file}`;

export const jeanDupont: Memorial = {
  slug: "jean-dupont",
  name: "Jean Dupont",
  firstName: "Jean",
  lastName: "Dupont",
  born: 1942,
  died: 2023,
  epitaph: "Le silence est la voix des grandes émotions.",
  bio: "Mari aimant, père dévoué, grand-père tendre. Passionné de photographie, d'horizons lointains et de simples moments partagés autour d'un café.",
  candles: 5,

  hero:  { src: J("portrait-2020.png"), alt: "Portrait de Jean Dupont, 2020" },
  cover: { src: J("cover.png"),         alt: "Photo de couverture" },

  family: {
    parents: [
      { id: "p1", name: "Pierre Dupont",  role: "Père", birth: 1915, death: 1989, photo: J("pere-pierre.png") },
      { id: "p2", name: "Marie Martin",   role: "Mère", birth: 1918, death: 1992, photo: J("mere-marie.png") },
    ],
    siblings: [
      { id: "s1", name: "Jean Dupont",     role: "—",     birth: 1942, death: 2023, photo: J("portrait-2020.png"), isDeceased: true },
      { id: "s2", name: "Claire Bernard",  role: "Sœur",  birth: 1945,              photo: J("soeur-claire.png") },
    ],
    children: [
      { id: "c1", name: "Marie",   role: "Fille", birth: 1968, photo: J("fille-marie.png") },
      { id: "c2", name: "Paul",    role: "Fils",  birth: 1971, photo: J("fils-paul.png") },
      { id: "c3", name: "Sophie",  role: "Fille", birth: 1975, photo: J("fille-sophie.png") },
    ],
    grandchildren: [
      { id: "g1", name: "Thomas", role: "Petit-fils",  birth: 1995, photo: J("petit-thomas.png"), parentId: "c1" },
      { id: "g2", name: "Léa",    role: "Petite-fille", birth: 1998, photo: J("petite-lea.png"),    parentId: "c2" },
      { id: "g3", name: "Julien", role: "Petit-fils",  birth: 2002, photo: J("petit-julien.png"),  parentId: "c2" },
      { id: "g4", name: "Emma",   role: "Petite-fille", birth: 2005, photo: J("petite-emma.png"),   parentId: "c3" },
    ],
  },

  timeline: [
    { year: 1942, title: "Naissance",                       description: "Né à Liège, dans une famille modeste et chaleureuse." },
    { year: 1965, title: "Mariage avec Françoise",          description: "Le début d'une histoire d'amour qui durera 58 ans." },
    { year: 1968, title: "Début de carrière",               description: "Premier poste d'ingénieur — le début d'une vocation." },
    { year: 1995, title: "Passion pour la photographie",    description: "Une seconde vie, à travers l'objectif." },
    { year: 2010, title: "Voyages et belles rencontres",    description: "Du Pérou au Japon, l'envie d'écrire le monde." },
    { year: 2023, title: "Nous a quittés",                  description: "Entouré des siens. Sa lumière reste." },
  ],

  messages: [
    {
      author: "Marie",
      relation: "Sa fille",
      text: "Tu vas tellement nous manquer Papa. Tes silences valaient plus que tous les discours. Merci pour tout ce que tu nous as appris, sans jamais le dire.",
      date: "12 octobre 2023",
    },
    {
      author: "Paul",
      relation: "Son fils",
      text: "Tu resteras toujours dans nos cœurs, dans chaque geste que j'apprends à mes enfants, dans chaque photo que je prends. Tu nous as tout donné.",
      date: "15 octobre 2023",
    },
    {
      author: "Sophie",
      relation: "Sa fille",
      text: "Repose en paix Papa. On t'aime infiniment. Tes petits-enfants parlent de toi tous les jours. Tu es là, partout, toujours.",
      date: "18 octobre 2023",
    },
    {
      author: "Henri",
      relation: "Son ami de toujours",
      text: "Soixante ans d'amitié, Jean. Tu vas me manquer mon vieux. On a partagé tellement de cafés, de rires, de silences justes. À bientôt.",
      date: "22 octobre 2023",
    },
  ],

  photos: [
    { src: J("galerie-01.png"), alt: "Mariage avec Françoise, 1965" },
    { src: J("galerie-02.png"), alt: "Premier enfant, 1968" },
    { src: J("galerie-03.png"), alt: "Famille rassemblée, années 80" },
    { src: J("galerie-04.png"), alt: "Photographe en activité, 1995" },
    { src: J("galerie-05.png"), alt: "Voyage au Pérou, 2010" },
    { src: J("galerie-06.png"), alt: "Concert avec Françoise" },
    { src: J("galerie-07.png"), alt: "Jardin d'automne" },
    { src: J("galerie-08.png"), alt: "Anniversaire 70 ans" },
    { src: J("galerie-09.png"), alt: "Café du matin, sa routine" },
  ],
};
