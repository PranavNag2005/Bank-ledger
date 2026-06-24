import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.Google_REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});



// Function to send email
export const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Your Name" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


export async function sendRegistrationEmail(userEmail, name) {
  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 40px; border-radius: 10px; text-align: center;">

        <h1 style="color: #22c55e; margin-bottom: 10px;">
          Registration Completed
        </h1>

        <h2 style="color: #333;">
          Welcome, ${name}!
        </h2>

        <p style="font-size: 16px; color: #555; line-height: 1.6;">
          Thank you for registering with us. Your account has been created successfully.
        </p>

        <p style="font-size: 16px; color: #555; line-height: 1.6;">
          We're excited to have you as part of our community and look forward to serving you.
        </p>

        <div style="margin: 30px 0;">
          <span
            style="
              background: #dcfce7;
              color: #166534;
              padding: 12px 20px;
              border-radius: 8px;
              font-weight: bold;
            "
          >
            ✓ Account Created Successfully
          </span>
        </div>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />

        <p style="font-size: 13px; color: #888;">
          If you did not create this account, please contact support immediately.
        </p>

      </div>
    </div>
  `;

  await sendEmail(
    userEmail,
    "Registration Successful 🎉",
    `Hi ${name}, your account has been created successfully.`,
    html
  );
}

export async function sendTransactionEmail(){
  
}

