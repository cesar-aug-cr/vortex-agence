// Screenshot the viewport after scrolling to an element matching text.
// Usage: node scripts/shot-at.mjs <url> <out.png> <textMatch> [theme]
import puppeteer from "puppeteer-core";
const [, , url, out, textMatch, theme = "dark"] = process.argv;
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--hide-scrollbars"],
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950, deviceScaleFactor: 1 });
  await page.evaluateOnNewDocument((t) => localStorage.setItem("vortx-theme", t), theme);
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
  await page.evaluate((txt) => {
    document.documentElement.style.scrollBehavior = "auto";
    const els = [...document.querySelectorAll("h2,h3")];
    const el = els.find((e) => e.textContent && e.textContent.includes(txt));
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo(0, y);
    }
  }, textMatch);
  await new Promise((r) => setTimeout(r, 2000));
  await page.screenshot({ path: out });
  console.log("OK ->", out);
} finally {
  await browser.close();
}
