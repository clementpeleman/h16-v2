// Contact form mail, sent through ZeptoMail (Zoho, EU region). Server-only:
// the token is read at runtime from ZEPTOMAIL_TOKEN and never reaches the client.
const ZEPTOMAIL_URL = process.env.ZEPTOMAIL_API_URL ?? "https://api.zeptomail.eu/v1.1/email";
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "info@h16.be";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "noreply@h16.be";

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
// usual way in, so collapse all whitespace before it reaches ZeptoMail.
function sanitizeHeader(value) {
  return String(value ?? "").replace(/[\r\n]+/g, " ").trim();
}

// ZeptoMail shows the token with its "Zoho-enczapikey " prefix. Accept it with
// or without, so a copy-paste mistake does not turn into a 401.
function authorizationHeader() {
  const token = (process.env.ZEPTOMAIL_TOKEN ?? "").trim();
  if (!token) throw new Error("ZEPTOMAIL_TOKEN is not set");
  return token.startsWith("Zoho-enczapikey ") ? token : `Zoho-enczapikey ${token}`;
}

async function sendMail({ subject, text, html, replyTo }) {
  const response = await fetch(ZEPTOMAIL_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: authorizationHeader(),
    },
    body: JSON.stringify({
      from: { address: FROM_EMAIL, name: "H16 website" },
      to: [{ email_address: { address: TO_EMAIL, name: "H16" } }],
      reply_to: [{ address: replyTo.address, name: replyTo.name }],
      subject,
      textbody: text,
      htmlbody: html,
    }),
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    // Status only: the response body and the request headers are not logged.
    throw new Error(`ZeptoMail responded ${response.status}`);
  }
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

  const mail = {
    subject: `H16 contactformulier — ${sanitizeHeader(subject || name)}`,
    replyTo: { address: email, name: sanitizeHeader(name) },
    text: `Naam: ${name}\nEmail: ${email}\nTelefoon: ${phone || "-"}\nOnderwerp: ${subject || "-"}\n\n${message}`,
    html: `<p><strong>Naam: </strong>${escapeHtml(name)}</p>
             <p><strong>Email: </strong>${escapeHtml(email)}</p>
             <p><strong>Telefoon: </strong>${escapeHtml(phone || "-")}</p>
             <p><strong>Onderwerp: </strong>${escapeHtml(subject || "-")}</p>
             <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
  };

  try {
    await sendMail(mail);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("contact form send failed:", error.message);
    return res.status(500).json({
      success: false,
      message:
        "We konden uw bericht nu niet versturen. Probeer het opnieuw, of bel ons op +32 474 04 22 79.",
    });
  }
}
