import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const { pages, renderPage } = await import(pathToFileURL(resolve('.prerender/entry-server.js')));
const template = await readFile('dist/index.html', 'utf8');
const origin = (process.env.SITE_URL || 'https://stalkonstrukciya-landing.netlify.app').replace(/\/$/, '');
const indexable = process.env.SITE_INDEXABLE === 'true';
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const siteName = 'Корпорация Стальконструкция';

for (const page of [...pages, { path: '/404/', title: 'Страница не найдена', description: 'Выберите нужный раздел сайта «Стальконструкция».' }]) {
  const title = escape(`${page.title} | ${siteName}`);
  const description = escape(page.description.slice(0, 250));
  const canonical = `${origin}${page.path}`;
  const parent = page.path.startsWith('/otrasli/') && page.path !== '/otrasli/'
    ? { title: 'Продукция', path: '/produkciya/' }
    : ['/proizvodstvo/', '/proekty/', '/blog/'].includes(page.path)
      ? { title: 'О компании', path: '/o-kompanii/' } : null;
  const breadcrumbs = page.path === '/' ? null : { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: `${origin}/` },
    ...(parent ? [{ '@type': 'ListItem', position: 2, name: parent.title, item: origin + parent.path }] : []),
    { '@type': 'ListItem', position: parent ? 3 : 2, name: page.title, item: canonical },
  ] };
  const head = `<title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="robots" content="${indexable && !['/404/', '/politika/', '/soglasie/'].includes(page.path) ? 'index,follow' : 'noindex,follow'}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${escape(canonical)}" />
    <meta property="og:image" content="${escape(origin)}/assets/og-card.jpg" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="ru_RU" />
    <link rel="canonical" href="${escape(canonical)}" />
    ${breadcrumbs ? `<script type="application/ld+json">${JSON.stringify(breadcrumbs).replaceAll('<', '\\u003c')}</script>` : ''}`;
  let html = template.replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/<meta\s+(?:name="description"|property="og:[^"]*")[\s\S]*?\/>/g, '')
    .replace('</head>', `${head}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${renderPage(page.path)}</div>`);
  const dir = page.path === '/404/' ? 'dist' : resolve('dist', `.${page.path}`);
  await mkdir(dir, { recursive: true });
  await writeFile(resolve(dir, page.path === '/404/' ? '404.html' : 'index.html'), html);
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.filter(page => !['/politika/', '/soglasie/'].includes(page.path)).map(page => `<url><loc>${escape(origin + page.path)}</loc></url>`).join('')}</urlset>`;
await writeFile('dist/sitemap.xml', sitemap);
await writeFile('dist/robots.txt', indexable ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n');
console.log(`Generated ${pages.length} static pages, 404.html, sitemap.xml and robots.txt (${indexable ? 'indexable' : 'preview: noindex'}).`);
