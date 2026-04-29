import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';

const URL = 'http://localhost:5173';
const OUT = './screenshots';

await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({ headless: true });

async function capture(width, height, filename) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(URL, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: `${OUT}/${filename}`, fullPage: false });
  console.log(`Saved ${filename}`);
  await page.close();
}

await capture(1440, 900, 'desktop-study-mode.png');

// All cards view at desktop
const page2 = await browser.newPage();
await page2.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page2.goto(URL, { waitUntil: 'networkidle0' });
await page2.click('button[aria-selected="false"]');
await new Promise(r => setTimeout(r, 300));
await page2.screenshot({ path: `${OUT}/desktop-all-cards.png`, fullPage: false });
console.log('Saved desktop-all-cards.png');
await page2.close();

// Mobile at 375px
await capture(375, 812, 'mobile-study-mode.png');

const page3 = await browser.newPage();
await page3.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 });
await page3.goto(URL, { waitUntil: 'networkidle0' });
await page3.click('button[aria-selected="false"]');
await new Promise(r => setTimeout(r, 300));
await page3.screenshot({ path: `${OUT}/mobile-all-cards.png`, fullPage: false });
console.log('Saved mobile-all-cards.png');
await page3.close();

await browser.close();
console.log('All screenshots done.');
