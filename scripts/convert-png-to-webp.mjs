#!/usr/bin/env node

/*
 * Recursively convert PNG files to WebP without deleting the originals.
 *
 * By default, files under portraits-src are written beside their sources:
 *   portraits-src/zeus-full.png  -> portraits-src/zeus-full.webp
 *   portraits-src/aether.png.png -> portraits-src/aether.webp
 *
 * Usage:
 *   npm run images:webp
 *   npm run images:webp -- --dry-run
 *   npm run images:webp -- --input uploads --output converted-webp
 *   npm run images:webp -- --quality 86 --concurrency 6 --force
 */

import sharp from 'sharp'
import {
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
} from 'node:fs'
import { dirname, extname, join, relative, resolve } from 'node:path'

const DEFAULT_INPUT = 'portraits-src'
const DEFAULT_QUALITY = 82
const DEFAULT_CONCURRENCY = 4

function usage() {
  console.log(`Convert PNG images to WebP recursively.

Options:
  --input <dir>        Source directory (default: ${DEFAULT_INPUT})
  --output <dir>       Separate output root; preserves relative paths
  --quality <1-100>    WebP quality (default: ${DEFAULT_QUALITY})
  --concurrency <n>    Simultaneous conversions (default: ${DEFAULT_CONCURRENCY})
  --force              Reconvert outputs that are already up to date
  --dry-run            Show what would happen without writing files
  --help                Show this help

PNG originals are always preserved.`)
}

function valueAfter(args, index, option) {
  const value = args[index + 1]
  if (!value || value.startsWith('--')) throw new Error(`${option} requires a value`)
  return value
}

function parseArgs(args) {
  const options = {
    input: DEFAULT_INPUT,
    output: null,
    quality: DEFAULT_QUALITY,
    concurrency: DEFAULT_CONCURRENCY,
    force: false,
    dryRun: false,
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === '--help' || arg === '-h') return { help: true }
    if (arg === '--force') { options.force = true; continue }
    if (arg === '--dry-run') { options.dryRun = true; continue }
    if (arg === '--input') { options.input = valueAfter(args, i++, arg); continue }
    if (arg === '--output') { options.output = valueAfter(args, i++, arg); continue }
    if (arg === '--quality') { options.quality = Number(valueAfter(args, i++, arg)); continue }
    if (arg === '--concurrency') { options.concurrency = Number(valueAfter(args, i++, arg)); continue }
    throw new Error(`Unknown option: ${arg}`)
  }

  if (!Number.isInteger(options.quality) || options.quality < 1 || options.quality > 100) {
    throw new Error('--quality must be an integer between 1 and 100')
  }
  if (!Number.isInteger(options.concurrency) || options.concurrency < 1 || options.concurrency > 32) {
    throw new Error('--concurrency must be an integer between 1 and 32')
  }
  return options
}

function* walkPngs(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* walkPngs(path)
    else if (entry.isFile() && /\.png$/i.test(entry.name)) yield path
  }
}

function webpName(pngName) {
  // Collapse repeated extensions produced by some upload/download flows.
  return pngName.replace(/(?:\.png)+$/i, '') + '.webp'
}

function outputPathFor(sourcePath, inputRoot, outputRoot) {
  const rel = relative(inputRoot, sourcePath)
  const targetRoot = outputRoot || inputRoot
  return join(targetRoot, webpName(rel))
}

async function main() {
  let options
  try {
    options = parseArgs(process.argv.slice(2))
  } catch (error) {
    console.error(`Error: ${error.message}\n`)
    usage()
    process.exitCode = 1
    return
  }

  if (options.help) { usage(); return }

  const inputRoot = resolve(options.input)
  const outputRoot = options.output ? resolve(options.output) : null
  if (!existsSync(inputRoot) || !statSync(inputRoot).isDirectory()) {
    console.error(`Input directory does not exist: ${inputRoot}`)
    process.exitCode = 1
    return
  }

  const claimedOutputs = new Set()
  const jobs = [...walkPngs(inputRoot)]
    .sort((a, b) => a.localeCompare(b))
    .map(source => {
      const preferred = outputPathFor(source, inputRoot, outputRoot)
      let output = preferred
      let copy = 2
      while (claimedOutputs.has(output.toLowerCase())) {
        const extension = extname(preferred)
        output = preferred.slice(0, -extension.length) + `-${copy++}${extension}`
      }
      claimedOutputs.add(output.toLowerCase())
      return { source, output, renamedForCollision: output !== preferred }
    })

  if (!jobs.length) {
    console.log(`No PNG files found under ${inputRoot}`)
    return
  }

  let cursor = 0
  let converted = 0
  let skipped = 0
  let failed = 0
  let sourceBytes = 0
  let outputBytes = 0

  async function worker() {
    while (cursor < jobs.length) {
      const job = jobs[cursor++]
      const sourceStat = statSync(job.source)
      sourceBytes += sourceStat.size

      const outputExists = existsSync(job.output)
      const outputStat = outputExists ? statSync(job.output) : null
      if (!options.force && outputStat?.mtimeMs >= sourceStat.mtimeMs) {
        skipped++
        outputBytes += outputStat.size
        console.log(`- skip ${relative(process.cwd(), job.output)} (up to date)`)
        continue
      }

      const collisionNote = job.renamedForCollision ? ' (name collision)' : ''
      console.log(`${options.dryRun ? '~' : '✓'} ${relative(process.cwd(), job.source)} -> ${relative(process.cwd(), job.output)}${collisionNote}`)
      if (options.dryRun) { converted++; continue }

      try {
        mkdirSync(dirname(job.output), { recursive: true })
        const info = await sharp(job.source)
          .rotate()
          .webp({ quality: options.quality, effort: 4 })
          .toFile(job.output)
        converted++
        outputBytes += info.size
      } catch (error) {
        failed++
        console.error(`  failed: ${error.message}`)
      }
    }
  }

  const workers = Math.min(options.concurrency, jobs.length)
  await Promise.all(Array.from({ length: workers }, () => worker()))

  const saved = outputBytes ? sourceBytes - outputBytes : 0
  console.log(`\n${options.dryRun ? '[dry run] ' : ''}${converted} converted, ${skipped} skipped, ${failed} failed`)
  if (!options.dryRun && outputBytes) {
    console.log(`${(sourceBytes / 1048576).toFixed(2)} MB PNG -> ${(outputBytes / 1048576).toFixed(2)} MB WebP (${(saved / 1048576).toFixed(2)} MB smaller)`)
  }
  if (failed) process.exitCode = 1
}

await main()
