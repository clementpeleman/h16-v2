import AppHeader from "../shared/AppHeader";
import AppFooter from "../shared/AppFooter";
import PagesMetaHead from "../PagesMetaHead";
import { Analytics } from "@vercel/analytics/react";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <PagesMetaHead />
      <AppHeader />
      <div>{children}</div>
      <Analytics />
      <AppFooter />
    </>
  );
};

export default DefaultLayout;
