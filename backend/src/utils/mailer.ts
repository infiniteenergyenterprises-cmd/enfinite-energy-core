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
  email?: string | null;
  phone?: string | null;
  message?: string | null;
  type?: string | null;
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

export const sendUserEventConfirmation = async (lead: LeadData): Promise<boolean> => {
  if (!lead.email || !process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    return false;
  }

  const subject = `Registration Successful - ${lead.message?.split(':')[1]?.split('(')[0]?.trim() || 'Enfinite Energy Event'}`;
  
  const html = `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#F3F4F6;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
      <tr>
        <td style="background:#0B1E3D;padding:28px 32px;">
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800;">Event Registration Confirmed</h1>
        </td>
      </tr>
      <tr><td style="background:linear-gradient(90deg,#F5A623,#F97316);height:4px;"></td></tr>
      <tr>
        <td style="padding:28px 32px;">
          <p style="margin:0 0 16px;color:#374151;font-size:16px;">Dear <strong>${lead.name}</strong>,</p>
          <p style="margin:0 0 20px;color:#374151;font-size:14px;line-height:1.6;">
            Thank you for registering for our event: <strong>${lead.message?.split(':')[1]?.trim() || 'Solar Event'}</strong>. 
            Your registration has been successfully received by our team.
          </p>
          <p style="margin:0 0 20px;color:#374151;font-size:14px;line-height:1.6;">
            We are excited to host you. One of our representatives may reach out to you shortly with further details.
          </p>
          <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">Best Regards,<br><strong>Enfinite Energy Team</strong></p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from: `"Enfinite Energy" <${process.env.SMTP_EMAIL}>`,
      to: lead.email,
      subject,
      html,
    });
    console.log(`✅ User Event Confirmation sent → ${lead.email}`);
    return true;
  } catch (err) {
    console.error('❌ User Email failed:', err);
    return false;
  }
};

export const sendUserSurveyConfirmation = async (lead: LeadData): Promise<boolean> => {
  if (!lead.email || !process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    return false;
  }

  const subject = `Free Site Survey Request Received - Enfinite Energy`;
  
  const html = `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#F3F4F6;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
      <tr>
        <td style="background:#0B1E3D;padding:28px 32px;">
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800;">Site Survey Request Confirmed</h1>
        </td>
      </tr>
      <tr><td style="background:linear-gradient(90deg,#F5A623,#F97316);height:4px;"></td></tr>
      <tr>
        <td style="padding:28px 32px;">
          <p style="margin:0 0 16px;color:#374151;font-size:16px;">Dear <strong>${lead.name}</strong>,</p>
          <p style="margin:0 0 20px;color:#374151;font-size:14px;line-height:1.6;">
            Thank you for taking the first step towards solar savings! We have received your request for a <strong>Free Site Survey</strong>.
          </p>
          <p style="margin:0 0 20px;color:#374151;font-size:14px;line-height:1.6;">
            Our expert team is reviewing your details and will contact you at <strong>${lead.phone}</strong> shortly to schedule a convenient time for the survey.
          </p>
          <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">Best Regards,<br><strong>Enfinite Energy Team</strong></p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from: `"Enfinite Energy" <${process.env.SMTP_EMAIL}>`,
      to: lead.email,
      subject,
      html,
    });
    console.log(`✅ User Survey Confirmation sent → ${lead.email}`);
    return true;
  } catch (err) {
    console.error('❌ User Email failed:', err);
    return false;
  }
};

