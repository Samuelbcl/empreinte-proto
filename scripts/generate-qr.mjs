import QRCode from "qrcode";
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_QR_DIR = join(__dirname, "..", "public", "qr");

const slug = process.argv[2] || "jean-dupont";
const url  = process.argv[3] || `https://empreinte-demo.vercel.app/m/${slug}`;

const opts = {
  errorCorrectionLevel: "H",
  margin: 2,
  color: { dark: "#1A1A2E", light: "#F5EFE6" },
};

await mkdir(PUBLIC_QR_DIR, { recursive: true });

const png = await QRCode.toBuffer(url, { ...opts, width: 1000 });
await writeFile(join(PUBLIC_QR_DIR, `${slug}.png`), png);

const svg = await QRCode.toString(url, { ...opts, type: "svg" });
await writeFile(join(PUBLIC_QR_DIR, `${slug}.svg`), svg);

console.log(`\n  ✓ QR généré pour : ${url}`);
console.log(`    → public/qr/${slug}.png  (1000×1000, niveau H)`);
console.log(`    → public/qr/${slug}.svg  (vectoriel)\n`);
