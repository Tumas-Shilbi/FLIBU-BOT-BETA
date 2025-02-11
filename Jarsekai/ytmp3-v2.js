import axios from 'axios'

let handler = async (m, { conn, text }) => {
    // *⏳ جاري المعالجة...*
    const reactWaiting = {
        react: { text: "⏳", key: m.key }
    };
    await conn.sendMessage(m.chat, reactWaiting);

    if (!text) {
        return conn.reply(m.chat, `*❀ المرجو إدخال رابط من YouTube*`, m);
    }

    try {
        // الحصول على معلومات الفيديو وتحميله
        let apiResponse = await axios.get(`https://mahiru-shiina.vercel.app/download/ytmp3?url=${text}`);
        let videoData = apiResponse.data.data;

        let { title, description, uploaded, duration, views, thumbnail, author, download } = videoData;
        let { name, url: authorUrl } = author;

        // محتوى الرد مع التنسيق المطلوب
        let musicInfo = `- *🎵 عنوان الأغنية:* ${title}

- *🎤 المؤلف:* ${name} - ${authorUrl}

- *📝 الوصف:* ${description}

- *📅 تاريخ الرفع:* ${uploaded}

- *⏱️ المدة:* ${duration}

- *👁️ عدد المشاهدات:* ${views}

*⏳ المرجو انتظار تحميل الموسيقى...*

*❀ حسابي انستغرام :*  

*instagram.com/dj_flibu_remix*

*❀ مطور البوت :*  

*https://wa.me/212645106267*`;

        // إرسال معلومات الفيديو
        await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: musicInfo }, { quoted: m });

        // إرسال ملف الموسيقى
        await conn.sendMessage(m.chat, { audio: { url: download }, mimetype: 'audio/mpeg' }, { quoted: m });

        // *✅ تم تحميل الأغنية بنجاح*
        const reactSuccess = {
            react: { text: "✅", key: m.key }
        };
        await conn.sendMessage(m.chat, reactSuccess);

    } catch (error) {
        // *❌ حدث خطأ أثناء العملية.*
        await conn.sendMessage(m.chat, { text: "*❌ حدث خطأ أثناء العملية.*" }, { quoted: m });
        console.error(error);
    }
}

handler.tags = ['downloader']
handler.help = ['ytmp3-v2']
handler.command = ['ytmp3-v2']

export default handler;
