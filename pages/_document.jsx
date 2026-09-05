import { Html, Head, Main, NextScript } from "next/document";

// The site is entirely Dutch. Without lang="nl" a screen reader pronounces it
// with an English voice and search engines mis-classify the language.
export default function Document() {
  return (
    <Html lang="nl">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
