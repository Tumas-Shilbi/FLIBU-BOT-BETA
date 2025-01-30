import { webp2mp4 } from '../lib/webp2mp4.js';
import { ffmpeg } from '../lib/converter.js';

let handler = async (m, { conn }) => {
  // إرسال رد انتظار ⏳
  const react = {
    react: {
      text: "⏳",  // رد إيموجي عند الانتظار
      key: m.key,
    },
  };
  await conn.sendMessage(m.chat, react);

  if (!m.quoted) throw '*✳️ الرد على الملصق المتحرك*';
  let mime = m.quoted.mimetype || '';
  if (!/webp|audio/.test(mime)) throw '✳️ *الرد على الملصق المتحرك*';
  let media = await m.quoted.download();
  let out = Buffer.alloc(0);

  if (/webp/.test(mime)) {
    out = await webp2mp4(media);
  } else if (/audio/.test(mime)) {
    out = await ffmpeg(
      media,
      [
        '-filter_complex',
        'color',
        '-pix_fmt',
        'yuv420p',
        '-crf',
        '51',
        '-c:a',
        'copy',
        '-shortest',
      ],
      'mp3',
      'mp4'
    );
  }

  await conn.sendFile(
    m.chat,
    out,
    'tovid.mp4',
    '*✅ ملصق الفيديو*\n\n*❀ حسابي انستغرام :* \n\n*instagram.com/dj_flibu_remix*\n\n*❀ مطور البوت :*\n\n*https://wa.me/212645106267*',
    m
  );

  // إرسال رد نجاح 🎉
  const reactdone = {
    react: {
      text: "✅",  // رد إيموجي عند النجاح
      key: m.key,
    },
  };
  await conn.sendMessage(m.chat, reactdone);
};

handler.help = ['tovid'];
handler.tags = ['sticker'];
handler.command = ['tovideo', 'tovid'];

export default handler;
