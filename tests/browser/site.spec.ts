import { test, expect } from '@playwright/test';
import { readFile, mkdir } from 'node:fs/promises';

test('all 22 pages hydrate on mobile and desktop without overflow or runtime errors', async ({ page }) => {
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname).concat('/politika/', '/soglasie/');
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/api/inquiry', route => route.fulfill({ json: { ready: false } }));
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of paths) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('main')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Получить расчёт', exact: true })).toBeDisabled();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      expect(overflow, 'Horizontal overflow: ' + width + ' ' + path).toBe(false);
    }
  }
  expect(errors).toEqual([]);
});

test('mobile navigation and industry links open their own pages', async ({ page }) => {
  await page.route('**/api/inquiry', route => route.fulfill({ json: { ready: false } }));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Открыть меню' }).click();
  await expect(page.getByRole('navigation', { name: 'Мобильная навигация' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('navigation', { name: 'Мобильная навигация' })).toBeHidden();
  await page.getByRole('button', { name: 'Открыть меню' }).click();
  await page.getByRole('navigation', { name: 'Мобильная навигация' }).getByRole('link', { name: 'Проектирование', exact: true }).click();
  await expect(page).toHaveURL(/\/proektirovanie\/$/);
  await expect(page.locator('h1')).toHaveText('Проектирование');
  await page.goto('/');
  await page.locator('main .industry-card').filter({ hasText: 'Общественные и административно-бытовые здания' }).click();
  await expect(page).toHaveURL(/\/otrasli\/obshchestvennye-administrativnye-zdaniya\/$/);
  await page.getByRole('button', { name: 'Открыть меню' }).click();
  const mobile = page.getByRole('navigation', { name: 'Мобильная навигация' });
  await mobile.locator('.mobile-company-menu summary').click();
  await mobile.getByRole('link', { name: 'Производство', exact: true }).click();
  await expect(page).toHaveURL(/\/proizvodstvo\/$/);
  await expect(page.getByRole('navigation', { name: 'Хлебные крошки' }).getByRole('link', { name: 'О компании', exact: true })).toBeVisible();
  await page.setViewportSize({ width: 1440, height: 1000 });
  const desktop = page.getByRole('navigation', { name: 'Основная навигация' });
  await desktop.locator('.company-menu summary').click();
  await expect(desktop.getByRole('link', { name: 'Производство', exact: true })).toBeVisible();
  await expect(desktop.getByRole('link', { name: 'Проекты', exact: true })).toBeVisible();
  await desktop.getByRole('link', { name: 'Блог', exact: true }).click();
  await expect(page).toHaveURL(/\/blog\/$/);
});

test('form validates contact and attachments, preserves data on failure, and confirms real server success', async ({ page }) => {
  let attempts = 0;
  await page.route('**/api/inquiry', async route => {
    if (route.request().method() === 'GET') return route.fulfill({ json: { ready: true } });
    attempts++;
    const req = route.request();
    const data = await new Response(req.postDataBuffer(), { headers: { 'Content-Type': req.headers()['content-type'] } }).formData();
    expect(data.get('page')).toBe('/proektirovanie/');
    expect(data.get('direction')).toBe('Проектирование');
    expect(data.get('consent')).toBe('yes');
    expect((data.get('files') as File).name).toBe('drawing.pdf');
    return attempts === 1 ? route.fulfill({ status: 502, json: { ok: false, message: 'Тестовая ошибка доставки' } }) : route.fulfill({ json: { ok: true, id: data.get('requestId') } });
  });
  await page.goto('/proektirovanie/');
  await page.getByLabel('Ваше имя', { exact: true }).fill('Тестовый заказчик');
  await page.getByLabel('Телефон, email или Telegram', { exact: true }).fill('bad-contact');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Получить расчёт', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Укажите телефон');
  expect(attempts).toBe(0);
  await page.getByLabel('Телефон, email или Telegram', { exact: true }).fill('client@example.com');
  await page.getByLabel('Чертежи и техническое задание', { exact: true }).setInputFiles({ name: 'script.html', mimeType: 'text/html', buffer: Buffer.from('<script>test</script>') });
  await expect(page.getByRole('button', { name: 'Получить расчёт', exact: true })).toBeDisabled();
  await page.getByLabel('Чертежи и техническое задание', { exact: true }).setInputFiles({ name: 'drawing.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4 test') });
  await expect(page.getByRole('button', { name: 'Получить расчёт', exact: true })).toBeEnabled();
  await page.getByRole('button', { name: 'Получить расчёт', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Тестовая ошибка доставки');
  await expect(page.getByLabel('Ваше имя', { exact: true })).toHaveValue('Тестовый заказчик');
  await expect(page.getByRole('button', { name: 'Убрать drawing.pdf' })).toBeVisible();
  await page.getByRole('button', { name: 'Получить расчёт', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Заявка принята' })).toBeVisible();
  expect(attempts).toBe(2);
});

test('availability can be retried after a network error without losing form data', async ({ page }) => {
  let checks = 0;
  await page.route('**/api/inquiry', route => {
    expect(route.request().method()).toBe('GET');
    checks++;
    return checks === 1 ? route.fulfill({ status: 503, json: { message: 'Temporary failure' } }) : route.fulfill({ json: { ready: true } });
  });
  await page.goto('/proektirovanie/');
  await expect(page.getByRole('status')).toContainText('Не удалось проверить доступность формы');
  await page.getByLabel('Ваше имя', { exact: true }).fill('Заказчик');
  await page.getByLabel('Чертежи и техническое задание', { exact: true }).setInputFiles({ name: 'drawing.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4 test') });
  await page.getByRole('button', { name: 'Проверить ещё раз' }).click();
  await expect(page.getByRole('button', { name: 'Получить расчёт', exact: true })).toBeEnabled();
  await expect(page.getByLabel('Ваше имя', { exact: true })).toHaveValue('Заказчик');
  await expect(page.getByRole('button', { name: 'Убрать drawing.pdf' })).toBeVisible();
  expect(checks).toBe(2);
});

test('availability check times out and an unconfigured form stays disabled after retry', async ({ page }) => {
  await page.clock.install();
  let checks = 0;
  await page.route('**/api/inquiry', route => {
    expect(route.request().method()).toBe('GET');
    checks++;
    if (checks === 1) return; // Simulate a request that never responds.
    return route.fulfill({ json: { ready: false } });
  });
  await page.goto('/');
  await expect.poll(() => checks).toBe(1);
  await page.clock.fastForward(8_100);
  await expect(page.getByRole('status')).toContainText('Не удалось проверить доступность формы');
  await page.getByRole('button', { name: 'Проверить ещё раз' }).click();
  await expect(page.getByRole('status')).toContainText('Приём заявок пока не подключён');
  await expect(page.getByRole('button', { name: 'Получить расчёт', exact: true })).toBeDisabled();
});

test('review screenshots', async ({ page }) => {
  await page.route('**/api/inquiry', route => route.fulfill({ json: { ready: false } }));
  const dir = '/private/tmp/stalkonstrukciya-preview';
  await mkdir(dir, { recursive: true });
  for (const [name, path, width] of [['home-desktop', '/', 1440], ['design-desktop', '/proektirovanie/', 1440], ['product-desktop', '/produkciya/', 1440], ['home-mobile', '/', 390], ['industry-mobile', '/otrasli/energetika/', 390], ['supply-desktop', '/postavka/', 1440], ['supply-mobile', '/postavka/', 390]] as const) {
    await page.setViewportSize({ width, height: 1000 }); await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    if (name.startsWith('supply-')) {
      await page.locator('.supply-benefit-icon img').evaluateAll(images => Promise.all(images.map(image => (image as HTMLImageElement).decode())));
      await page.locator('#preimushchestva').screenshot({ path: dir + '/' + name + '.png', style: '.site-header, .skip-link { visibility: hidden !important; }' });
    }
    else await page.screenshot({ path: dir + '/' + name + '.png', fullPage: name === 'industry-mobile' });
  }
});

test('narrow layouts and product hero remain readable', async ({ page }) => {
  await page.route('**/api/inquiry', route => route.fulfill({ json: { ready: false } }));
  for (const width of [320, 768, 1024, 1280]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of ['/', '/produkciya/', '/postavka/', '/politika/', '/otrasli/obshchestvennye-administrativnye-zdaniya/']) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('h1')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), path + ' at ' + width).toBe(true);
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/produkciya/');
  await expect(page.locator('.hero-figure')).toBeVisible();
  const imageBox = await page.locator('.hero-figure').boundingBox();
  const titleBox = await page.locator('h1').boundingBox();
  expect(imageBox!.x).toBeGreaterThan(titleBox!.x + titleBox!.width);
  await page.screenshot({ path: '/private/tmp/stalkonstrukciya-preview/product-final.png' });
});
