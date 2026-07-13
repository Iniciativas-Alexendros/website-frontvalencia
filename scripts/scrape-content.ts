/**
 * Phase 0 v3: Incremental scraping — saves per-route, minimal timeout
 */

import { chromium, type Browser } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE = 'https://frontvalencia.com';
const OUT = path.resolve(__dirname, '..');
const CONTENT = path.join(OUT, 'content');
const RAW = path.join(OUT, 'assets/raw');

const ROUTES = [
  { r: '/', n: 'home', l: 'es' },
  { r: '/carta', n: 'carta', l: 'es' },
  { r: '/espacio', n: 'espacio', l: 'es' },
  { r: '/localizacion', n: 'localizacion', l: 'es' },
  { r: '/reservas', n: 'reservas', l: 'es' },
  { r: '/en', n: 'home', l: 'en' },
  { r: '/en/carta', n: 'carta', l: 'en' },
  { r: '/en/espacio', n: 'espacio', l: 'en' },
  { r: '/en/localizacion', n: 'localizacion', l: 'en' },
  { r: '/en/reservas', n: 'reservas', l: 'en' },
];

const dir = (d: string) => { fs.mkdirSync(d, { recursive: true }); return d; };
const save = (name: string, data: any) => {
  fs.writeFileSync(path.join(dir(path.join(CONTENT, 'routes')), `${name}.json`), JSON.stringify(data, null, 2));
};

async function download(url: string, dest: string): Promise<boolean> {
  return new Promise(resolve => {
    if (!url || url.startsWith('data:')) { resolve(false); return; }
    const full = url.startsWith('http') ? url : `${BASE}${url.startsWith('/') ? '' : '/'}${url}`;
    const client = full.startsWith('https') ? https : http;
    client.get(full, { timeout: 15000 }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        download(res.headers.location || '', dest).then(resolve);
        return;
      }
      if (res.statusCode !== 200) { resolve(false); return; }
      dir(path.dirname(dest));
      const ws = fs.createWriteStream(dest);
      res.pipe(ws);
      ws.on('finish', () => { ws.close(); resolve(true); });
      ws.on('error', () => resolve(false));
    }).on('error', () => resolve(false)).on('timeout', function() { this.destroy(); resolve(false); });
  });
}

