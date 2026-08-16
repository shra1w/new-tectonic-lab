// src/lib/mailer.js
//
// Two emails per submission:
//   1. Admin notification — full lead payload, dark themed to match brand.
//   2. User confirmation — light themed for maximum email-client compat,
//      warm and reassuring, sets the 4-business-hour callback expectation.
//
// Both are sent in parallel. Failures are logged and swallowed at the API
// layer so a mail hiccup never blocks a lead from being saved.

import "server-only";
import nodemailer from "nodemailer";

const BRAND = {
  name: "Techtonic Lab",
  acid: "#EAFD56",
  ink: "#0A0A0B",
  phone: "+91 87660 69947",
  siteUrl: "https://techtoniclab.com",
  address: "Somalwada & Jaitala Road, Nagpur, Maharashtra",
};

let cachedTransport = null;

function getTransport() {
  if (cachedTransport) return cachedTransport;

  const user = process.env.SMTP_EMAIL;
  const pass = process.env.SMTP_PASSWORD;

  if (!user || !pass) {
    throw new Error("SMTP env vars missing — set SMTP_EMAIL and SMTP_PASSWORD");
  }

  cachedTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: { user, pass },
  });
  return cachedTransport;
}

function esc(v) {
  if (v == null) return "";
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─── Admin notification template ──────────────────────────────────────
function adminEmailHtml(lead) {
  const fullName = `${lead.firstName} ${lead.lastName}`.trim();
  const utmRows = [
    ["Source", lead.utm_source],
    ["Medium", lead.utm_medium],
    ["Campaign", lead.utm_campaign],
    ["Term", lead.utm_term],
    ["Content", lead.utm_content],
    ["GCLID", lead.gclid],
    ["Landing page", lead.landing_page],
    ["Referrer", lead.referrer],
  ].filter(([, v]) => v);

  const utmBlock = utmRows.length
    ? `
      <tr><td style="padding:24px 32px 8px;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#71717a;">Attribution</td></tr>
      <tr><td style="padding:0 32px 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #27272a;border-radius:12px;background:#0f0f10;">
          ${utmRows
            .map(
              ([k, v], i) => `
            <tr>
              <td style="padding:12px 16px;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#71717a;${i > 0 ? "border-top:1px solid #1f1f22;" : ""}">${esc(k)}</td>
              <td style="padding:12px 16px;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#e4e4e7;text-align:right;${i > 0 ? "border-top:1px solid #1f1f22;" : ""}">${esc(v)}</td>
            </tr>`
            )
            .join("")}
        </table>
      </td></tr>`
    : "";

  return `
<!doctype html>
<html>
<body style="margin:0;padding:0;background:#050506;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#050506;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:${BRAND.ink};border:1px solid #1f1f22;border-radius:20px;overflow:hidden;">

        <tr><td style="padding:32px 32px 0;">
          <div style="display:inline-block;padding:4px 10px;border:1px solid ${BRAND.acid}55;border-radius:999px;background:${BRAND.acid}18;color:${BRAND.acid};font-family:Helvetica,Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;">New lead</div>
          <h1 style="margin:16px 0 4px;font-family:Georgia,serif;font-size:26px;color:#fafafa;font-weight:600;">${esc(fullName)}</h1>
          <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#a1a1aa;">Interested in <strong style="color:${BRAND.acid};">${esc(lead.course)}</strong></p>
        </td></tr>

        <tr><td style="padding:24px 32px 8px;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#71717a;">Contact</td></tr>
        <tr><td style="padding:0 32px 8px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #27272a;border-radius:12px;background:#0f0f10;">
            <tr>
              <td style="padding:14px 16px;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#71717a;">Email</td>
              <td style="padding:14px 16px;text-align:right;">
                <a href="mailto:${esc(lead.email)}" style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:${BRAND.acid};text-decoration:none;">${esc(lead.email)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 16px;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#71717a;border-top:1px solid #1f1f22;">Mobile</td>
              <td style="padding:14px 16px;text-align:right;border-top:1px solid #1f1f22;">
                <a href="tel:+91${esc(lead.mobile)}" style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:${BRAND.acid};text-decoration:none;">+91 ${esc(lead.mobile)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 16px;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#71717a;border-top:1px solid #1f1f22;">WhatsApp</td>
              <td style="padding:14px 16px;text-align:right;border-top:1px solid #1f1f22;">
                <a href="https://wa.me/91${esc(lead.mobile)}" style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:${BRAND.acid};text-decoration:none;">Open chat &rarr;</a>
              </td>
            </tr>
          </table>
        </td></tr>

        ${
          lead.message
            ? `
        <tr><td style="padding:24px 32px 8px;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#71717a;">Message</td></tr>
        <tr><td style="padding:0 32px 8px;">
          <div style="padding:16px;border:1px solid #27272a;border-radius:12px;background:#0f0f10;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.6;color:#d4d4d8;white-space:pre-wrap;">${esc(lead.message)}</div>
        </td></tr>`
            : ""
        }

        ${utmBlock}

        <tr><td style="padding:24px 32px 32px;border-top:1px solid #1f1f22;">
          <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:11px;color:#52525b;">
            Submitted ${esc(new Date(lead.submittedAt || Date.now()).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }))} IST · Source ${esc(lead.source || "website")}
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── User confirmation template ───────────────────────────────────────
function userEmailHtml(lead) {
  const first = esc(lead.firstName);
  return `
<!doctype html>
<html>
<body style="margin:0;padding:0;background:#f5f5f4;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f4;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">

        <tr><td style="padding:0;">
          <div style="background:${BRAND.ink};padding:32px;text-align:center;">
            <div style="display:inline-block;padding:6px 14px;background:${BRAND.acid};border-radius:999px;font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${BRAND.ink};">Request received</div>
            <h1 style="margin:20px 0 0;font-family:Georgia,serif;font-size:28px;color:#fafafa;font-weight:600;line-height:1.25;">Thanks, ${first} — we've got your enquiry.</h1>
          </div>
        </td></tr>

        <tr><td style="padding:36px 40px 8px;">
          <p style="margin:0 0 16px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#27272a;">
            One of our counsellors will call you within <strong>4 business hours</strong> (Monday to Saturday, 10 AM – 7 PM IST) to talk through the <strong>${esc(lead.course)}</strong> course, answer your questions, and help you decide if it's the right fit.
          </p>
          <p style="margin:0 0 16px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#27272a;">
            No pressure, no scripted sell — just a conversation. If a different course suits your background better, we'll say so.
          </p>
        </td></tr>

        <tr><td style="padding:16px 40px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e7e5e4;border-radius:14px;background:#fafaf9;">
            <tr><td style="padding:20px 24px;">
              <p style="margin:0 0 4px;font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#78716c;">Want to reach us sooner?</p>
              <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#292524;line-height:1.7;">
                Call <a href="tel:${BRAND.phone.replace(/\s/g, "")}" style="color:#292524;font-weight:600;text-decoration:none;border-bottom:2px solid ${BRAND.acid};">${BRAND.phone}</a><br/>
                WhatsApp <a href="https://wa.me/${BRAND.phone.replace(/\D/g, "")}" style="color:#292524;font-weight:600;text-decoration:none;border-bottom:2px solid ${BRAND.acid};">the same number</a>
              </p>
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="padding:24px 40px 8px;">
          <p style="margin:0 0 12px;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#78716c;">While you wait</p>
          <ul style="margin:0;padding:0 0 0 20px;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.9;color:#27272a;">
            <li>Browse the <a href="${BRAND.siteUrl}/batches" style="color:#292524;border-bottom:1px solid ${BRAND.acid};text-decoration:none;">upcoming batch schedule</a></li>
            <li>See <a href="${BRAND.siteUrl}/placements" style="color:#292524;border-bottom:1px solid ${BRAND.acid};text-decoration:none;">alumni we've placed</a></li>
            <li>Check the <a href="${BRAND.siteUrl}/fees" style="color:#292524;border-bottom:1px solid ${BRAND.acid};text-decoration:none;">published fees</a> — no surprises later</li>
          </ul>
        </td></tr>

        <tr><td style="padding:32px 40px 36px;">
          <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:#44403c;">
            Warm regards,<br/>
            <strong style="color:#292524;">The Techtonic Lab team</strong>
          </p>
        </td></tr>

        <tr><td style="padding:20px 40px;background:#fafaf9;border-top:1px solid #e7e5e4;text-align:center;">
          <p style="margin:0 0 4px;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#57534e;">
            ${BRAND.name} · ${BRAND.address}
          </p>
          <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:11px;color:#a8a29e;">
            You're receiving this because you submitted the consultation form at techtoniclab.com.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Public API ───────────────────────────────────────────────────────
export async function sendLeadEmails(lead) {
  const transport = getTransport();
  const from = process.env.EMAIL_FROM || process.env.SMTP_EMAIL;
  const adminTo = process.env.EMAIL_SEND_TO || process.env.SMTP_EMAIL;
  const fullName = `${lead.firstName} ${lead.lastName}`.trim();

  const results = await Promise.allSettled([
    // Admin notification
    transport.sendMail({
      from,
      to: adminTo,
      replyTo: lead.email,
      subject: `New lead — ${fullName} · ${lead.course}`,
      html: adminEmailHtml(lead),
    }),

    // User confirmation
    transport.sendMail({
      from,
      to: lead.email,
      subject: `We've received your request — ${BRAND.name}`,
      html: userEmailHtml(lead),
    }),
  ]);

  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`[mailer] ${i === 0 ? "admin" : "user"} email failed:`, r.reason);
    }
  });

  return {
    admin: results[0].status === "fulfilled",
    user: results[1].status === "fulfilled",
  };
}