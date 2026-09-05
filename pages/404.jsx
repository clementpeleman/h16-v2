import PagesMetaHead from "../components/PagesMetaHead";
import ErrorPage from "../components/shared/ErrorPage";

function NotFound() {
  return (
    <>
      <PagesMetaHead
        title="Pagina niet gevonden"
        description="Deze pagina bestaat niet of is verplaatst."
      />
      <ErrorPage
        title="Deze pagina bestaat niet meer."
        body="Mogelijk is het project verkocht en offline gehaald, of klopt er iets niet aan de link. Onze realisaties staan er nog steeds."
      />
    </>
  );
}

export default NotFound;
