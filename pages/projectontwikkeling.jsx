import ServicePage from "../components/redesign/service/ServicePage";
import { loadService } from "../components/redesign/service/loadService";

// /projectontwikkeling ("Monografie" redesign). Copy from data/diensten.js (read at
// build/regeneration time), template shared with the other service page.
function Page(props) {
  return <ServicePage {...props} />;
}

Page.ownLayout = true;
export default Page;

export async function getStaticProps() {
  return loadService("projectontwikkeling");
}
