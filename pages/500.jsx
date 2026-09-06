import PagesMetaHead from "../components/PagesMetaHead";
import ErrorPage from "../components/shared/ErrorPage";

function ServerError() {
  return (
    <>
      <PagesMetaHead
        title="Er ging iets mis"
        description="Er ging iets mis aan onze kant. Probeer het straks opnieuw."
      />
      <ErrorPage
        title="Er ging iets mis aan onze kant."
        body="Dit ligt niet aan u. Probeer het over enkele minuten opnieuw, of bel ons gewoon even. Dan helpen we u meteen verder."
      />
    </>
  );
}

export default ServerError;
