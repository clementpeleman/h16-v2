import "../styles/globals.css";
import DefaultLayout from "../components/layout/DefaultLayout";
import ReviewWidget from "../components/shared/ReviewWidget";
import Analytics from "../components/shared/Analytics";

function MyApp({ Component, pageProps }) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
      <ReviewWidget />
      <Analytics />
    </DefaultLayout>
  );
}

export default MyApp;