export const sendUserGeneralConfirmation = async (lead: LeadData): Promise<boolean> => {
  if (!lead.email || !process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    return false;
  }

  const meta = getMeta(lead.type);
  const subject = `Thank you for contacting Enfinite Energy`;
  
  const html = `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#F3F4F6;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
      <tr>
        <td style="background:#0B1E3D;padding:28px 32px;">
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800;">We've Received Your Inquiry</h1>
        </td>
      </tr>
      <tr><td style="background:linear-gradient(90deg,#F5A623,#F97316);height:4px;"></td></tr>
      <tr>
        <td style="padding:28px 32px;">
          <p style="margin:0 0 16px;color:#374151;font-size:16px;">Dear <strong>${lead.name}</strong>,</p>
          <p style="margin:0 0 20px;color:#374151;font-size:14px;line-height:1.6;">
            Thank you for visiting Enfinite Energy and submitting a request for <strong>${meta.label}</strong>. 
            We have successfully received your details.
          </p>
          <p style="margin:0 0 20px;color:#374151;font-size:14px;line-height:1.6;">
            Our dedicated support team is reviewing your inquiry and will reach out to you shortly at <strong>${lead.phone || lead.email}</strong> to assist you further.
          </p>
          <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">Warm Regards,<br><strong>Support Team, Enfinite Energy</strong></p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from: `"Enfinite Energy Support" <${process.env.SMTP_EMAIL}>`,
      to: lead.email,
      subject,
      html,
    });
    console.log(`✅ User General Confirmation sent → ${lead.email}`);
    return true;
  } catch (err) {
    console.error('❌ User Email failed:', err);
    return false;
  }
};

export const sendAdminAIConfirmation = async (lead: LeadData): Promise<boolean> => {
  if (!lead.email || !process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    return false;
  }

  const subject = `Your Registration is Approved - Welcome to Enfinite Energy`;
  
  const html = `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#F3F4F6;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
      <tr>
        <td style="background:#0B1E3D;padding:28px 32px;text-align:center;">
          <h1 style="margin:0;color:#fff;font-size:24px;font-weight:800;">Registration Approved</h1>
          <p style="margin:8px 0 0;color:#F5A623;font-size:13px;letter-spacing:1px;text-transform:uppercase;">Official Confirmation</p>
        </td>
      </tr>
      <tr><td style="background:linear-gradient(90deg,#10B981,#34D399);height:4px;"></td></tr>
      <tr>
        <td style="padding:32px;">
          <p style="margin:0 0 16px;color:#1F2937;font-size:16px;">Hello <strong>${lead.name}</strong>,</p>
          <p style="margin:0 0 20px;color:#4B5563;font-size:15px;line-height:1.7;">
            We have reviewed your registration for <strong>${lead.message?.split(':')[1]?.trim() || 'the upcoming event'}</strong> and are thrilled to officially approve your attendance!
          </p>
          <div style="background:#F3F4F6;border-radius:8px;padding:20px;margin-bottom:24px;border-left:4px solid #F5A623;">
            <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#374151;text-transform:uppercase;">Registration Details</p>
            <p style="margin:0 0 4px;font-size:14px;color:#4B5563;"><strong>Name:</strong> ${lead.name}</p>
            <p style="margin:0 0 4px;font-size:14px;color:#4B5563;"><strong>Status:</strong> <span style="color:#10B981;font-weight:bold;">Approved ✅</span></p>
          </div>
          <p style="margin:0 0 24px;color:#4B5563;font-size:15px;line-height:1.7;">
            Please keep this email handy. We look forward to meeting you and discussing the future of smart solar solutions together.
          </p>
          <p style="margin:0;color:#1F2937;font-size:15px;line-height:1.6;">Warm regards,<br><strong>Admin Team, Enfinite Energy</strong></p>
        </td>
      </tr>
      <tr>
        <td style="background:#F9FAFB;border-top:1px solid #E5E7EB;padding:20px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#9CA3AF;">This is an automated AI-assisted confirmation email.</p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from: `"Enfinite Energy Admin" <${process.env.SMTP_EMAIL}>`,
      to: lead.email,
      subject,
      html,
    });
    console.log(`✅ Admin AI Confirmation sent → ${lead.email}`);
    return true;
  } catch (err) {
    console.error('❌ Admin AI Email failed:', err);
    return false;
  }
};

