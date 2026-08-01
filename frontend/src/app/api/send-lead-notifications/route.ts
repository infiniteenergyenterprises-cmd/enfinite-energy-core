import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { lead } = await req.json();

    if (!lead || !lead.email) {
      return NextResponse.json({ success: false, message: 'Invalid lead data.' }, { status: 400 });
    }

    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
      return NextResponse.json({ success: false, message: 'SMTP credentials missing.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // 1. Send Admin Notification
    const adminHtml = `
      <h3>New Lead Received</h3>
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Phone:</strong> ${lead.phone}</p>
      <p><strong>Type:</strong> ${lead.type}</p>
      <p><strong>Message:</strong> ${lead.message || 'N/A'}</p>
    `;
    
    await transporter.sendMail({
      from: `"Enfinite Energy System" <${process.env.SMTP_EMAIL}>`,
      to: process.env.SMTP_EMAIL, // Send to company email
      subject: `New Lead: ${lead.name} (${lead.type})`,
      html: adminHtml,
    });

    // 2. Send User Notification
    let userSubject = 'Thank you for contacting Enfinite Energy!';
    let userHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #0A192F;">Thank You for Reaching Out!</h2>
        <p>Dear ${lead.name},</p>
        <p>We have successfully received your inquiry regarding <strong>${lead.type}</strong>.</p>
        <p>Our team of solar experts is reviewing your details and will get back to you shortly.</p>
        <br/>
        <p>Best Regards,</p>
        <p><strong>The Enfinite Energy Team</strong></p>
      </div>
    `;

    if (lead.type === 'EVENT_REGISTRATION') {
      userSubject = 'Event Registration Successful - Enfinite Energy';
      userHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #0A192F;">Registration Successful!</h2>
          <p>Dear ${lead.name},</p>
          <p>Your registration has been successfully recorded. We will send you more details about the event soon.</p>
          <p>Thank you for joining the clean energy revolution.</p>
          <br/>
          <p>Best Regards,</p>
          <p><strong>The Enfinite Energy Team</strong></p>
        </div>
      `;
    }

    await transporter.sendMail({
      from: `"Enfinite Energy" <${process.env.SMTP_EMAIL}>`,
      to: lead.email,
      subject: userSubject,
      html: userHtml,
    });

    return NextResponse.json({ success: true, message: 'Notifications sent successfully.' });
  } catch (error: any) {
    console.error('Error sending lead notifications:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
