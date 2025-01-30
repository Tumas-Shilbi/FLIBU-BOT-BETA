import fetch from 'node-fetch';

let handler = async (m, { conn, command, text, usedPrefix }) => {
  const react = {
    react: {
      text: "⏳", // رد إيموجي عند الانتظار
      key: m.key,
    },
  };
  const reactdone = {
    react: {
      text: "✅", // رد إيموجي عند النجاح
      key: m.key,
    },
  };

  if (!text) {
    await conn.reply(m.chat, '*❀ المرجو إدخال رابط فيديو يوتيوب.*', m);
    return;
  }

  try {
    // إرسال رد انتظار
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

    let api = await fetch(`https://api.davidcyriltech.my.id/download/ytmp3?url=${text}`);
    let json = await api.json();
    let { title, download_url, quality, thumbnail } = json.result;

    // إرسال الصورة المصغرة
    if (thumbnail) {
      await conn.sendMessage(m.chat, {
        image: { url: thumbnail },
        caption: `*المرجو إنتظر لحظة... ⏳*\n\n*📄 العنوان:* ${title}\n
*🔊 الجودة:* ${quality}\n\n*❀ حسابي انستغرام :* 

*instagram.com/dj_flibu_remix*\n
*❀ مطور البوت :* 

*https://wa.me/212645106267*`,
      });
    }

    // إرسال ملف الموسيقى
    await conn.sendMessage(m.chat, {
      audio: { url: download_url },
      mimetype: "audio/mpeg"
    }, { quoted: m });

    // إرسال رد نجاح
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    await conn.sendMessage(
      m.chat, 
      `*✅ تم التحميل بنجاح!*\n رابط الإنستغرام : 

instagram.com/dj_flibu_remix\n
رقم المطور : 

https://wa.me/212645106267`,
      { quoted: m }
    );

  } catch (error) {
    console.error(error);
    // لم نعد نرسل رسالة الخطأ هنا
  }
};

handler.command = ['ytmp3'];

export default handler;
