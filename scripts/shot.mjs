// Full-page screenshot via existing Chrome (software WebGL so the 3D renders).
// Usage: node scripts/shot.mjs <url> <out.png> [width] [height] [theme] [fullPage] [selector]
//   - selector (optional): scroll that element into view and clip the shot to it.
import puppeteer from "puppeteer-core";

const [, , url, out, w = "1440", h = "900", theme = "dark", fullPage = "1", selector] =
  process.argv;

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swangle",
    "--ignore-gpu-blocklist",
    "--enable-webgl",
    "--hide-scrollbars",
  ],
});

try {
  const page = await browser.newPage();
  await page.setViewport({
    width: Number(w),
    height: Number(h),
    deviceScaleFactor: 1,
  });
  // pre-set theme before any script runs
  await page.evaluateOnNewDocument((t) => {
    try {
      localStorage.setItem("vortx-theme", t);
    } catch {}
  }, theme);

  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
  // let fonts + 3D settle
  await new Promise((r) => setTimeout(r, 2500));

  if (selector) {
    const el = await page.$(selector);
    if (!el) throw new Error(`selector not found: ${selector}`);
    await el.scrollIntoView();
    await new Promise((r) => setTimeout(r, 500));
    await el.screenshot({ path: out });
  } else {
    await page.screenshot({ path: out, fullPage: fullPage === "1" });
  }
  console.log("OK ->", out);
} catch (e) {
  console.error("SHOT ERROR:", e.message);
  process.exitCode = 1;
} finally {
  await browser.close();
}
