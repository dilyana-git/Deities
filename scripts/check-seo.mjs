// Check the emitted HTML and crawler files, including preservation of the UI.
import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = fileURLToPath(new URL('../', import.meta.url))
const outDir = path.join(root, 'dist')
const html = await readFile(path.join(outDir, 'index.html'), 'utf8')
const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1]
assert(head, 'HTML head exists')
assert.equal((head.match(/<title>/g) || []).length, 1, 'one title')
assert(head.match(/<title>[^<]*Greek Mythology[^<]*<\/title>/), 'descriptive title')

const attrs = text => Object.fromEntries([...text.matchAll(/([\w:-]+)="([^"]*)"/g)].map(match => [match[1], match[2]]))
const tags = [...head.matchAll(/<meta\b[^>]*>/g)].map(match => attrs(match[0]))
const meta = name => tags.filter(tag => tag.name === name || tag.property === name)
for (const name of ['description', 'robots', 'og:type', 'og:site_name', 'og:title', 'og:description', 'og:url', 'og:image', 'og:image:alt', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt']) {
  assert.equal(meta(name).length, 1, `one ${name} tag`)
  assert(meta(name)[0].content?.trim(), `${name} is populated`)
}
const canonicals = [...head.matchAll(/<link\b[^>]*>/g)].map(match => attrs(match[0])).filter(tag => tag.rel === 'canonical')
assert.equal(canonicals.length, 1, 'one canonical URL')
const canonical = new URL(canonicals[0].href)
assert(['http:', 'https:'].includes(canonical.protocol))
assert.equal(canonical.pathname, '/')
assert(!canonical.hash && !canonical.search && !canonical.username && !canonical.password)
assert.equal(meta('og:url')[0].content, canonical.href, 'sharing URL matches canonical')
assert.equal(meta('twitter:card')[0].content, 'summary_large_image')
assert(['index, follow, max-image-preview:large', 'noindex, follow'].includes(meta('robots')[0].content))

const schemas = [...head.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
assert.equal(schemas.length, 1, 'one structured data block')
const schema = JSON.parse(schemas[0][1])
assert.equal(schema['@context'], 'https://schema.org')
const website = schema['@graph'].find(item => item['@type'] === 'WebSite')
const webpage = schema['@graph'].find(item => item['@type'] === 'WebPage')
assert.equal(website.url, canonical.href)
assert.equal(webpage.url, canonical.href)
assert.equal(webpage.isPartOf['@id'], website['@id'])
assert(!schema['@graph'].some(item => item['@type'] === 'BreadcrumbList'), 'no invented visible breadcrumbs')

// Vite moves the existing module entry into the head. Everything else in the
// body should match index.html: no reading pages, extra links, or new controls.
const source = await readFile(path.join(root, 'index.html'), 'utf8')
const body = text => text.match(/<body[^>]*>([\s\S]*?)<\/body>/)?.[1]
const sourceBody = body(source).replace(/<script\b[^>]*src="\/src\/main\.jsx"[^>]*>[\s\S]*?<\/script>/, '')
assert.equal(body(html).replace(/\s+/g, ''), sourceBody.replace(/\s+/g, ''), 'application body stays unchanged')
for (const [, src] of head.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)) assert((await stat(path.join(outDir, src))).isFile(), `published application asset: ${src}`)

const sitemap = await readFile(path.join(outDir, 'sitemap.xml'), 'utf8')
assert(sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'))
const urls = [...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map(match => match[1])
assert.deepEqual(urls, [canonical.href], 'sitemap lists only the real homepage')
assert(!sitemap.includes('<lastmod>'), 'no fabricated modification dates')
const robots = await readFile(path.join(outDir, 'robots.txt'), 'utf8')
assert(robots.includes('User-agent: *\nAllow: /'))
assert(robots.includes(`Sitemap: ${canonical.href}sitemap.xml`))
assert(!robots.includes('Disallow:'), 'required app assets remain crawlable')

const imageUrl = new URL(meta('og:image')[0].content)
assert.equal(imageUrl.origin, canonical.origin)
assert.equal(meta('twitter:image')[0].content, imageUrl.href)
assert.equal(webpage.primaryImageOfPage.url, imageUrl.href)
const image = await sharp(path.join(outDir, imageUrl.pathname)).metadata()
assert.equal(image.format, 'png')
assert.equal(image.width, 1200)
assert.equal(image.height, 630)
console.log('check-seo: metadata, canonical URL, structured data, sitemap, robots, sharing image, and unchanged application body verified.')
