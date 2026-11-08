import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pages } from '../.prerender/entry-server.js';

test('all pages have static content, unique metadata and working internal links', async () => {
  const titles = new Set();
  for (const page of pages) {
    const file = resolve('dist', '.' + page.path, 'index.html');
    const html = await readFile(file, 'utf8');
    assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, `one H1: ${page.path}`);
    assert.equal((html.match(/<title>/g) ?? []).length, 1);
    const title = html.match(/<title>(.*?)<\/title>/)[1];
    assert.ok(!titles.has(title), `unique title: ${page.path}`); titles.add(title);
    assert.match(html, /name="description" content="[^"]+"/);
    assert.match(html, /rel="canonical"/);
    assert.match(html, /name="robots" content="noindex,follow"/);
    assert.match(html, /id="raschet"/);
    assert.match(html, /type="file"/);
    for (const [, href] of html.matchAll(/href="([^"?]+)"/g)) {
      if (!href.startsWith('/') && !href.startsWith('#')) continue;
      const [pathname, hash] = href.split('#');
      if (!pathname || pathname === page.path) {
        if (hash) assert.ok(html.includes(`id="${hash}"`), `${page.path}: anchor ${href}`);
        continue;
      }
      const target = resolve('dist', '.' + pathname, ...(pathname.endsWith('/') ? ['index.html'] : []));
      await access(target).catch(() => assert.fail(`${page.path}: missing ${href}`));
      if (hash) assert.ok((await readFile(target, 'utf8')).includes(`id="${hash}"`), `${page.path}: cross-page anchor ${href}`);
    }
    for (const [, src] of html.matchAll(/src="(\/[^"]+)"/g)) await access(resolve('dist', '.' + src));
  }
  assert.equal(pages.length, 22);
  const home = await readFile('dist/index.html', 'utf8');
  assert.doesNotMatch(home, /Кейсы скоро|Первые статьи готовятся|\[ТЕЛЕФОН\]/);
  const design = await readFile('dist/proektirovanie/index.html', 'utf8');
  assert.match(design, /гарантируем прохождение экспертизы/);
  assert.match(design, /до 15% снижения итоговой стоимости объекта/);
  const notFound = await readFile('dist/404.html', 'utf8');
  assert.match(notFound, /Страница не найдена/);
});
