// Single source of truth for the firm's own details.
//
// The address and phone number lived only in ContactDetails, so the footer had
// no legal identity and any correction would have had to be made twice. The
// contact page, the footer legal block and the error pages all read from here.
export const company = {
  name: "H16 Vastgoedontwikkeling",
  street: "Dorp 28",
  postalCity: "9860 Oosterzele",
  // The readable form and the dialable form differ; keep both so no component
  // has to strip spaces itself.
  phone: "+32 474 04 22 79",
  phoneHref: "tel:+32474042279",
  email: "info@h16.be",
  emailHref: "mailto:info@h16.be",
  mapsHref: "https://maps.google.com/?q=Dorp+28,+9860+Oosterzele",
  // Legal identity, from the Belgian company register (KBO/BCE), via
  // pappers.be/nl/company/h16-0769815061.
  //
  // In Belgium the ondernemingsnummer and the VAT number are the same digits —
  // the VAT number is just "BE" plus the enterprise number — so the footer
  // prints it once rather than twice as two apparently different facts.
  legalName: "H16 BV",
  vat: "BTW BE 0769.815.061",
  // The registered seat carries a bus number that the visiting address above
  // does not. Both are correct; this one is the legal one.
  registeredSeat: "Dorp 28 bus 0002, 9860 Oosterzele",
};

export default company;
