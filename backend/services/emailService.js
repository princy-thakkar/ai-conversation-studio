// Email Service
// Handles email notifications and communications via Gmail SMTP (nodemailer).
// Chosen over Resend's free sandbox mode because Gmail SMTP can deliver to
// ANY recipient, not just the account owner's own email address.

const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.user = process.env.GMAIL_USER;
    this.appPassword = process.env.GMAIL_APP_PASSWORD;

    this.transporter = this.user && this.appPassword
      ? nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: this.user,
            pass: this.appPassword,
          },
        })
      : null;
  }

  async initialize() {
    console.log(
      this.transporter
        ? `Email Service initialized (Gmail SMTP live — sending as ${this.user})`
        : 'Email Service initialized (mock mode — no GMAIL_USER/GMAIL_APP_PASSWORD set)'
    );
  }

  async sendEmail({ to, subject, html, text }) {
    if (!this.transporter) {
      console.log(`[MOCK EMAIL] To: ${to} | Subject: ${subject}`);
      return { success: true, mocked: true };
    }

    try {
      const info = await this.transporter.sendMail({
        from: `"AI Conversation Studio" <${this.user}>`,
        to,
        subject,
        html,
        text,
      });
      return { success: true, id: info.messageId };
    } catch (err) {
      console.error('Failed to send email via Gmail SMTP:', err.message);
      return { success: false, error: err.message };
    }
  }

  async sendOTPEmail(user, otp) {
    return this.sendEmail({
      to: user.email,
      subject: 'Your AI Conversation Studio verification code',
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2>Password Reset Verification</h2>
          <p>Hi ${user.firstName || ''},</p>
          <p>Use the following code to verify your identity and reset your password:</p>
          <p style="font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 24px 0;">${otp}</p>
          <p>This code expires in 10 minutes. If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
      text: `Your verification code is ${otp}. It expires in 10 minutes.`,
    });
  }

  async sendPasswordResetEmail(user, resetToken) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    return this.sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
    });
  }

  async sendInvitationEmail(email, inviteToken) {
    const inviteUrl = `${process.env.FRONTEND_URL}/accept-invite?token=${inviteToken}`;
    return this.sendEmail({
      to: email,
      subject: 'You have been invited to AI Conversation Studio',
      html: `<p>Click <a href="${inviteUrl}">here</a> to accept your invitation.</p>`,
    });
  }

  async sendWeeklyReport(user, report) {
    return this.sendEmail({
      to: user.email,
      subject: 'Your Weekly AI Studio Report',
      html: `<p>Here's your weekly summary...</p>`,
    });
  }
}

module.exports = new EmailService();