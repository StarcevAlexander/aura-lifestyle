const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function createIcon() {
  const svgPath = path.join(__dirname, '..', 'public', 'favicon.svg');
  const outDir = path.join(__dirname, '..', 'assets');
  const outFile = path.join(outDir, 'icon.png');

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  await sharp(svgPath)
    .resize(1024, 1024)
    .png()
    .toFile(outFile);

  console.log('Icon saved to', outFile);
}

createIcon().catch(console.error);
