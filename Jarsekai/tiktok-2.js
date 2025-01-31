import axios from 'axios'

let HS = async (m, { conn, text }) => {
  const react = {
    react: {
      text: "⏳",  // رد إيموجي عند الانتظار
      key: m.key,
    },
  };
  const reactdone = {
    react: {
      text: "✅",  // رد إيموجي عند النجاح
      key: m.key,
    },
  };

  if (!text) return conn.reply(m.chat, `*❀ المرجو إدخال رابط TikTok*`, m);

  try {
    await conn.sendMessage(m.chat, react); // إرسال إيموجي الانتظار

    let { title, duration, play, play_count, comment_count, share_count, download_count, author } = await tiktok.download(text);

    let HS = `🎥 *معلومات الفيديو:*  

- 🎵 *العنوان:* ${title}  

- 👤 *المنشئ:* ${author.nickname}  
- ⏱️ *مدة الفيديو:* ${duration} ثوانٍ  
- 👁️ *عدد المشاهدات:* ${play_count}  
- 💬 *عدد التعليقات:* ${comment_count}  
- 🔄 *عدد المشاركات:* ${share_count}  
- 📥 *عدد التنزيلات:* ${download_count}

*❀ حسابي انستغرام :*\n\n*instagram.com/dj_flibu_remix*
\n*❀ مطور البوت :*\n\n*https://wa.me/212645106267*
`;

    await conn.sendFile(m.chat, play, 'FLIBU_BOT.mp4', HS, m);
    await conn.sendMessage(m.chat, reactdone); // إرسال إيموجي النجاح
    await conn.sendMessage(m.chat, { react: { text: '🎉', key: m.key } });

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `❌ حدث خطأ أثناء التحميل: ${error.message}`, m);
  }
};

HS.tags = ['downloader'];
HS.help = ['tiktok-2'];
HS.command = ['tiktok-2'];

export default HS;

const tiktok = {
  download: async function (url) {
    try {
      const response = await axios(`https://tikwm.com/api/?url=${url}`).catch(e => e.response);

      if (response && response.data && response.data.data) {
        return response.data.data;
      } else {
        throw new Error('❌ لم يتم العثور على رابط صالح للتحميل');
      }
    } catch (error) {
      throw new Error('❌ خطأ أثناء تنزيل الفيديو من TikTok: ' + error);
    }
  },
};
