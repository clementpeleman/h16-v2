// Contact-form subjects per service slug, for /contact?dienst=<slug>.
//
// A separate module on purpose: ContactForm is client code, and importing
// data/diensten.js there would ship every draft sentence and every internal
// note for H16 in the public /contact bundle on h16.be.
export const DIENST_ONDERWERP = {
  bouwcoordinatie: "Vraag over bouwcoördinatie",
  projectontwikkeling: "Pand of grond te koop aangeboden",
};
