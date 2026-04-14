import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM_EMAIL || 'BMG Siddha Hospital <onboarding@resend.dev>';

export interface AppointmentEmailData {
  name: string;
  mobile: string;
  email?: string;
  date?: string;
  timeSlot?: string;
  message?: string;
}

// ─── HTML Templates ────────────────────────────────────────────────────────

function baseLayout(content: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>BMG Siddha Hospital</title>
</head>
<body style="margin:0;padding:0;background:#f5f0e8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#2d5a27;padding:28px 32px;text-align:center;">
            <p style="margin:0;color:#c9a84c;font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;">BMG SIDDHA HOSPITAL</p>
            <h1 style="margin:6px 0 0;color:#fff;font-size:22px;font-weight:300;letter-spacing:0.5px;">Dindigul</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr><td style="padding:32px;">${content}</td></tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9f6f0;border-top:1px solid #e8e0d0;padding:20px 32px;text-align:center;">
            <p style="margin:0;color:#9a9a8a;font-size:12px;">Kuttathupatti, Kannivadi Rd, Dindigul – 624002</p>
            <p style="margin:4px 0 0;color:#9a9a8a;font-size:12px;">This is an automated email from BMG Siddha Hospital.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function row(label: string, value: string) {
  if (!value) return '';
  return `<tr>
    <td style="padding:8px 0;color:#6b7280;font-size:13px;width:130px;vertical-align:top;">${label}</td>
    <td style="padding:8px 0;color:#1a2e1a;font-size:13px;font-weight:500;">${value}</td>
  </tr>`;
}

// Email 1: Admin notification — new appointment booked
function adminNotificationHtml(data: AppointmentEmailData) {
  const content = `
    <div style="display:inline-block;background:#fef3c7;border:1px solid #f59e0b;color:#92400e;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;padding:4px 12px;border-radius:20px;margin-bottom:20px;">New Appointment Request</div>
    <h2 style="margin:0 0 6px;color:#1a2e1a;font-size:20px;font-weight:600;">You have a new booking</h2>
    <p style="margin:0 0 24px;color:#6b7280;font-size:14px;">A patient has submitted an appointment request.</p>

    <table cellpadding="0" cellspacing="0" style="width:100%;background:#f9f6f0;border-radius:12px;padding:20px;border:1px solid #e8e0d0;">
      <tbody>
        ${row('Patient Name', data.name)}
        ${row('Mobile', data.mobile)}
        ${row('Email', data.email || '—')}
        ${row('Preferred Date', data.date || '—')}
        ${row('Time Slot', data.timeSlot || '—')}
        ${row('Message', data.message || '—')}
      </tbody>
    </table>

    <p style="margin:24px 0 0;color:#6b7280;font-size:13px;">Log in to the admin panel to confirm or manage this appointment.</p>
  `;
  return baseLayout(content);
}

// Email 2: Patient confirmation
function patientConfirmationHtml(data: AppointmentEmailData) {
  const content = `
    <div style="display:inline-block;background:#d1fae5;border:1px solid #34d399;color:#065f46;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;padding:4px 12px;border-radius:20px;margin-bottom:20px;">Appointment Confirmed ✓</div>
    <h2 style="margin:0 0 6px;color:#1a2e1a;font-size:20px;font-weight:600;">Dear ${data.name},</h2>
    <p style="margin:0 0 24px;color:#6b7280;font-size:14px;">Your appointment at <strong>BMG Siddha Hospital</strong> has been confirmed. We look forward to seeing you.</p>

    <table cellpadding="0" cellspacing="0" style="width:100%;background:#f9f6f0;border-radius:12px;padding:20px;border:1px solid #e8e0d0;">
      <tbody>
        <tr><td colspan="2" style="padding-bottom:12px;font-size:12px;font-weight:700;color:#2d5a27;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #e8e0d0;">Your Appointment Details</td></tr>
        ${row('Name', data.name)}
        ${row('Mobile', data.mobile)}
        ${data.date ? row('Date', data.date) : ''}
        ${data.timeSlot ? row('Time Slot', data.timeSlot) : ''}
      </tbody>
    </table>

    <table cellpadding="0" cellspacing="0" style="width:100%;background:#eaf4ea;border-radius:12px;padding:20px;margin-top:16px;border:1px solid #c3e6c3;">
      <tbody>
        <tr><td colspan="2" style="padding-bottom:12px;font-size:12px;font-weight:700;color:#2d5a27;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #c3e6c3;">Hospital Address</td></tr>
        <tr><td colspan="2" style="padding-top:12px;color:#1a2e1a;font-size:13px;line-height:1.7;">
          Annammal Gnana Prakasam Campus,<br/>
          Paduvai Antoniyar Nagar,<br/>
          Kannivadi Main Rd, Kuttathupatti (Po)<br/>
          Dindigul – 624002
        </td></tr>
      </tbody>
    </table>

    <p style="margin:24px 0 8px;color:#6b7280;font-size:13px;">If you need to reschedule or have any questions, please call us directly.</p>
    <p style="margin:0;color:#2d5a27;font-size:14px;font-weight:600;">We wish you good health. 🌿</p>
  `;
  return baseLayout(content);
}

// ─── Send Functions ────────────────────────────────────────────────────────

export async function sendAdminNotification(
  toEmail: string,
  data: AppointmentEmailData
) {
  if (!toEmail) return;
  try {
    await resend.emails.send({
      from: FROM,
      to: toEmail,
      subject: `New Appointment Request — ${data.name} (${data.mobile})`,
      html: adminNotificationHtml(data),
    });
  } catch (err) {
    console.error('Admin notification email error:', err);
  }
}

export async function sendPatientConfirmation(data: AppointmentEmailData) {
  if (!data.email) return;
  try {
    await resend.emails.send({
      from: FROM,
      to: data.email,
      subject: 'Your Appointment is Confirmed — BMG Siddha Hospital',
      html: patientConfirmationHtml(data),
    });
  } catch (err) {
    console.error('Patient confirmation email error:', err);
  }
}
