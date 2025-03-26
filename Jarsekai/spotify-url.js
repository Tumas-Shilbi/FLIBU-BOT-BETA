/*
- *⏳ Downloader Spotify By FLIBU-BOT-BETA*
- https://instagram.com/dj_flibu_remix
*/

import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, '❌ *يرجى إدخال رابط الأغنية من Spotify.*', m);
  }

  // رسالة انتظار فقط عند إدخال رابط
  if (text.includes('spotify.com')) {
    const react = {
      react: {
        text: "⏳",  // رد إيموجي عند الانتظار
        key: m.key,
      },
    };
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    await conn.reply(m.chat, '*⏳ جاري معالجة طلبك لتحميل أغنية من Spotify...*');
  }

  try {
    let res = await fetch(`https://api.vreden.web.id/api/spotify?url=${encodeURIComponent(text)}`);
    let json = await res.json();

    if (json.status === 200 && json.result?.status) {
      let { title, artists, cover, music } = json.result;
      let msg = `🎵 *العنوان*: ${title}\n🎤 *الفنان*: ${artists}\n📅 *تاريخ الإصدار*: ${json.result.releaseDate}\n\n*✅ تم تحميل الأغنية بنجاح*\n\n*❀ حسابي انستغرام :* \n\n*instagram.com/dj_flibu_remix*\n\n*❀ مطور البوت :*\n\n*https://wa.me/212645106267*`;

      await conn.sendFile(m.chat, cover, 'cover.jpg', msg, m);
      await conn.sendMessage(m.chat, { 
        audio: { url: music }, 
        fileName: `${title}.mp3`, 
        mimetype: 'audio/mpeg' 
      }, { quoted: m });

      // رسالة نجاح
      const reactdone = {
        react: {
          text: "✅",  // رد إيموجي عند النجاح
          key: m.key,
        },
      };
      await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } else {
      conn.reply(m.chat, '❌ *لم يتم العثور على الأغنية المطلوبة.*', m);
    }

  } catch (e) {
    // رسالة خطأ
    conn.reply(m.chat, '❌ *حدث خطأ أثناء معالجة طلبك.*', m);
  }
};

handler.tags = ['downloader']
handler.help = ['spotify-url']
handler.command = /^(spotify-url|sp)$/i;

export default handler;
