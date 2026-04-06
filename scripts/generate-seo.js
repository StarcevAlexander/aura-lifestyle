#!/usr/bin/env node
/**
 * SEO file generator — runs automatically after `ng build` (postbuild hook).
 * Generates robots.txt, sitemap.xml, and _redirects into dist/aura-lifestyle/browser/
 *
 * Usage:
 *   Automatic: runs via "postbuild" npm script after `npm run build`
 *   Manual:    npm run seo
 */

'use strict';

const { writeFileSync, existsSync } = require('fs');
const { resolve } = require('path');

const DIST_DIR = resolve(__dirname, '..', 'dist', 'aura-lifestyle', 'browser');
const BASE_URL = 'https://amaniom.com';
const TODAY = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

if (!existsSync(DIST_DIR)) {
  console.error(`[generate-seo] dist directory not found: ${DIST_DIR}`);
  console.error('[generate-seo] Run `npm run build` first, or the script ran before the build finished.');
  process.exit(1);
}

// ─── robots.txt ────────────────────────────────────────────────────────────
const robotsTxt = `User-agent: *
Allow: /
Sitemap: ${BASE_URL}/sitemap.xml
`;

writeFileSync(resolve(DIST_DIR, 'robots.txt'), robotsTxt, 'utf8');
console.log('[generate-seo] ✓ robots.txt');

// ─── sitemap.xml ───────────────────────────────────────────────────────────
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${BASE_URL}/"/>
  </url>

  <url>
    <loc>${BASE_URL}/#relocation</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${BASE_URL}/#business</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${BASE_URL}/#lifestyle</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${BASE_URL}/#contact</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

</urlset>
`;

writeFileSync(resolve(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
console.log('[generate-seo] ✓ sitemap.xml');

// ─── _redirects (Netlify / Cloudflare Pages — SPA fallback) ────────────────
const redirects = `/*  /index.html  200\n`;
writeFileSync(resolve(DIST_DIR, '_redirects'), redirects, 'utf8');
console.log('[generate-seo] ✓ _redirects (SPA fallback)');

console.log(`[generate-seo] Done → ${DIST_DIR}`);
