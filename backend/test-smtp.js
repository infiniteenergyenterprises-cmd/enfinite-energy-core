const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'infiniteenergyenterprises@gmail.com',
    pass: 'zzuv yvyj fslt zzwr', // with spaces
  },
});

async function main() {
  try {
    await transporter.verify();
    console.log('✅ SMTP connection successful!');
  } catch (err) {
    console.error('❌ SMTP verification failed:', err.message);
  }
}
main();
