import "../styles/globals.css";
import DefaultLayout from "../components/layout/DefaultLayout";
import ReviewWidget from "../components/shared/ReviewWidget";
import Analytics from "../components/shared/Analytics";

function MyApp({ Component, pageProps }) {
  // A page that brings its own header and footer (every redesigned page)
  // sets `Page.ownLayout = true`; it still gets the widgets.
  if (Component.ownLayout) {
    return (
      <>
        <Component {...pageProps} />
        <ReviewWidget />
        <Analytics />
      </>
    );
  }
  return (
    <DefaultLayout>
      <Component {...pageProps} />
      <ReviewWidget />
      <Analytics />
    </DefaultLayout>
  );
}

export default MyApp;
