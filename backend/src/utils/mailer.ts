import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL || '',
    pass: process.env.SMTP_PASSWORD || '',
  },
});

export interface LeadData {
  name: string;
  email?: string;
  phone?: string;
  message?: string;
  type?: string;
}

// ── Type labels & colors ──────────────────────────────────────────────────────
const TYPE_META: Record<string, { label: string; color: string; emoji: string }> = {
  CONTACT:      { label: 'Contact Form',        color: '#3B82F6', emoji: '📬' },
  CONSULTATION: { label: 'Free Consultation',   color: '#F59E0B', emoji: '☎️' },
  SURVEY:       { label: 'Free Site Survey',    color: '#10B981', emoji: '🏠' },
  QUOTE:        { label: 'Quote Request',        color: '#8B5CF6', emoji: '📋' },
  NEWSLETTER:   { label: 'Newsletter Subscribe', color: '#EC4899', emoji: '📰' },
  CAREER:       { label: 'Career Application',  color: '#6366F1', emoji: '💼' },
  EVENT:        { label: 'Event Registration',  color: '#EF4444', emoji: '🎟️' },
  CALLBACK:     { label: 'Callback Request',    color: '#F97316', emoji: '📞' },
  SUBSIDY:      { label: 'Subsidy Enquiry',     color: '#14B8A6', emoji: '🏛️' },
};

function getMeta(type = 'CONTACT') {
  return TYPE_META[type.toUpperCase()] ?? TYPE_META['CONTACT'];
}

function row(label: string, value: string) {
  if (!value || value === 'N/A') return '';
  return `
    <tr>
      <td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;font-weight:600;color:#374151;width:130px;font-size:13px;">${label}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;color:#555;font-size:13px;">${value}</td>
    </tr>`;
}

function buildHtml(lead: LeadData): string {
  const meta = getMeta(lead.type);
  const now = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F3F4F6;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F3F4F6;padding:30px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

      <!-- Header -->
      <tr>
        <td style="background:#0B1E3D;padding:28px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <p style="margin:0;color:#F5A623;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Enfinite Energy Pvt. Ltd.</p>
                <h1 style="margin:6px 0 0;color:#fff;font-size:22px;font-weight:800;">New Lead Notification</h1>
              </td>
              <td align="right">
                <span style="background:${meta.color};color:#fff;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:700;">${meta.emoji} ${meta.label}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Amber accent bar -->
      <tr><td style="background:linear-gradient(90deg,#F5A623,#F97316);height:4px;"></td></tr>

      <!-- Body -->
      <tr>
        <td style="padding:28px 32px;">
          <p style="margin:0 0 20px;color:#374151;font-size:14px;line-height:1.6;">
            Hello Admin 👋 — a new user has submitted their details on the <strong>Enfinite Energy</strong> website. Here are their details:
          </p>

          <!-- Lead Details Table -->
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;margin-bottom:24px;">
            ${row('👤 Name', lead.name || 'N/A')}
            ${row('📧 Email', lead.email || 'N/A')}
            ${row('📱 Phone', lead.phone ? `+91 ${lead.phone}` : 'N/A')}
            ${row('🏷️ Type', meta.label)}
            ${row('🕐 Received', now)}
            ${lead.message ? row('💬 Message', lead.message) : ''}
          </table>

          <!-- Action Buttons -->
          <table cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr>
              <td style="padding-right:12px;">
                <a href="tel:+91${lead.phone?.replace(/\D/g, '')}" style="background:#0B1E3D;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:13px;font-weight:700;display:inline-block;">📞 Call Now</a>
              </td>
              ${lead.email ? `<td>
                <a href="mailto:${lead.email}" style="background:#F5A623;color:#0B1E3D;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:13px;font-weight:700;display:inline-block;">✉️ Reply via Email</a>
              </td>` : ''}
            </tr>
          </table>

          <!-- Admin Portal Link -->
          <div style="background:#F8FAFC;border:1px solid #e5e7eb;border-radius:10px;padding:16px 20px;">
            <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#374151;">📊 View in Admin Portal</p>
            <p style="margin:0;font-size:12px;color:#6B7280;">All leads are saved in your admin panel under <strong>Lead Management</strong>.</p>
          </div>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#F9FAFB;border-top:1px solid #e5e7eb;padding:18px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <p style="margin:0;font-size:11px;color:#9CA3AF;">This is an automated notification from <strong>Enfinite Energy</strong> website.</p>
                <p style="margin:4px 0 0;font-size:11px;color:#9CA3AF;">+91 74800 18007 | enfiniteenergy.com</p>
              </td>
              <td align="right">
                <p style="margin:0;font-size:11px;color:#9CA3AF;">IST ${now}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

export const sendAdminNotification = async (lead: LeadData): Promise<boolean> => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_EMAIL;

  if (!adminEmail || !process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    console.warn('⚠️  SMTP not configured — skipping email.');
    return false;
  }

  const meta = getMeta(lead.type);
  const subject = `${meta.emoji} New ${meta.label}: ${lead.name || 'Unknown'} — Enfinite Energy`;

  try {
    await transporter.sendMail({
      from: `"Enfinite Energy Alerts" <${process.env.SMTP_EMAIL}>`,
      to: adminEmail,
      subject,
      html: buildHtml(lead),
    });
    console.log(`✅ Email sent → ${adminEmail} | Type: ${meta.label} | Lead: ${lead.name}`);
    return true;
  } catch (err) {
    console.error('❌ Email failed:', err);
    return false;
  }
};
