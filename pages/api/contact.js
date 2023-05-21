const sgMail = require("@sendgrid/mail");

const { NEXT_PUBLIC_SG_API_KEY, NEXT_PUBLIC_FROM_EMAIL, NEXT_PUBLIC_TO_EMAIL } = process.env;
sgMail.setApiKey(NEXT_PUBLIC_SG_API_KEY);
console.log(process.env.NEXT_PUBLIC_SG_API_KEY)

export default async function handler(req, res) {
  const { name, email, subject, message } = req.body;
  const msg = {
    to: NEXT_PUBLIC_TO_EMAIL, // Change to your recipient
    from: NEXT_PUBLIC_FROM_EMAIL, // Change to your verified sender
    subject: "H16 Contact Formulier",
    html: `<p><strong>Naam: </strong>${name}</p>
    <p><strong>Email: </strong>${email}</p>   
    <p><strong>Onderwerp: </strong>${subject}</p>    
    <p>${message}</p>`,
  };
  await sgMail.send(msg);
  console.log("email sent");
  res.status(200).json({ success: true });
  if (error) {
    console.log(error);
    } else {
    res.send(`<script>alert("Email Sent Successfully.")</script>`);
    console.log("email sent: " + info);
}
}