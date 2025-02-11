import axios from 'axios';

let handler = async (m, { conn, text }) => {
  // إعداد رسالة انتظار بالإيموجي "⏳"
  const react = {
    react: {
      text: "⏳",  
      key: m.key,
    },
  };

  // إعداد رسالة نجاح بالإيموجي "✅"
  const reactdone = {
    react: {
      text: "✅",  
      key: m.key,
    },
  };

  if (!text) return conn.reply(m.chat, `❀ المرجو إدخال رابط YouTube`, m);

  // إرسال تفاعل الانتظار
  await conn.sendMessage(m.chat, react);

  try {
    let api = await axios.get(`https://mahiru-shiina.vercel.app/download/ytmp4?url=${text}`);
    let json = api.data;

    let { title, description, uploaded, duration, views, author, thumbnail, download } = json.data;
    let { name, url: authorUrl } = author;

    let handler = `- *العنوان:* ${title}

- *المؤلف:* ${name} - ${authorUrl}

- *الوصف:* ${description}

- *تاريخ الرفع:* ${uploaded}

- *مدة الفيديو:* ${duration}

- *عدد المشاهدات:* ${views}

*⏳ المرجو انتظار تحميل الفيديو...*

❀ *حسابي انستغرام:*  

*instagram.com/dj_flibu_remix*

❀ *مطور البوت:*  

*https://wa.me/212645106267*`;

    // إرسال صورة الفيديو مع الوصف
    await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: handler }, { quoted: m });

    // تحميل الفيديو
    await conn.sendMessage(m.chat, { video: { url: download }, mimetype: 'video/mp4' }, { quoted: m });

    // إرسال تفاعل النجاح
    await conn.sendMessage(m.chat, reactdone);

  } catch (error) {
    console.error(error);
    // إرسال رد خطأ
    await conn.sendMessage(m.chat, { text: "❌ *حدث خطأ أثناء العملية.*" });
  }
}

handler.tags = ['downloader'];
handler.help = ['ytmp4-v2'];
handler.command = ['ytmp4-v2'];

export default handler;
