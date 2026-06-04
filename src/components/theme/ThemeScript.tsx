/**
 * Inline, render-blocking script that sets the theme class BEFORE paint
 * to avoid a flash of the wrong theme. Brand default = dark.
 */
export function ThemeScript() {
  const js = `(function(){try{var k='vortx-theme';var s=localStorage.getItem(k);var d=s?s==='dark':true;var e=document.documentElement;if(d){e.classList.add('dark');}e.style.colorScheme=d?'dark':'light';}catch(_){document.documentElement.classList.add('dark');}})();`;
  return <script dangerouslySetInnerHTML={{ __html: js }} suppressHydrationWarning />;
}
