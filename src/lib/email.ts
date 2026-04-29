import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.EMAIL_FROM || 'no-reply@sttpu.ac.id';
const TO_ADMIN = process.env.EMAIL_TO || 'admin@sttpu.ac.id';
const SITE_NAME = 'STTPU Jakarta';

export type ContactEmailData = {
  nama: string;
  email: string;
  telepon?: string;
  unit: string;
  subjek: string;
  pesan: string;
};

export async function sendContactNotification(data: ContactEmailData): Promise<void> {
  const teleponRow = data.telepon
    ? `<tr>
        <td style="padding:6px 12px;color:#555;width:130px;vertical-align:top;">Telepon</td>
        <td style="padding:6px 12px;color:#222;">: ${data.telepon}</td>
      </tr>`
    : '';

  const html = `<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Pesan Baru</title></head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:24px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:6px;overflow:hidden;max-width:600px;">
          <tr>
            <td style="background:#1E3A5F;padding:24px 32px;">
              <p style="margin:0;color:#ffffff;font-size:20px;font-weight:bold;">${SITE_NAME}</p>
              <p style="margin:4px 0 0;color:#ccd9e8;font-size:14px;">Notifikasi Pesan Baru dari Formulir Kontak</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 16px;font-size:15px;color:#333;">Pesan baru telah diterima melalui formulir kontak website.</p>
              <table cellpadding="0" cellspacing="0" style="width:100%;border:1px solid #e0e0e0;border-radius:4px;">
                <tr style="background:#f9f9f9;">
                  <td style="padding:6px 12px;color:#555;width:130px;vertical-align:top;">Nama</td>
                  <td style="padding:6px 12px;color:#222;">: ${data.nama}</td>
                </tr>
                <tr>
                  <td style="padding:6px 12px;color:#555;vertical-align:top;">Email</td>
                  <td style="padding:6px 12px;color:#222;">: <a href="mailto:${data.email}" style="color:#1E3A5F;">${data.email}</a></td>
                </tr>
                ${teleponRow}
                <tr style="background:#f9f9f9;">
                  <td style="padding:6px 12px;color:#555;vertical-align:top;">Unit Tujuan</td>
                  <td style="padding:6px 12px;color:#222;">: ${data.unit}</td>
                </tr>
                <tr>
                  <td style="padding:6px 12px;color:#555;vertical-align:top;">Subjek</td>
                  <td style="padding:6px 12px;color:#222;">: ${data.subjek}</td>
                </tr>
              </table>
              <p style="margin:20px 0 8px;font-size:14px;color:#555;font-weight:bold;">Isi Pesan:</p>
              <div style="background:#F0F4F8;border-radius:4px;padding:16px;font-size:14px;color:#333;line-height:1.6;white-space:pre-wrap;">${data.pesan}</div>
            </td>
          </tr>
          <tr>
            <td style="background:#f9f9f9;padding:16px 32px;border-top:1px solid #e0e0e0;">
              <p style="margin:0;font-size:12px;color:#888;">${SITE_NAME} &mdash; Email ini dikirim otomatis, jangan balas langsung. Untuk membalas pengirim, gunakan tombol Reply karena email ini dikirim dengan Reply-To ke pengirim.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  try {
    await resend.emails.send({
      from: FROM,
      to: TO_ADMIN,
      replyTo: data.email,
      subject: `[Pesan Baru] ${data.subjek}`,
      html,
    });
  } catch (err) {
    console.error('[email] Failed to send admin notification:', err);
  }
}

export async function sendContactAutoReply(data: ContactEmailData): Promise<void> {
  const html = `<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Pesan Diterima</title></head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:24px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:6px;overflow:hidden;max-width:600px;">
          <tr>
            <td style="background:#1E3A5F;padding:24px 32px;">
              <p style="margin:0;color:#ffffff;font-size:20px;font-weight:bold;">${SITE_NAME}</p>
              <p style="margin:4px 0 0;color:#ccd9e8;font-size:14px;">Konfirmasi Penerimaan Pesan</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 12px;font-size:15px;color:#333;">Yth. <strong>${data.nama}</strong>,</p>
              <p style="margin:0 0 12px;font-size:15px;color:#333;line-height:1.6;">
                Terima kasih telah menghubungi kami. Pesan Anda telah kami terima dan akan direspons oleh tim yang bersangkutan dalam <strong>1&ndash;2 hari kerja</strong>.
              </p>
              <table cellpadding="0" cellspacing="0" style="width:100%;background:#F0F4F8;border-radius:4px;margin:20px 0;">
                <tr>
                  <td style="padding:12px 16px;">
                    <p style="margin:0 0 6px;font-size:13px;color:#555;font-weight:bold;">Ringkasan pesan Anda:</p>
                    <p style="margin:0 0 4px;font-size:14px;color:#333;"><strong>Unit Tujuan:</strong> ${data.unit}</p>
                    <p style="margin:0;font-size:14px;color:#333;"><strong>Subjek:</strong> ${data.subjek}</p>
                  </td>
                </tr>
              </table>
              <p style="margin:0;font-size:15px;color:#333;line-height:1.6;">
                Jika ada pertanyaan mendesak, Anda juga dapat menghubungi kami melalui nomor telepon atau WhatsApp yang tersedia di website.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#f9f9f9;padding:16px 32px;border-top:1px solid #e0e0e0;">
              <p style="margin:0;font-size:13px;color:#555;">Salam hormat,</p>
              <p style="margin:4px 0 0;font-size:13px;color:#1E3A5F;font-weight:bold;">${SITE_NAME}</p>
              <p style="margin:8px 0 0;font-size:12px;color:#aaa;">Email ini dikirim otomatis, mohon tidak membalas email ini.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  try {
    await resend.emails.send({
      from: FROM,
      to: data.email,
      subject: `Pesan Anda telah kami terima — ${SITE_NAME}`,
      html,
    });
  } catch (err) {
    console.error('[email] Failed to send auto-reply:', err);
  }
}