async function main() {
  dir(path.join(CONTENT, 'routes'));
  dir(path.join(RAW, 'images'));
  dir(path.join(RAW, 'videos'));
  dir(path.join(RAW, 'logos'));
  dir(path.join(RAW, 'screenshots'));

  console.log('Phase 0 v3: Incremental scraping');
  const browser: Browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  const netImages = new Set<string>();
  const netVideos = new Set<string>();
  page.on('response', r => {
    const u = r.url();
    if (u.match(/\.(mp4|webm|mov)$/i)) netVideos.add(u);
    if (u.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i) && !u.includes('metricool') && !u.startsWith('data:')) netImages.add(u);
  });

  for (const { r, n, l } of ROUTES) {
    const key = `${n}-${l}`;
    console.log(`\n${key}: ${r}`);
    try {
      await page.goto(`${BASE}${r}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(4000);

      const title = await page.title().catch(() => '');
      const body = await page.locator('body').innerText().catch(() => '');

      // Headings
      const headings: Record<string, string[]> = {};
      for (const tag of ['h1', 'h2', 'h3', 'h4']) {
        const els = page.locator(tag);
        const cnt = await els.count();
        const arr: string[] = [];
        for (let i = 0; i < Math.min(cnt, 50); i++) {
          const t = await els.nth(i).innerText().catch(() => '');
          if (t.trim()) arr.push(t.trim());
        }
        if (arr.length) headings[tag] = arr;
      }

      // Links
      const linkEls = page.locator('a[href]');
      const lcnt = await linkEls.count();
      const links: { text: string; href: string; rel: string }[] = [];
      for (let i = 0; i < Math.min(lcnt, 100); i++) {
        const href = await linkEls.nth(i).getAttribute('href').catch(() => '');
        const text = await linkEls.nth(i).innerText().catch(() => '');
        const rel = await linkEls.nth(i).getAttribute('rel').catch(() => '');
        if (href) links.push({ href, text: text.trim(), rel: rel || '' });
      }

      // Images
      const imgEls = page.locator('img');
      const icnt = await imgEls.count();
      const images: { src: string; alt: string }[] = [];
      for (let i = 0; i < Math.min(icnt, 50); i++) {
        const src = await imgEls.nth(i).getAttribute('src').catch(() => '');
        const alt = await imgEls.nth(i).getAttribute('alt').catch(() => '');
        if (src && !src.startsWith('data:') && !src.includes('metricool')) images.push({ src, alt: alt || '' });
      }

      // Videos
      const vidEls = page.locator('video');
      const vcnt = await vidEls.count();
      const videos: any[] = [];
      for (let i = 0; i < vcnt; i++) {
        const poster = await vidEls.nth(i).getAttribute('poster').catch(() => '');
        const src = await vidEls.nth(i).getAttribute('src').catch(() => '');
        videos.push({ poster, src });
      }

      // iframes (maps, widgets)
      const ifEls = page.locator('iframe');
      const ifcnt = await ifEls.count();
      const iframes: { src: string }[] = [];
      for (let i = 0; i < ifcnt; i++) {
        const src = await ifEls.nth(i).getAttribute('src').catch(() => '');
        if (src) iframes.push({ src });
      }

      // Meta
      const desc = await page.locator('meta[name="description"]').getAttribute('content').catch(() => '') || '';
      const ogImg = await page.locator('meta[property="og:image"]').getAttribute('content').catch(() => '') || '';
      const ogLoc = await page.locator('meta[property="og:locale"]').getAttribute('content').catch(() => '') || '';

      await page.screenshot({ path: path.join(RAW, 'screenshots', `${key}.png`), fullPage: true });

      const data = { route: r, lang: l, title, description: desc, ogImage: ogImg, ogLocale: ogLoc, headings, body, links, images, videos, iframes, timestamp: new Date().toISOString() };
      save(key, data);
      console.log(`  ✓ ${body.length} chars | ${Object.values(headings).flat().length} headings | ${images.length} imgs | ${videos.length} vids | ${links.length} links`);
    } catch (err: any) {
      console.error(`  ✗ ${err.message.substring(0, 100)}`);
      save(key, { route: r, lang: l, error: err.message, timestamp: new Date().toISOString() });
    }
  }

  // Download network images (separate pass)
  console.log(`\nDownloading ${netImages.size} network images...`);
  let d = 0;
  for (const u of netImages) {
    try {
      const p = new URL(u).pathname;
      const ext = path.extname(p) || '.jpg';
      const bn = path.basename(p, ext).replace(/[^a-zA-Z0-9_-]/g, '_') || `img${d}`;
      if (await download(u, path.join(RAW, 'images', `${bn}${ext}`))) d++;
    } catch {}
  }
  console.log(`  ✓ ${d} images`);

  // Download network videos
  console.log(`\nDownloading ${netVideos.size} network videos...`);
  for (const u of netVideos) {
    try {
      const bn = path.basename(new URL(u).pathname);
      if (await download(u, path.join(RAW, 'videos', bn))) console.log(`  ✓ ${bn}`);
    } catch {}
  }

  // Download logos
  console.log('\nDownloading logos...');
  for (const f of [
    '/logo-icon.png', '/LOGO_MV_SVG.svg', '/from-logo.svg', '/the-club-icon.svg',
    '/arrow-b.png', '/arrow.png',
    '/ILUSTRACION_MV_PEQUEÑO.svg', '/ILUSTRACION_MV_GRANDE.svg', '/ILUSTRACION_TABLET.svg',
    '/ILUSTRACION_WEB-2.svg', '/ILUSTRACION_WEB_1250.svg', '/ILUSTRACION_WEB_2020.svg',
  ]) {
    if (await download(`${BASE}${f}`, path.join(RAW, 'logos', path.basename(f)))) console.log(`  ✓ ${path.basename(f)}`);
  }

  // Save network URLs
  fs.writeFileSync(path.join(CONTENT, '_network-images.json'), JSON.stringify([...netImages], null, 2));
  fs.writeFileSync(path.join(CONTENT, '_network-videos.json'), JSON.stringify([...netVideos], null, 2));

  await browser.close();

  // Generate report
  const routeFiles = fs.readdirSync(path.join(CONTENT, 'routes')).filter(f => f.endsWith('.json'));
  let report = `# Phase 0 Report\n\n**Date:** ${new Date().toISOString()}\n**Routes:** ${routeFiles.length}\n**Network images:** ${netImages.size}\n**Network videos:** ${netVideos.size}\n\n## Routes\n\n| File | Chars | Headings | Images | Videos | Links |\n|------|-------|----------|--------|--------|-------|\n`;
  for (const f of routeFiles) {
    const d = JSON.parse(fs.readFileSync(path.join(CONTENT, 'routes', f), 'utf-8'));
    const hc = d.headings ? Object.values(d.headings).flat().length : 0;
    report += `| ${f} | ${(d.body||'').length} | ${hc} | ${(d.images||[]).length} | ${(d.videos||[]).length} | ${(d.links||[]).length} |\n`;
  }
  fs.writeFileSync(path.join(CONTENT, 'PHASE-0-REPORT.md'), report);
  console.log('\n' + report);
}

main().catch(console.error);
