import axios from 'axios';

// تعريف التفاعلات
const react = {
  react: {
    text: "⏳", // رد إيموجي عند الانتظار
    key: null,
  },
};
const reactdone = {
  react: {
    text: "✅", // رد إيموجي عند النجاح
    key: null,
  },
};
const reactsuccess = {
  react: {
    text: "🎉", // رد إيموجي عند النجاح مع إرسال المقطع الصوتي
    key: null,
  },
};

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    // التحقق من وجود اسم أغنية
    if (!text) {
      throw `❌ *يرجى توفير اسم الأغنية للبحث.*\n\n*✏️ مثال :*\n\n*${usedPrefix + command}* DJ FLIBU REMIX`;
    }

    // إرسال رد إيموجي عند الانتظار
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    conn.reply(m.chat, "*⏳ جاري البحث عن الأغنية...*", m);

    // البحث عن الفيديو
    const searchResponse = await axios.get(`https://api-rin-tohsaka.vercel.app/search/ytsearch?text=${encodeURIComponent(text)}`);
    const videoData = searchResponse.data.data[0];

    if (!videoData) {
      throw `❌ *لم يتم العثور على نتائج للأغنية "${text}".*\n\n✏️ *حاول البحث باستخدام كلمات أخرى.*`;
    }

    const body = `*📌 العنوان:* ${videoData.title}\n*📅 تاريخ الرفع:* ${videoData.uploaded}\n*⏱️ المدة:* ${videoData.duration}\n*👀 المشاهدات:* ${videoData.views}\n*✍️ المؤلف:* ${videoData.author.name}\n*🔗 الرابط:* ${videoData.url}\n\n⏳ *جاري تنزيل الأغنية...*\n\n*❀ تابعني على إنستغرام :* 

*instagram.com/dj_flibu_remix*
\n*❀ مطور البوت :*

*https://wa.me/212645106267*`;
    await conn.sendMessage(m.chat, { image: { url: videoData.thumbnail }, caption: body }, { quoted: m });

    // تنزيل الصوت
    const downloadResponse = await axios.get(`https://api-rin-tohsaka.vercel.app/download/ytmp3?url=${videoData.url}`);
    const downloadUrl = downloadResponse.data.data.download;

    if (!downloadUrl) {
      throw "❌ *حدث خطأ أثناء الحصول على رابط التنزيل.*";
    }

    // إرسال الصوت مع رسالة النجاح
    const successMessage = `*❀ تم التنفيذ بنجاح!*\nتابعني على إنستغرام: instagram.com/dj_flibu_remix
\n*❀ مطور البوت :*
*https://wa.me/212645106267*`;

    // إرسال الصوت
    const audioMessage = await conn.sendMessage(
      m.chat,
      {
        audio: { url: downloadUrl }, // إرسال الملف الصوتي
        mimetype: 'audio/mpeg', // تحديد النوع الصوتي بشكل صحيح
        fileName: `${videoData.title}.mp3`, // اسم الملف
        caption: successMessage, // رسالة النجاح داخل الرسالة نفسها
      },
      { quoted: m }
    );

    // إرسال رد إيموجي 🎉 عند إرسال الصوت بنجاح
    await conn.sendMessage(m.chat, { react: { text: '🎉', key: audioMessage.key } });

    // إرسال رد إيموجي ✅ عند النجاح
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
  } catch (e) {
    // إرسال رد إيموجي عند الخطأ
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    conn.reply(m.chat, `${e.message || e}`, m);
  }
};

handler.command = ['play']; // فقط الأمر play
handler.help = ['play'];
handler.tags = ['downloader'];
export default handler;
