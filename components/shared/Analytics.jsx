import Script from "next/script";

// Umami, self-hosted on Coolify. Cookieless, so no consent banner is needed.
// Renders nothing until NEXT_PUBLIC_UMAMI_WEBSITE_ID is set at build time, so
// a deployment without an Umami instance ships no third-party script at all.
const WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
const SRC = process.env.NEXT_PUBLIC_UMAMI_SRC || "https://stats.peleman.io/script.js";

// The one conversion on the site. Safe to call before the script has loaded.
export function trackEvent(name, data) {
  if (typeof window !== "undefined" && window.umami?.track) {
    window.umami.track(name, data);
  }
}

function Analytics() {
  if (!WEBSITE_ID) return null;
  return (
    <Script
      src={SRC}
      data-website-id={WEBSITE_ID}
      // Staging traffic would pollute the numbers; Umami only counts the
      // production host.
      data-domains="h16.be,www.h16.be"
      strategy="afterInteractive"
    />
  );
}

export default Analytics;
