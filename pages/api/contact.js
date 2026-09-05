import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.NEXT_PUBLIC_SG_API_KEY);

const TO_EMAIL = process.env.NEXT_PUBLIC_TO_EMAIL ?? "default@gmail.com";
const FROM_EMAIL = process.env.NEXT_PUBLIC_FROM_EMAIL ?? "default@gmail.com";

const LIMITS = { name: 100, email: 254, phone: 30, subject: 150, message: 5000 };

// Everything below is visitor-supplied and ends up inside an HTML email.
// Escaping is not optional here: without it, a message containing markup is
// injected straight into the mail we send ourselves.
function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// A newline in a header lets a sender inject extra headers. Subjects are the
// usual way in, so collapse all whitespace before it reaches SendGrid.
function sanitizeHeader(value) {
  return String(value ?? "").replace(/[\r\n]+/g, " ").trim();
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      success: false,
      message: "Deze aanvraag wordt niet ondersteund.",
    });
  }

  const body = typeof req.body === "object" && req.body !== null ? req.body : {};
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();

  // The client validates too, but the client is not the only caller.
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Niet alle velden zijn ingevuld. Vul ze aan en verstuur opnieuw.",
    });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Dit e-mailadres lijkt niet te kloppen. Controleer het en probeer opnieuw.",
    });
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    phone.length > LIMITS.phone ||
    subject.length > LIMITS.subject ||
    message.length > LIMITS.message
  ) {
    return res.status(400).json({
      success: false,
      message: "Uw bericht is te lang. Kort het in en probeer opnieuw.",
    });
  }

  const msg = {
    to: TO_EMAIL,
    from: FROM_EMAIL,
    replyTo: email,
    subject: `H16 contactformulier — ${sanitizeHeader(subject || name)}`,
    text: `Naam: ${name}\nEmail: ${email}\nTelefoon: ${phone || "-"}\nOnderwerp: ${subject || "-"}\n\n${message}`,
    html: `<p><strong>Naam: </strong>${escapeHtml(name)}</p>
             <p><strong>Email: </strong>${escapeHtml(email)}</p>
             <p><strong>Telefoon: </strong>${escapeHtml(phone || "-")}</p>
             <p><strong>Onderwerp: </strong>${escapeHtml(subject || "-")}</p>
             <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("contact form send failed", error);
    return res.status(500).json({
      success: false,
      message:
        "We konden uw bericht nu niet versturen. Probeer het opnieuw, of bel ons op +32 474 04 22 79.",
    });
  }
}
