import { useEffect, useState } from "react";
import Script from "next/script";

// Tack feedback widget, for client review on the staging host only.
//
// h16.be and h16.peleman.io are the SAME build (NEXT_PUBLIC_* is inlined at
// build time), so an env var cannot tell them apart. The gate is the hostname
// at runtime: only the review host loads the script. Tack's own allowed-origin
// list is the second lock — even a leaked script tag on h16.be could neither
// read nor write pins.
const REVIEW_HOSTS = ["h16.peleman.io", "localhost"];
const TACK_HOST = "https://tack.peleman.io";
const TACK_PROJECT = "pk_517eced0ed4b6bcc7235ad66f8d99965";

function ReviewWidget() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    setEnabled(REVIEW_HOSTS.includes(window.location.hostname));
  }, []);
  if (!enabled) return null;
  return (
    <Script
      src={`${TACK_HOST}/tack-widget.js`}
      data-project={TACK_PROJECT}
      data-api={TACK_HOST}
      strategy="afterInteractive"
    />
  );
}

export default ReviewWidget;
