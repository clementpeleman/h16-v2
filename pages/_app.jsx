import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";
import DefaultLayout from "../components/layout/DefaultLayout";
import UseScrollToTop from "../hooks/useScrollToTop";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }) {
  return (
    <AnimatePresence>
      <div className=" bg-background bg-opacity-60 dark:bg-primary-dark transition duration-300">
        <DefaultLayout>
          <Component {...pageProps} />
          <Analytics />
        </DefaultLayout>
        <UseScrollToTop />
      </div>
    </AnimatePresence>
  );
}

export default MyApp;
