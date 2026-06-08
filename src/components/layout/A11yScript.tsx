/**
 * Inline, render-blocking script that applies saved accessibility settings
 * BEFORE paint (font size + toggle classes), mirroring ThemeScript, so there's
 * no flash of un-adjusted content for users who rely on these settings.
 */
export function A11yScript() {
  const js = `(function(){try{var s=JSON.parse(localStorage.getItem('vortx-a11y')||'{}');var e=document.documentElement;var m={contrast:'a11y-contrast',links:'a11y-links',readable:'a11y-readable',spacing:'a11y-spacing',pauseMotion:'a11y-no-motion'};for(var k in m){if(s[k])e.classList.add(m[k]);}if(s.fontScale&&s.fontScale!==1){e.style.fontSize=(s.fontScale*100)+'%';}}catch(_){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: js }} suppressHydrationWarning />;
}
