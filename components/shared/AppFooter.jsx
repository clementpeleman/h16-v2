import AppFooterCopyright from "./AppFooterCopyright";
import AppFooterLegal from "./AppFooterLegal";
import AppFooterNav from "./AppFooterNav";

// Was a centred "Volg ons op:" h2 + centred icons, a left-aligned legal grid,
// then a centred copyright — three alignments and 480px of spacing for three
// lines of text. One left-aligned block now; the social links live in the
// legal grid's last column.
function AppFooter() {
  return (
    <footer className="container mx-auto">
      <div className="mt-section pt-14 sm:pt-20 pb-12 border-t border-gray-200">
        <AppFooterNav />
        <div className="mt-10">
          <AppFooterLegal />
        </div>
        <div className="mt-8">
          <AppFooterCopyright />
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
