import { trackEvent } from "../shared/Analytics";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DIENST_META } from "../../data/dienstMeta";

const EMPTY = { name: "", email: "", phone: "", subject: "", message: "" };

// Two looks, one form. "classic" is the production /contact page and its
// strings below are exactly what that page has always rendered; "v2" is the
// staging redesign (components/redesign/README.md): square fields on paper,
// Balerno heading, blue labels. Only classes (and two optional ids) differ —
// validation, prefill, submission and analytics are shared code.
const STYLES = {
  classic: {
    // Fields share one set of classes so a hardened input and a hardened
    // textarea can never drift apart. text-base (16px) is deliberate: iOS
    // Safari force-zooms a focused input under 16px, which breaks the layout
    // mid-form.
    field:
      "w-full px-5 py-3 rounded-md text-base " +
      "bg-secondary-light text-primary-dark placeholder:text-gray-500 " +
      "border border-gray-400 " +
      "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 " +
      "aria-[invalid=true]:border-accent-deep aria-[invalid=true]:ring-accent-deep/25 " +
      "duration-200",
    label: "block text-ui text-primary-dark mb-1",
    required: "text-accent-deep",
    optional: "text-gray-600",
    form: "max-w-xl text-left",
    title: "text-h2 mb-8",
    alert:
      "mb-6 border-t-2 border-accent-deep bg-ternary-light px-5 py-4 text-body text-accent-deep",
    group: "mb-6",
    error: "mt-1 text-meta text-accent-deep",
    hint: "mt-1 text-meta text-ternary-dark",
    submitRow: "mt-6",
    submit:
      "text-ui px-7 py-4 text-white text-center tracking-wider bg-primary rounded-lg hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-wait duration-300",
    privacy: "mt-5 text-meta text-ternary-dark",
    done: "max-w-xl text-left border-t-2 border-primary pt-8",
    doneTitle: "text-h2 mb-4 text-primary-dark",
    doneText: "text-body text-ternary-dark mb-6",
    doneList: "text-body mb-8",
    doneItemFirst: "mb-2",
    doneItemLast: undefined,
    donePhone:
      "text-primary underline underline-offset-4 decoration-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200",
    doneEmail:
      "text-primary underline underline-offset-4 decoration-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm break-all duration-200",
    doneButton:
      "text-ui px-7 py-4 bg-primary text-white text-center tracking-wider rounded-lg hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 duration-300",
  },
  v2: {
    // Square, white on paper. The 1px primary-muted edge is 5.9:1 against
    // paper (a field boundary needs 3:1). Focus adds a 2px primary outline
    // right on the edge — an outline, not a box-shadow ring, so it survives
    // forced-colors mode. Invalid gets a 2px accent-deep edge via an inset
    // shadow, so nothing shifts. accent-deep is the redesign's error colour
    // only (6.65:1 on paper).
    field:
      "mt-2 block w-full rounded-none border border-primary-muted bg-white px-4 py-3 text-base text-ink " +
      "placeholder:text-primary-muted transition-colors duration-150 " +
      "focus:border-primary focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-primary focus:ring-0 " +
      "aria-[invalid=true]:border-accent-deep aria-[invalid=true]:shadow-[inset_0_0_0_1px_#A62710]",
    label: "block text-ui text-primary",
    required: "text-primary",
    optional: "font-normal text-primary-muted",
    // Spacing by gap, so no child carries a margin seam.
    form: "flex flex-col gap-6 text-left",
    title:
      "pb-2 font-display text-h2 font-normal text-primary [text-wrap:balance]",
    alert:
      "border-t-2 border-accent-deep bg-white px-5 py-4 text-body text-ink",
    group: undefined,
    error: "mt-2 text-meta text-accent-deep",
    hint: "mt-2 text-meta text-primary-muted",
    submitRow: "pt-2",
    submit:
      "inline-flex h-[52px] w-full items-center justify-center bg-primary px-7 text-ui text-white underline-offset-4 transition-colors duration-150 hover:bg-primary-deep hover:underline active:translate-y-px focus-ring disabled:cursor-wait disabled:opacity-60 disabled:no-underline md:w-auto",
    privacy: "max-w-[52ch] text-meta text-primary-muted",
    done: "border-t border-rule pt-8 text-left",
    doneTitle:
      "font-display text-h2 font-normal text-primary [text-wrap:balance]",
    doneText: "mt-4 max-w-[52ch] text-body text-ink",
    doneList: "mt-6",
    doneItemFirst: undefined,
    doneItemLast: "md:mt-2",
    donePhone:
      "inline-flex min-h-[44px] items-center text-ui text-primary underline decoration-1 underline-offset-4 hover:decoration-2 focus-ring md:min-h-0",
    doneEmail:
      "inline-flex min-h-[44px] items-center break-all text-ui text-primary underline decoration-1 underline-offset-4 hover:decoration-2 focus-ring md:min-h-0",
    doneButton:
      "mt-8 inline-flex h-[52px] w-full items-center justify-center bg-primary px-7 text-ui text-white underline-offset-4 transition-colors duration-150 hover:bg-primary-deep hover:underline active:translate-y-px focus-ring md:w-auto",
  },
};

