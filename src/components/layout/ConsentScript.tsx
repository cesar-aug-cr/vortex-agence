/**
 * Runs in <head> before any analytics/ads tag. Sets Google Consent Mode v2 to
 * "denied" by default (opt-in), then immediately applies the visitor's stored
 * choice. Add GA4/GTM/Meta after this and they will respect consent with no
 * extra wiring.
 */
export function ConsentScript() {
  const js = `
(function(){
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag('consent','default',{
    ad_storage:'denied',
    analytics_storage:'denied',
    ad_user_data:'denied',
    ad_personalization:'denied',
    functionality_storage:'granted',
    security_storage:'granted',
    wait_for_update:500
  });
  try {
    var m = document.cookie.match(/(?:^|;\\s*)vortx_consent=([^;]+)/);
    if (m) {
      var c = JSON.parse(decodeURIComponent(m[1]));
      gtag('consent','update',{
        analytics_storage: c.analytics ? 'granted' : 'denied',
        ad_storage: c.marketing ? 'granted' : 'denied',
        ad_user_data: c.marketing ? 'granted' : 'denied',
        ad_personalization: c.marketing ? 'granted' : 'denied'
      });
    }
  } catch(e) {}
})();`;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
