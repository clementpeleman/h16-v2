import { Html, Head, Main, NextScript } from "next/document";

// Google tag (gtag.js) for this GA4 property. It sits first in <head>, as
// Google asks, and must stay the only one: a second tag double-counts.
const GOOGLE_TAG_ID = "G-JN1PKSWNWV";

// The site is entirely Dutch. Without lang="nl" a screen reader pronounces it
// with an English voice and search engines mis-classify the language.
export default function Document() {
  return (
    <Html lang="nl">
      <Head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${GOOGLE_TAG_ID}');`,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
