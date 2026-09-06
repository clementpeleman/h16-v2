import { trackEvent } from "../shared/Analytics";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const EMPTY = { name: "", email: "", phone: "", subject: "", message: "" };

// Fields share one set of classes so a hardened input and a hardened textarea
// can never drift apart. text-base (16px) is deliberate: iOS Safari force-zooms
// a focused input under 16px, which breaks the layout mid-form.
const fieldClasses =
  "w-full px-5 py-3 rounded-md text-base " +
  "bg-secondary-light text-primary-dark placeholder:text-gray-500 " +
  "border border-gray-400 " +
  "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 " +
  "aria-[invalid=true]:border-accent-deep aria-[invalid=true]:ring-accent-deep/25 " +
  "duration-200";

const labelClasses = "block text-ui text-primary-dark mb-1";

// A small, consistent marker beats an asterisk nobody has a legend for.
function Required() {
  return (
    <span className="text-accent-deep" aria-hidden="true">
      {" "}
      *
    </span>
  );
}

function ContactForm() {
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
            className="max-w-xl text-left border-t-2 border-primary pt-8"
            role="status"
            aria-live="polite"
          >
            <h2 className="text-h2 mb-4 text-primary-dark">
              Bedankt, uw bericht is verzonden.
            </h2>
            <p className="text-body text-ternary-dark mb-6">
              Gilles of Elena neemt binnen twee werkdagen persoonlijk contact
              met u op. Heeft u het liever meteen? Bel ons gerust.
            </p>
            <ul className="text-body mb-8">
              <li className="mb-2">
                <a
                  className="text-primary underline underline-offset-4 decoration-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200"
                  href="tel:+32474042279"
                >
                  +32 474 04 22 79
                </a>
              </li>
              <li>
                <a
                  className="text-primary underline underline-offset-4 decoration-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm break-all duration-200"
                  href="mailto:info@h16.be"
                >
                  info@h16.be
                </a>
              </li>
            </ul>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="text-ui px-7 py-4 bg-primary text-white text-center tracking-wider rounded-lg hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 duration-300"
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
          className="max-w-xl text-left"
        >
          <h2 className="text-h2 mb-8">Stuur ons uw vraag</h2>

          {status === "error" && (
            <div
              role="alert"
              className="mb-6 border-t-2 border-accent-deep bg-ternary-light px-5 py-4 text-body text-accent-deep"
            >
              {serverError}
            </div>
          )}

          <div className="mb-6">
            <label className={labelClasses} htmlFor="name">
              Naam
              <Required />
            </label>
            <input
              className={fieldClasses}
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
                className="mt-1 text-meta text-accent-deep"
              >
                {errors.name}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className={labelClasses} htmlFor="email">
              Email
              <Required />
            </label>
            <input
              className={fieldClasses}
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
                className="mt-1 text-meta text-accent-deep"
              >
                {errors.email}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className={labelClasses} htmlFor="phone">
              Telefoon <span className="text-gray-600">(optioneel)</span>
            </label>
            <input
              className={fieldClasses}
              type="tel"
              id="phone"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              maxLength={30}
              value={phone}
              onChange={handleChange}
            />
            <p className="mt-1 text-meta text-ternary-dark">
              Liever gebeld worden? Laat uw nummer achter.
            </p>
          </div>

          <div className="mb-6">
            <label className={labelClasses} htmlFor="subject">
              Onderwerp <span className="text-gray-600">(optioneel)</span>
            </label>
            <input
              className={fieldClasses}
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
                className="mt-1 text-meta text-accent-deep"
              >
                {errors.subject}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className={labelClasses} htmlFor="message">
              Bericht
              <Required />
            </label>
            <textarea
              className={fieldClasses}
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
                className="mt-1 text-meta text-accent-deep"
              >
                {errors.message}
              </p>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={status === "submitting"}
              aria-busy={status === "submitting"}
              className="text-ui px-7 py-4 text-white text-center tracking-wider bg-primary rounded-lg hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-wait duration-300"
            >
              {status === "submitting" ? "Versturen…" : "Verzenden"}
            </button>
          </div>

          <p className="mt-5 text-meta text-ternary-dark">
            Velden met <span className="text-accent-deep">*</span> zijn
            verplicht. Vrijblijvend en gratis; we gebruiken uw gegevens
            uitsluitend om uw vraag te beantwoorden.
          </p>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
