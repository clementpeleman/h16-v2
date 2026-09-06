import ContactDetails from "../components/contact/ContactDetails";
import ContactForm from "../components/contact/ContactForm";
import PagesMetaHead from "../components/PagesMetaHead";
import ContactBanner from "../components/contact/ContactBanner";

function contact() {
  return (
    <div>
      <PagesMetaHead
        title="Contact: bouwadvies in Oosterzele en Gent"
        description="Contacteer H16 Vastgoedontwikkeling voor uw bouwproject. We antwoorden binnen twee werkdagen."
      />

      <div
        className="enter-fade container mx-auto"
      >
        <ContactBanner />
      </div>
      {/* `flex-col-reverse` meant that below 1024px a sighted visitor read
          details-then-form while tab order and screen readers gave
          form-then-details — on the conversion page. Plain `flex-col` puts
          both orders back in agreement, and a real gap replaces the two
          columns' internal margins. */}
      <div
        className="enter-fade container mx-auto grid gap-14 lg:grid-cols-[3fr_2fr] lg:gap-16 mt-group"
      >
        <ContactForm />

        <ContactDetails />
      </div>
    </div>
  );
}

export default contact;
