import ServicePage from "../../components/redesign/service/ServicePage";
import { loadService } from "../../components/redesign/service/loadService";
import { isProductionHost } from "../../lib/staging";

// /bouwcoordinatie redesign, STAGING ONLY: next.config.js rewrites the public path
// here on h16.peleman.io; on h16.be every /v2 page is a 404, so production
// keeps pages/bouwcoordinatie.jsx until the client approves. Copy from
// data/diensten.js (read on the server), template shared with the other
// service page.
function Page(props) {
  return <ServicePage {...props} />;
}

Page.ownLayout = true;
export default Page;

export async function getServerSideProps({ req, res }) {
  if (isProductionHost(req)) return { notFound: true };
  return loadService("bouwcoordinatie", { req, res });
}
