import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdir } from 'node:fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC = join(__dirname, '../assets/images/facemassagemain.jpg')
const OUT_DIR = join(__dirname, '../public/assets/images')

await mkdir(OUT_DIR, { recursive: true })

const metadata = await sharp(SRC).metadata()
console.log(`Source: ${metadata.width}×${metadata.height}, format=${metadata.format}`)

await sharp(SRC).webp({ quality: 75, effort: 6 }).toFile(join(OUT_DIR, 'facemassagemain.webp'))
await sharp(SRC).avif({ quality: 50, effort: 6 }).toFile(join(OUT_DIR, 'facemassagemain.avif'))
await sharp(SRC).jpeg({ quality: 82, mozjpeg: true }).toFile(join(OUT_DIR, 'facemassagemain.jpg'))

console.log('Wrote facemassagemain.{avif,webp,jpg} to', OUT_DIR)
