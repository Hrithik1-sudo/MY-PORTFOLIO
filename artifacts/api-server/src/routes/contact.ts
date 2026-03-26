import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";

const router: IRouter = Router();

const CONTACT_TO_EMAIL =
  process.env["CONTACT_TO_EMAIL"] ?? "hparihar2005@gmail.com";

const SMTP_HOST = process.env["SMTP_HOST"];
const SMTP_PORT = Number(process.env["SMTP_PORT"] ?? "587");
const SMTP_SECURE = process.env["SMTP_SECURE"] === "true";
const SMTP_USER = process.env["SMTP_USER"];
const SMTP_PASS = process.env["SMTP_PASS"];
const CONTACT_FROM_EMAIL =
  process.env["CONTACT_FROM_EMAIL"] ?? SMTP_USER ?? CONTACT_TO_EMAIL;

const transporter =
  SMTP_HOST && SMTP_USER && SMTP_PASS
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number.isNaN(SMTP_PORT) ? 587 : SMTP_PORT,
        secure: SMTP_SECURE,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      })
    : null;

router.post("/contact", async (req, res) => {
  const name =
    typeof req.body?.name === "string" ? req.body.name.trim() : "";
  const email =
    typeof req.body?.email === "string" ? req.body.email.trim() : "";
  const message =
    typeof req.body?.message === "string" ? req.body.message.trim() : "";
  const honey =
    typeof req.body?._honey === "string" ? req.body._honey.trim() : "";

  if (honey) {
    return res.status(202).json({ success: true });
  }

  if (!name || name.length < 2) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid name.",
    });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address.",
    });
  }

  if (!message || message.length < 10) {
    return res.status(400).json({
      success: false,
      message: "Please enter a message with at least 10 characters.",
    });
  }

  if (!transporter) {
    req.log.error("SMTP transporter is not configured.");

    return res.status(500).json({
      success: false,
      message:
        "Contact email is not configured on the server yet. Add SMTP credentials and try again.",
    });
  }

  try {
    await transporter.sendMail({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2 style="margin-bottom: 16px;">New portfolio message</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    req.log.error({ err: error }, "Failed to send contact email");

    return res.status(500).json({
      success: false,
      message: "Unable to send your message right now. Please try again shortly.",
    });
  }
});

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export default router;
