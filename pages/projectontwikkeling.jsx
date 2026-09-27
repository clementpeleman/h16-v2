import ServicePage from "../components/services/ServicePage";
import { loadServicePage } from "../lib/servicePage";

// Copy lives in data/diensten.js; a draft 404s on h16.be until it is ready.
export default ServicePage;

export function getServerSideProps(ctx) {
  return loadServicePage("projectontwikkeling", ctx);
}
