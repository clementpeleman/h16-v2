import Image from "next/image";

// The emblem story used to hang under the "Meerwaarde" copy as a 112px icon
// beside one 120-word paragraph — an appendix to the bio. It is the firm's
// symbol, so it closes the page: after the two people, before the invitation,
// with the emblem given real size and the copy broken at its natural turns.
function AboutEmblem() {
  return (
    <section className="mt-section grid gap-10 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:items-start lg:gap-16">
      <div className="w-36 sm:w-full sm:max-w-[240px]">
        <Image
          src="/images/H16_EMBLEEM_BLAUW.png"
          width={240}
          height={240}
          alt=""
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div className="max-w-[60ch]">
        <h2 className="text-h2 text-black">De kolibrie als symbool van H16</h2>
        <p className="mt-6 text-lead text-gray-700">
          Er bestaat een eeuwenoude symboliek rond dit bijzondere vogeltje: in
          vele culturen werd hij gezien als de boodschapper van liefde en
          vreugde.
        </p>
        <p className="mt-5 text-body text-ternary-dark">
          De kolibrie heeft unieke gaven en weet zijn talenten te gebruiken om
          zijn doelen te bereiken. Door zijn compact formaat en priemvormige
          snavel onderscheidt hij zich van de rest. Zijn vliegvermogen is uniek:
          hij vliegt in alle richtingen, ter plaatse én achterwaarts.
        </p>
        <p className="mt-5 text-body text-ternary-dark">
          Hij is razendsnel en heeft een bijzonder reactievermogen. Met het
          flapperen van zijn vleugels bereikt hij ongeziene frequenties. Net
          als H16.
        </p>
      </div>
    </section>
  );
}

export default AboutEmblem;
