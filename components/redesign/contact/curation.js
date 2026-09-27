// The one plate on /contact (redesign). Read by getStaticProps only: the
// page checks that the path is still in the project's CMS gallery and drops
// the plate otherwise, so a removed photo can never break the contact page.
//
// A craft detail rather than a room: the window handle of a restored oak
// frame. The 2:3 original fills a 4:5 box edge to edge (overscan 1.0 in
// width); 50% 30% keeps the whole handle (y 10–66% of the photo) in view.
export const CONTACT_PLATE = {
  slug: "belfortstraat-29-onderstraat-75-a-gent",
  image: {
    path: "/uploads/OS_75_A_1_14_48ff51b7ed.jpg",
    w: 5504,
    h: 8256,
    op: { sm: "50% 30%", md: "50% 30%" },
    alt: "Sierlijke koperkleurige kruk op een houten raamkader, in een appartement van het project Belfortstraat 29 – Onderstraat 75A in Gent.",
  },
};
