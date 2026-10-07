// Head metadata and crawler files only. No application markup, routes, styles,
// component code, or animation behavior is changed by this plugin.
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { nodes } from '../src/data/mythology.js'

export const DEFAULT_SITE_URL = 'https://deities.vercel.app'
export const SOCIAL_IMAGE_PATH = '/social-card.png'

export function seoSettings(env = {}) {
  const url = new URL(env.SITE_URL || DEFAULT_SITE_URL)
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('SITE_URL must be an HTTP(S) origin without a path, credentials, query, or fragment.')
  }
  const canonical = `${url.origin}/`
  return {
    canonical,
    title: 'Theogony — Greek Mythology Atlas',
    description: `Explore ${nodes.length} Greek mythology figures, their stories, and family relationships in Theogony, an interactive celestial atlas of gods, heroes, monsters, and mortals.`,
    image: new URL(SOCIAL_IMAGE_PATH, canonical).href,
    noindex: env.VERCEL_ENV === 'preview' || env.SEO_NOINDEX === 'true',
  }
}

const escapeHtml = text => String(text).replace(/[&<>"']/g, ch => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[ch])

export function structuredData(settings) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite', '@id': `${settings.canonical}#website`,
        url: settings.canonical, name: 'Theogony',
        alternateName: 'Theogony — A Web of Becoming', inLanguage: 'en',
      },
      {
        '@type': 'WebPage', '@id': `${settings.canonical}#webpage`,
        url: settings.canonical, name: settings.title, description: settings.description,
        inLanguage: 'en', isPartOf: { '@id': `${settings.canonical}#website` },
        about: { '@type': 'Thing', name: 'Greek mythology' },
        primaryImageOfPage: {
          '@type': 'ImageObject', url: settings.image, width: 1200, height: 630,
          caption: 'Theogony — A Web of Becoming. An interactive Greek mythology atlas.',
        },
      },
    ],
  }
}

export function crawlerFiles(settings) {
  // The current SPA has one public content URL. UI states and URL fragments
  // are not independent pages, and are deliberately excluded from the sitemap.
  return {
    'robots.txt': `User-agent: *\nAllow: /\n\nSitemap: ${settings.canonical}sitemap.xml\n`,
    'sitemap.xml': `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${escapeHtml(settings.canonical)}</loc></url>\n</urlset>\n`,
  }
}

export default function seoMetadataPlugin(env) {
  const settings = seoSettings(env)
  const files = crawlerFiles(settings)
  let root
  let imagePromise
  const socialImage = () => imagePromise ||= readFile(path.join(root, 'scripts/assets/social-card.svg')).then(svg => sharp(svg).png().toBuffer())
  const meta = (name, content, property = false) => ({
    tag: 'meta', attrs: { [property ? 'property' : 'name']: name, content }, injectTo: 'head',
  })

  return {
    name: 'theogony-head-metadata',
    configResolved(config) { root = config.root },
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return {
          html: html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(settings.title)}</title>`)
            .replace(/<meta\b[^>]*name="description"[^>]*>/, `<meta name="description" content="${escapeHtml(settings.description)}" />`),
          tags: [
            { tag: 'link', attrs: { rel: 'canonical', href: settings.canonical }, injectTo: 'head' },
            meta('robots', settings.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'),
            meta('og:type', 'website', true), meta('og:site_name', 'Theogony', true),
            meta('og:locale', 'en_US', true), meta('og:title', settings.title, true),
            meta('og:description', settings.description, true), meta('og:url', settings.canonical, true),
            meta('og:image', settings.image, true), meta('og:image:type', 'image/png', true),
            meta('og:image:width', '1200', true), meta('og:image:height', '630', true),
            meta('og:image:alt', 'Theogony — A Web of Becoming. An interactive Greek mythology atlas.', true),
            meta('twitter:card', 'summary_large_image'), meta('twitter:title', settings.title),
            meta('twitter:description', settings.description), meta('twitter:image', settings.image),
            meta('twitter:image:alt', 'Theogony — A Web of Becoming. An interactive Greek mythology atlas.'),
            {
              tag: 'script', attrs: { type: 'application/ld+json' }, injectTo: 'head',
              children: JSON.stringify(structuredData(settings)).replace(/</g, '\\u003c'),
            },
          ],
        }
      },
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!['GET', 'HEAD'].includes(req.method)) return next()
        const pathname = new URL(req.url, 'http://localhost').pathname
        if (pathname !== SOCIAL_IMAGE_PATH && !Object.hasOwn(files, pathname.slice(1))) return next()
        try {
          const image = pathname === SOCIAL_IMAGE_PATH
          const body = image ? await socialImage() : files[pathname.slice(1)]
          res.setHeader('Content-Type', image ? 'image/png' : pathname === '/sitemap.xml' ? 'application/xml; charset=utf-8' : 'text/plain; charset=utf-8')
          res.end(req.method === 'HEAD' ? undefined : body)
        } catch (error) { next(error) }
      })
    },
    async generateBundle() {
      for (const [fileName, source] of Object.entries(files)) this.emitFile({ type: 'asset', fileName, source })
      this.emitFile({ type: 'asset', fileName: SOCIAL_IMAGE_PATH.slice(1), source: await socialImage() })
    },
  }
}
