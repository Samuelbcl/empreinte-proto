# Prompts photo IA — Jean Dupont

**22 prompts complets, prêts à copier-coller.** Aucun master prompt à assembler — chaque prompt est autonome.

## Workflow

1. **Génère la photo n°1 (`portrait-2020.jpg`) EN PREMIER.** C'est ta référence visage.
2. **Uploade-la dans Midjourney** (drag&drop sur le chat) → clique sur l'image → copie son URL d'image (clic droit "Copy image link").
3. **Colle cette URL à la place de `[URL_REF]`** dans tous les prompts suivants. C'est le seul élément à remplacer.
4. **Place les fichiers générés** dans `empreinte-prototype/public/images/jean-dupont/` avec exactement les noms indiqués.
5. Quand tu as fini, dis-le-moi → je remplace les `PLACEHOLDER` dans le code en une passe.

## Format de sortie

| Type | Aspect | Dimensions | Format |
|---|---|---|---|
| Portraits + famille | 1:1 carré | 1024×1024 min (1200+ idéal) | JPG ~85% |
| Cover (paysage) | 16:9 paysage | 1920×1080 | JPG ~85% |
| Galerie | 1:1 carré | 1024×1024 | JPG ~85% |

## Alternatives à Midjourney

- **Adobe Firefly** : utilise "Reference Image" pour uploader `portrait-2020.jpg` au lieu de `--cref`. Ignore les autres params (`--cw`, `--ar` se règle dans l'UI). Licence commerciale propre.
- **Sora Image (OpenAI)** : mode image-to-image, uploade `portrait-2020.jpg` comme référence.
- **DALL-E** : gère mal la cohérence de personnage, à éviter pour les variations d'âge.

---

# JEAN DUPONT — 12 photos

## 1. `portrait-2020.jpg` — Portrait principal (à générer EN PREMIER)

> 78 ans, 2020. **Référence maître** pour tous les autres prompts.

```
Portrait of a Belgian man, 78 years old, full white hair, neatly trimmed white beard, european caucasian features, kind weathered face, warm hazel eyes, soft gentle smile, slight wrinkles. Wearing a soft beige wool sweater, sitting near a window, golden hour light, looking softly off-camera, peaceful and dignified. Professional photography, natural soft window light, shallow depth of field, warm muted tones, film grain, 35mm lens, photorealistic, centered headshot. --ar 1:1 --v 7
```

> 📌 Avant de passer aux suivants : uploade cette image dans Midjourney et récupère son URL pour `[URL_REF]`.

---

## 2. `cover.jpg` — Photo de couverture Accueil

> Paysage atmosphérique, pas de personne. Sert de bannière en haut de la page d'accueil.

```
A peaceful autumn landscape at sunrise, soft sunlight filtering through trees, warm beige and gold tones, blurred background, no people, atmosphere of memory and serenity, cinematic, photorealistic, shallow depth of field. --ar 16:9 --v 7
```

---

## 3. `galerie-01.jpg` — Mariage 1965 (23 ans)

```
A 23-year-old Belgian man on his wedding day in 1965, formal black suit, white shirt, dark tie, slight gentle smile, standing next to a young woman his age in a simple white wedding dress, both holding hands tenderly. Black-and-white photograph slightly toned with warm sepia, soft grain, 60s vintage wedding aesthetic, archive photo, soft natural light. --cref [URL_REF] --cw 40 --ar 1:1 --v 7
```

---

## 4. `galerie-02.jpg` — Premier enfant 1968 (26 ans)

```
A 26-year-old Belgian man in 1968, holding a newborn baby gently in his arms in a hospital room, tender expression, slight smile, dark brown hair, clean-shaven, wearing a simple shirt. Warm vintage color photograph, slightly faded, soft film grain, 60s aesthetic, candid intimate moment. --cref [URL_REF] --cw 50 --ar 1:1 --v 7
```

---

## 5. `galerie-03.jpg` — Famille rassemblée années 80 (~40 ans)

```
A 40-year-old Belgian man in 1985, sitting on a vintage couch with three children (a 12-year-old girl, a 9-year-old boy, a 5-year-old girl), warm interior lighting, brown hair starting to grey at temples, casual sweater, gentle smile, candid family photo. Vintage color photograph, slight grain, 80s aesthetic, warm tones. --cref [URL_REF] --cw 60 --ar 1:1 --v 7
```

---

## 6. `galerie-04.jpg` — Photographe en activité 1995 (53 ans)

```
A 53-year-old Belgian man in 1995, holding an old film camera up to his eye, focused expression, salt-and-pepper hair, light beard, wearing a beige jacket, standing on a Belgian cobblestone street, candid moment, warm late-afternoon light, photorealistic, 90s photography aesthetic, slight grain. --cref [URL_REF] --cw 60 --ar 1:1 --v 7
```

---

## 7. `galerie-05.jpg` — Voyage Pérou 2010 (68 ans)

```
A 68-year-old Belgian man traveling in Peru in 2010, mostly grey hair, neatly trimmed grey beard, standing in front of an Andean mountain landscape, camera bag over his shoulder, contemplative smile, soft natural light, authentic travel photo, warm earth tones, photorealistic. --cref [URL_REF] --cw 70 --ar 1:1 --v 7
```

---

## 8. `galerie-06.jpg` — Concert avec Françoise (~70 ans)

```
A 70-year-old Belgian man sitting next to an elderly woman his age (short white hair, kind warm face) at an outdoor summer concert, both smiling gently and softly, holding hands, candid tender moment, warm evening light, blurred crowd in background, photorealistic. --cref [URL_REF] --cw 70 --ar 1:1 --v 7
```

---

## 9. `galerie-07.jpg` — Jardin d'automne (~75 ans)

```
A 75-year-old Belgian man gardening in autumn, white hair, white beard, wearing a brown corduroy jacket and gardening gloves, surrounded by golden and orange fallen leaves, peaceful focused moment, soft warm afternoon light, photorealistic, natural depth of field. --cref [URL_REF] --cw 80 --ar 1:1 --v 7
```

---

## 10. `galerie-08.jpg` — Anniversaire 70 ans

```
A 70-year-old Belgian man blowing candles on a birthday cake, white-grey hair, joyful tender expression, surrounded by family members slightly out of focus, warm interior lighting, candle glow on his face, vintage warm color photograph, photorealistic, intimate family moment. --cref [URL_REF] --cw 70 --ar 1:1 --v 7
```

---

## 11. `galerie-09.jpg` — Café du matin (~78 ans)

```
A 78-year-old Belgian man sitting alone at a wooden kitchen table, both hands wrapped around a steaming white coffee cup, looking pensively out a window, soft morning light streaming through, white hair, white beard, beige sweater, quiet contemplative moment, photorealistic, warm muted tones, shallow depth of field. --cref [URL_REF] --cw 80 --ar 1:1 --v 7
```

---

## 12. `galerie-10.jpg` — Portrait final 2023 (81 ans)

```
An 81-year-old Belgian man, soft portrait sitting in a wooden garden chair, white hair, white beard, peaceful warm smile, late afternoon golden light filtering through trees, wearing a soft cardigan, slightly more frail but luminous, photorealistic, warm tones, shallow depth of field, similar style to the 2020 portrait. --cref [URL_REF] --cw 90 --ar 1:1 --v 7
```

---

# FAMILLE — 10 photos

## 13. `pere-pierre.jpg` — Pierre Dupont (père de Jean)

```
Black-and-white archival portrait of an elderly Belgian man, born 1915, serious dignified expression, formal dark suit and tie, short grey hair, slight moustache, 1970s photo style, slight warm sepia tone, soft film grain, studio portrait. --ar 1:1 --v 7
```

---

## 14. `mere-marie.jpg` — Marie Martin (mère de Jean)

```
Black-and-white archival portrait of an elderly Belgian woman, born 1918, warm kind expression, soft smile, grey hair pulled back, simple dark dress with a brooch, 1970s photo style, slight warm sepia tone, studio portrait, gentle. --ar 1:1 --v 7
```

---

## 15. `soeur-claire.jpg` — Claire Bernard (sœur de Jean)

```
Portrait of a 78-year-old Belgian woman, short grey-white hair, kind warm smile, gentle eyes, wearing a soft mauve cashmere sweater, natural soft window light, photorealistic, similar family features to her elder brother. --cref [URL_REF] --cw 25 --ar 1:1 --v 7
```

---

## 16. `fille-marie.jpg` — Marie (fille de Jean, 1968)

```
Portrait of a 55-year-old Belgian woman, shoulder-length brown hair with some grey, gentle warm smile, hazel eyes, wearing an elegant beige blouse, soft natural light, photorealistic headshot, warm tones, professional but candid. --ar 1:1 --v 7
```

---

## 17. `fils-paul.jpg` — Paul (fils de Jean, 1971)

```
Portrait of a 52-year-old Belgian man, salt-and-pepper hair, trimmed beard, kind expression with a slight smile, wearing a casual dark blue shirt, soft natural light, photorealistic headshot, warm tones. --ar 1:1 --v 7
```

---

## 18. `fille-sophie.jpg` — Sophie (fille de Jean, 1975)

```
Portrait of a 48-year-old Belgian woman, blonde-brown hair, warm sincere smile, soft features, wearing an elegant cream-colored top, soft natural light, photorealistic headshot, warm muted tones. --ar 1:1 --v 7
```

---

## 19. `petit-thomas.jpg` — Thomas (petit-fils, 28 ans)

```
Portrait of a 28-year-old Belgian man, short brown hair, light trimmed beard, friendly confident smile, wearing a casual grey sweater, soft natural light, photorealistic headshot, warm modern tones. --ar 1:1 --v 7
```

---

## 20. `petite-lea.jpg` — Léa (petite-fille, 25 ans)

```
Portrait of a 25-year-old Belgian woman, long straight brown hair, natural warm smile, soft features, wearing a casual cream blouse, soft natural light, photorealistic headshot, warm contemporary tones. --ar 1:1 --v 7
```

---

## 21. `petit-julien.jpg` — Julien (petit-fils, 22 ans)

```
Portrait of a 22-year-old Belgian man, curly dark brown hair, big warm smile showing teeth, light stubble, wearing a casual olive green t-shirt, soft natural light, photorealistic headshot, warm modern tones. --ar 1:1 --v 7
```

---

## 22. `petite-emma.jpg` — Emma (petite-fille, 19 ans)

```
Portrait of a 19-year-old Belgian woman, long wavy blonde hair, bright fresh smile, light freckles, wearing a soft white t-shirt, soft natural daylight, photorealistic headshot, warm clean tones. --ar 1:1 --v 7
```

---

## Ajustements si Midjourney refuse de varier

- **Trop ressemblant entre époques** → baisse `--cw` (essaie 30 ou 25)
- **Pas assez ressemblant** → monte `--cw` (essaie 80 ou 100)
- **Tu veux une variation d'attitude/contexte plus libre** → baisse `--cw`
- **Tu veux verrouiller le visage** → monte `--cw`

## Licence commerciale

- **Adobe Firefly** : OK proto + commercial
- **Midjourney** : OK avec plan payant Standard+
- **OpenAI Sora / DALL-E** : OK comptes payants

Pour la v2 commerciale avec de vraies familles, les photos seront **fournies par les familles** — l'IA n'est nécessaire que pour ce proto de démonstration.
