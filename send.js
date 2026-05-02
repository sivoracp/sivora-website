export async function onRequestPost(context) {
  const formData = await context.request.formData();

  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const location = formData.get("location");
  const details = formData.get("details");

  const message = `
New Quote Request Submitted:

Name: ${name}
Email: ${email}
Phone: ${phone}
Project Location: ${location}

Details:
${details}
`;

  // Send email using MailChannels (Cloudflare built‑in)
  const response = await fetch("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: "sales@sivoracp.com" }],
        },
      ],
      from: {
        email: "noreply@sivoracp.com",
        name: "Sivora Website",
      },
      subject: "New Quote Request from Sivora Website",
      content: [
        {
          type: "text/plain",
          value: message,
        },
      ],
    }),
  });

  if (response.ok) {
    return Response.redirect("/thankyou.html", 302);
  } else {
    return new Response("Error sending message", { status: 500 });
  }
}
