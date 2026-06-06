// Report horizontal overflow at a given width for a list of paths.
// Usage: node scripts/check-overflow.mjs <baseUrl> <width> <path...>
import puppeteer from "puppeteer-core";

const [, , base, widthArg, ...paths] = process.argv;
const width = Number(widthArg) || 360;
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--hide-scrollbars"],
});

try {
  for (const p of paths) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 800, deviceScaleFactor: 1 });
    await page.goto(`${base}${p}`, { waitUntil: "networkidle2", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 800));
    const res = await page.evaluate(() => {
      const de = document.documentElement;
      const sw = Math.max(de.scrollWidth, document.body.scrollWidth);
      const iw = window.innerWidth;
      let culprits = [];
      if (sw > iw) {
        for (const el of document.querySelectorAll("*")) {
          const r = el.getBoundingClientRect();
          if (r.right > iw + 1 || r.left < -1) {
            culprits.push(
              `${el.tagName.toLowerCase()}.${(el.className || "").toString().slice(0, 40)} [${Math.round(r.left)}→${Math.round(r.right)}]`
            );
          }
          if (culprits.length >= 5) break;
        }
      }
      return { sw, iw, overflow: sw > iw + 1, culprits };
    });
    const flag = res.overflow ? "❌ OVERFLOW" : "✓ ok";
    console.log(`${flag}  ${p}  scrollW=${res.sw} innerW=${res.iw}`);
    if (res.overflow) res.culprits.forEach((c) => console.log(`     ↳ ${c}`));
    await page.close();
  }
} finally {
  await browser.close();
}
