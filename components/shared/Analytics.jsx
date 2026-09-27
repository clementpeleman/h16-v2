import { useEffect } from "react";
import Script from "next/script";
import { company } from "../../data/companyData";

// Umami, self-hosted on Coolify. Cookieless, so no consent banner is needed.
// Renders nothing until NEXT_PUBLIC_UMAMI_WEBSITE_ID is set at build time, so
// a deployment without an Umami instance ships no third-party script at all.
const WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
const SRC = process.env.NEXT_PUBLIC_UMAMI_SRC || "https://stats.peleman.io/script.js";

// Safe to call before the script has loaded (the event is then dropped).
export function trackEvent(name, data) {
  if (typeof window !== "undefined" && window.umami?.track) {
    window.umami.track(name, data);
  }
}

// Which click is a conversion. Phone and e-mail links are scattered over ten
// components, so they are recognised by their href rather than tagged one by
// one; anything else opts in with a data-track="<event>" attribute.
//
// Not Umami's own data-umami-event: its tracker cancels the click and sets
// location.href itself, which turns a next/link navigation into a full reload.
function eventFor(target) {
  const tagged = target.closest("[data-track]");
  if (tagged) return tagged.getAttribute("data-track");
  const link = target.closest("a[href]");
  if (!link) return null;
  const href = link.getAttribute("href") || "";
  if (href.startsWith("tel:")) return "telefoon";
  // Only the firm's own address; the footer credit mails the developer.
  if (href.toLowerCase() === company.emailHref.toLowerCase()) return "email";
  return null;
}

function Analytics() {
  useEffect(() => {
    if (!WEBSITE_ID) return undefined;
    const onClick = (e) => {
      if (!(e.target instanceof Element)) return;
      const name = eventFor(e.target);
      if (name) trackEvent(name, { pagina: window.location.pathname });
    };
    document.addEventListener("click", onClick, { passive: true });
    return () => document.removeEventListener("click", onClick);
  }, []);

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