// A small, consistent marker beats an asterisk nobody has a legend for.
function Required({ className }) {
  return (
    <span className={className} aria-hidden="true">
      {" "}
      *
    </span>
  );
}

// `variant` picks the look ("classic" is the default and what production
// renders). `titleId` is an optional id for the form's heading, so a page can
// label its surrounding <section> with it; the success heading takes the same
// id, so the label follows the state.
function ContactForm({ variant = "classic", titleId } = {}) {
  const s = STYLES[variant] || STYLES.classic;
  // The phone hint is tied to its field in the redesign only; the classic
  // markup stays exactly as it was.
  const phoneHintId = variant === "v2" ? "phone-hint" : undefined;

  const router = useRouter();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  // idle | submitting | success | error — one source of truth, so the button,
  // the live region and the panel can never disagree about what happened.
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");

  const { name, email, phone, subject, message } = values;

  // Arriving from a for-sale listing's "Vraag een bezichtiging aan" button.
  // Naming the property back to the visitor is the whole point: the enquiry
  // reaches H16 already identified, so nobody needs the owner's own address
  // published on the page to make contact happen.
  useEffect(() => {
    if (!router.isReady) return;
    const project = router.query.project;
    if (typeof project !== "string" || !project.trim()) return;
    setValues((prev) =>
      prev.subject
        ? prev
        : { ...prev, subject: `Bezichtiging: ${project.trim()}` }
    );
  }, [router.isReady, router.query.project]);

  // Arriving from a service page's contact block (/contact?dienst=<slug>).
  // Only a known slug fills the subject, so the query string cannot put
  // arbitrary text into the form.
  useEffect(() => {
    if (!router.isReady) return;
    const slug = router.query.dienst;
    if (typeof slug !== "string" || !Object.prototype.hasOwnProperty.call(DIENST_META, slug)) return;
    setValues((prev) =>
      prev.subject ? prev : { ...prev, subject: DIENST_META[slug].onderwerp }
    );
  }, [router.isReady, router.query.dienst]);

  const validate = () => {
    const found = {};

    if (!name.trim()) {
      found.name = "Vul uw naam in.";
    }
    if (!email.trim()) {
      found.email = "Vul uw e-mailadres in.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      found.email = "Dit e-mailadres lijkt niet te kloppen. Controleer of er een @ en een punt in staan.";
    }
    if (!message.trim()) {
      found.message = "Vul uw bericht in, zodat we u gericht kunnen antwoorden.";
    }

    setErrors(found);
    return found;
  };

  const handleChange = (e) => {
    const { name: field, value } = e.target;
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear a field's error the moment the visitor starts fixing it, rather
    // than making them submit again to find out whether they got it right.
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "submitting") return; // guard against double-submit

    setServerError("");

    const found = validate();
    const firstInvalid = ["name", "email", "message"].find(
      (field) => found[field]
    );

    if (firstInvalid) {
      setStatus("idle");
      // Move the visitor to the first problem instead of leaving them to hunt.
      // Read the field off the validation result, not off the DOM: the
      // aria-invalid attributes do not exist until React has re-rendered.
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      // A 500 from a crashed handler can return HTML, not JSON — parsing it
      // blind would throw and look identical to being offline.
      let payload = {};
      try {
        payload = await res.json();
      } catch {
        payload = {};
      }

      if (!res.ok || payload.success !== true) {
        // Counted so a broken mail setup shows up in Umami as failures,
        // not as a silent absence of "contact" events.
        trackEvent("contact-mislukt", { status: res.status });
        setStatus("error");
        setServerError(
          payload.message ||
            "We konden uw bericht nu niet versturen. Probeer het opnieuw, of bel ons op +32 474 04 22 79."
        );
        return;
      }

      setStatus("success");
      trackEvent("contact");
      setValues(EMPTY);
    } catch {
      trackEvent("contact-mislukt", { status: 0 });
      setStatus("error");
      setServerError(
        "We konden de server niet bereiken. Controleer uw internetverbinding en probeer opnieuw, of bel ons op +32 474 04 22 79."
      );
    }
  };

  const describedBy = (field) => (errors[field] ? `${field}-error` : undefined);

  if (status === "success") {
    return (
      <div>
        <div>
          <div
            className={s.done}
            role="status"
            aria-live="polite"
          >
            <h2 id={titleId} className={s.doneTitle}>
              Bedankt, uw bericht is verzonden.
            </h2>
            <p className={s.doneText}>
              Gilles of Elena neemt binnen twee werkdagen persoonlijk contact
              met u op. Heeft u het liever meteen? Bel ons gerust.
            </p>
            <ul className={s.doneList}>
              <li className={s.doneItemFirst}>
                <a
                  className={s.donePhone}
                  href="tel:+32474042279"
                >
                  +32 474 04 22 79
                </a>
              </li>
              <li className={s.doneItemLast}>
                <a
                  className={s.doneEmail}
                  href="mailto:info@h16.be"
                >
                  info@h16.be
                </a>
              </li>
            </ul>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className={s.doneButton}
            >
              Nog een bericht sturen
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit}
          noValidate
          className={s.form}
        >
          <h2 id={titleId} className={s.title}>Stuur ons uw vraag</h2>

          {status === "error" && (
            <div
              role="alert"
              className={s.alert}
            >
              {serverError}
            </div>
          )}

          <div className={s.group}>
            <label className={s.label} htmlFor="name">
              Naam
              <Required className={s.required} />
            </label>
            <input
              className={s.field}
              type="text"
              id="name"
              name="name"
              required
              aria-required="true"
              autoComplete="name"
              maxLength={100}
              value={name}
              onChange={handleChange}
              aria-invalid={errors.name ? "true" : undefined}
              aria-describedby={describedBy("name")}
            />
            {errors.name && (
              <p
                id="name-error"
                className={s.error}
              >
                {errors.name}
              </p>
            )}
          </div>

          <div className={s.group}>
            <label className={s.label} htmlFor="email">
              Email
              <Required className={s.required} />
            </label>
            <input
              className={s.field}
              type="email"
              id="email"
              name="email"
              required
              aria-required="true"
              autoComplete="email"
              inputMode="email"
              maxLength={254}
              value={email}
              onChange={handleChange}
              aria-invalid={errors.email ? "true" : undefined}
              aria-describedby={describedBy("email")}
            />
            {errors.email && (
              <p
                id="email-error"
                className={s.error}
              >
                {errors.email}
              </p>
            )}
          </div>

          <div className={s.group}>
            <label className={s.label} htmlFor="phone">
              Telefoon <span className={s.optional}>(optioneel)</span>
            </label>
            <input
              className={s.field}
              type="tel"
              id="phone"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              maxLength={30}
              value={phone}
              onChange={handleChange}
              aria-describedby={phoneHintId}
            />
            <p id={phoneHintId} className={s.hint}>
              Liever gebeld worden? Laat uw nummer achter.
            </p>
          </div>

          <div className={s.group}>
            <label className={s.label} htmlFor="subject">
              Onderwerp <span className={s.optional}>(optioneel)</span>
            </label>
            <input
              className={s.field}
              type="text"
              id="subject"
              name="subject"
              placeholder="Bijvoorbeeld: renovatie woning Oosterzele"
              maxLength={150}
              value={subject}
              onChange={handleChange}
              aria-invalid={errors.subject ? "true" : undefined}
              aria-describedby={describedBy("subject")}
            />
            {errors.subject && (
              <p
                id="subject-error"
                className={s.error}
              >
                {errors.subject}
              </p>
            )}
          </div>

          <div className={s.group}>
            <label className={s.label} htmlFor="message">
              Bericht
              <Required className={s.required} />
            </label>
            <textarea
              className={s.field}
              id="message"
              name="message"
              required
              aria-required="true"
              rows="6"
              maxLength={5000}
              value={message}
              onChange={handleChange}
              aria-invalid={errors.message ? "true" : undefined}
              aria-describedby={describedBy("message")}
            ></textarea>
            {errors.message && (
              <p
                id="message-error"
                className={s.error}
              >
                {errors.message}
              </p>
            )}
          </div>

          <div className={s.submitRow}>
            <button
              type="submit"
              disabled={status === "submitting"}
              aria-busy={status === "submitting"}
              className={s.submit}
            >
              {status === "submitting" ? "Versturen…" : "Verzenden"}
            </button>
          </div>

          <p className={s.privacy}>
            Velden met <span className={s.required}>*</span> zijn
            verplicht. Vrijblijvend en gratis; we gebruiken uw gegevens
            uitsluitend om uw vraag te beantwoorden.
          </p>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
