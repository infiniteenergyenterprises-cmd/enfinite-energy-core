import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { leadEmail, leadName } = await req.json();

    if (!leadEmail) {
      return NextResponse.json({ success: false, message: 'Lead has no email address.' }, { status: 400 });
    }

    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
      return NextResponse.json({ success: false, message: 'SMTP credentials missing in Vercel.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const subject = `Your Registration is Approved - Welcome to Enfinite Energy`;
    
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #0A192F;">Registration Approved!</h2>
      <p>Dear ${leadName || 'Customer'},</p>
      <p>We are thrilled to inform you that your registration with <strong>Enfinite Energy</strong> has been successfully approved by our administrative team.</p>
      <p>Our solar experts are currently reviewing your specific requirements and will be reaching out to you shortly to discuss the next steps, including your free site survey and savings estimation.</p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #F59E0B;">Next Steps:</h3>
        <ul style="margin-bottom: 0;">
          <li>Expect a call from our technical team within 24 hours.</li>
          <li>Keep your recent electricity bills handy.</li>
          <li>Ensure roof access is available for the site survey.</li>
        </ul>
      </div>
      <p>If you have any immediate questions, feel free to reply to this email or call our support line.</p>
      <p>Welcome to the clean energy revolution!</p>
      <br/>
      <p>Best Regards,</p>
      <p><strong>The Enfinite Energy Team</strong></p>
      <a href="https://enfinite-energy.com" style="color: #F59E0B;">www.enfinite-energy.com</a>
    </div>
    `;

    await transporter.sendMail({
      from: `"Enfinite Energy" <${process.env.SMTP_EMAIL}>`,
      to: leadEmail,
      subject,
      html,
    });

    return NextResponse.json({ success: true, message: 'Email sent successfully via Vercel' });

  } catch (error: any) {
    console.error('Error in Vercel email route:', error);
    return NextResponse.json({ success: false, message: error.message || 'Unknown email error' }, { status: 500 });
  }
}
