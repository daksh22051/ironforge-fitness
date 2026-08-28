const nodemailer = require('nodemailer');

// Initialize Transporter using environment variables or fallback
function createTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = (process.env.SMTP_USER || 'dakshkhamar22@gmail.com').trim();
  const rawPass = process.env.SMTP_PASS || 'yodmduorwcetblsm';
  const pass = rawPass.replace(/\s+/g, '').trim();

  if (user && pass) {
    return nodemailer.createTransport({
      host: host,
      port: port,
      secure: port === 465,
      auth: {
        user: user,
        pass: pass
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  return null;
}

/**
 * Generate 7-Day Free Trial Pass HTML Email
 */
function generateTrialEmailHtml({ name, leadId, goal, preferredTime, phone }) {
  const now = new Date();
  const startDateStr = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const expiryDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const expiryDateStr = expiryDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const passId = `#IF-TRIAL-${String(leadId).padStart(4, '0')}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your 7-Day Free Pass - IRONFORGE FITNESS</title>
  <style>
    body { margin: 0; padding: 0; background-color: #F8FAFC; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #0F172A; }
    table { border-collapse: collapse; }
    .email-container { max-width: 600px; margin: 20px auto; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .email-header { background-color: #0F172A; padding: 28px 24px; text-align: center; border-bottom: 4px solid #E02814; }
    .email-header h1 { margin: 0; color: #FFFFFF; font-size: 24px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; }
    .email-header p { margin: 6px 0 0 0; color: #E02814; font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; }
    .email-body { padding: 32px 28px; }
    .greeting { font-size: 18px; font-weight: 700; color: #0F172A; margin: 0 0 12px 0; }
    .intro-text { font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 24px 0; }
    
    /* Digital Pass Card */
    .pass-card { background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); border-radius: 10px; padding: 24px; color: #FFFFFF; margin-bottom: 28px; border: 1px solid #334155; }
    .pass-tag { display: inline-block; background-color: #E02814; color: #FFFFFF; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px; }
    .pass-title { font-size: 20px; font-weight: 800; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 0.02em; }
    .pass-details-table { width: 100%; }
    .pass-details-table td { padding: 6px 0; font-size: 14px; }
    .pass-label { color: #94A3B8; font-weight: 600; }
    .pass-val { color: #FFFFFF; font-weight: 700; text-align: right; }
    
    /* Info Box */
    .info-box { background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 20px; margin-bottom: 24px; }
    .info-title { font-size: 14px; font-weight: 800; color: #0F172A; text-transform: uppercase; margin: 0 0 10px 0; letter-spacing: 0.04em; }
    .info-item { font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 8px; }
    
    /* CTA Button */
    .cta-btn { display: block; width: 100%; box-sizing: border-box; text-align: center; background-color: #E02814; color: #FFFFFF !important; font-size: 15px; font-weight: 800; text-decoration: none; padding: 14px 20px; border-radius: 8px; text-transform: uppercase; letter-spacing: 0.04em; margin-top: 20px; }
    
    /* Footer */
    .email-footer { background-color: #F1F5F9; padding: 20px 28px; text-align: center; font-size: 12px; color: #64748B; line-height: 1.5; border-top: 1px solid #E2E8F0; }
  </style>
</head>
<body>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <div class="email-container">
          
          <!-- Header -->
          <div class="email-header">
            <h1>IRONFORGE FITNESS</h1>
            <p>High Performance Training Center</p>
          </div>

          <!-- Body -->
          <div class="email-body">
            <div class="greeting">Hi ${name},</div>
            <p class="intro-text">
              Congratulations! Your <strong>7-Day All-Access Free Trial Pass</strong> has been successfully activated. You are now ready to experience Ahmedabad's premier strength &amp; conditioning facility.
            </p>

            <!-- Digital Pass -->
            <div class="pass-card">
              <span class="pass-tag">7-DAY VIP PASS</span>
              <div class="pass-title">MEMBER TRIAL PASS</div>
              <table class="pass-details-table">
                <tr>
                  <td class="pass-label">Pass ID:</td>
                  <td class="pass-val">${passId}</td>
                </tr>
                <tr>
                  <td class="pass-label">Member Name:</td>
                  <td class="pass-val">${name}</td>
                </tr>
                <tr>
                  <td class="pass-label">Primary Goal:</td>
                  <td class="pass-val">${goal}</td>
                </tr>
                <tr>
                  <td class="pass-label">Preferred Time:</td>
                  <td class="pass-val">${preferredTime}</td>
                </tr>
                <tr>
                  <td class="pass-label">Valid Duration:</td>
                  <td class="pass-val">${startDateStr} – ${expiryDateStr} (7 Days)</td>
                </tr>
              </table>
            </div>

            <!-- Location & Access Details -->
            <div class="info-box">
              <div class="info-title">Gym Location &amp; Hours</div>
              <div class="info-item">📍 <strong>Address:</strong> 4th Floor, Titanium Square, S.G. Highway, Bodakdev, Ahmedabad, Gujarat 380054</div>
              <div class="info-item">⏰ <strong>Hours:</strong> Mon – Sun: 6:00 AM – 10:00 PM</div>
              <div class="info-item">🚗 <strong>Parking:</strong> Free dedicated basement &amp; valet parking available</div>
            </div>

            <!-- First Visit Checklist -->
            <div class="info-box">
              <div class="info-title">What to Bring on Your First Visit</div>
              <div class="info-item">✓ Show this confirmation email / Pass ID at the front desk.</div>
              <div class="info-item">✓ Clean training shoes &amp; workout attire.</div>
              <div class="info-item">✓ Sweat towel &amp; water bottle (lockers are provided free).</div>
            </div>

            <p style="font-size: 14px; color: #475569; margin: 0 0 16px 0; line-height: 1.5;">
              If you have any questions or would like to schedule a free 1-on-1 trainer consultation, reply directly to this email or reach us on WhatsApp.
            </p>

            <a href="https://wa.me/919876543210?text=Hi%20IRONFORGE%20Fitness%2C%20I%20claimed%20my%207-day%20free%20trial%20(${encodeURIComponent(passId)})" class="cta-btn">
              CHAT ON WHATSAPP &rarr;
            </a>
          </div>

          <!-- Footer -->
          <div class="email-footer">
            <strong>IRONFORGE FITNESS AHMEDABAD</strong><br>
            S.G. Highway, Bodakdev, Ahmedabad, Gujarat 380054 | Phone: +91 98765 43210<br>
            &copy; ${now.getFullYear()} IRONFORGE FITNESS. All rights reserved.
          </div>

        </div>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Send Free Trial Confirmation Email
 */
async function sendTrialConfirmationEmail(lead) {
  const transporter = createTransporter();
  const htmlContent = generateTrialEmailHtml(lead);
  const passId = `#IF-TRIAL-${String(lead.leadId).padStart(4, '0')}`;

  const mailOptions = {
    from: process.env.SMTP_FROM || `"IRONFORGE FITNESS" <${process.env.ADMIN_EMAIL || 'dakshkhamar22@gmail.com'}>`,
    to: lead.email,
    subject: `Your 7-Day Free Pass is Activated! (${passId}) - IRONFORGE FITNESS`,
    html: htmlContent,
    text: `Hi ${lead.name},\n\nYour 7-Day Free Trial Pass (${passId}) is now active!\n\nLocation: 4th Floor, Titanium Square, S.G. Highway, Bodakdev, Ahmedabad\nHours: Mon-Sun: 6:00 AM - 10:00 PM\nValid for 7 days from today.\n\nShow this email at the front desk upon arrival.\n\nBest,\nIRONFORGE FITNESS Team`
  };

  if (!transporter) {
    console.log(`[EMAIL DISPATCH - SIMULATED] To: ${lead.email} | Subject: ${mailOptions.subject}`);
    return { success: true, simulated: true };
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[EMAIL DISPATCH - SUCCESS] Sent to ${lead.email} (Message ID: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[EMAIL DISPATCH - ERROR] Failed to send email to ${lead.email}:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Send Admin Notification Email when new lead registers
 */
async function sendAdminNewLeadNotification(lead) {
  const transporter = createTransporter();
  const passId = `#IF-TRIAL-${String(lead.leadId).padStart(4, '0')}`;
  const adminEmail = process.env.ADMIN_EMAIL || 'dakshkhamar22@gmail.com';

  const mailOptions = {
    from: process.env.SMTP_FROM || `"IRONFORGE System" <${adminEmail}>`,
    to: adminEmail,
    subject: `[NEW TRIAL LEAD] ${lead.name} (${passId})`,
    html: `
      <h2>New 7-Day Free Trial Registered</h2>
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Phone:</strong> ${lead.phone}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Goal:</strong> ${lead.goal}</p>
      <p><strong>Preferred Time:</strong> ${lead.preferredTime}</p>
      <p><strong>Experience:</strong> ${lead.experience}</p>
      <p><strong>Pass ID:</strong> ${passId}</p>
      <p><a href="https://ironforge-fitness.onrender.com/admin">View in Admin Portal</a></p>
    `
  };

  if (!transporter) {
    console.log(`[ADMIN NOTIFICATION - SIMULATED] New Lead: ${lead.name} (${lead.email})`);
    return { success: true, simulated: true };
  }

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

module.exports = {
  sendTrialConfirmationEmail,
  sendAdminNewLeadNotification,
  generateTrialEmailHtml
};
