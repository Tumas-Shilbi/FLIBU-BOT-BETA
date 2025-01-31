import axios from 'axios';

let HS = async (m, { conn, text }) => {
    // إرسال رد انتظار
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

    if (!text) {
        return conn.reply(m.chat, `❀ *يرجى إدخال رابط من تويتر.*`, m);
    }

    try {
        let api = await axios.get(`https://api.davidcyriltech.my.id/twitter?url=${text}`);
        let json = await api.data;
        let { description, thumbnail, video_sd, video_hd, audio } = json;
        let HS = `- *الوصف:* ${description}\n\n*✅ تم التنفيذ بنجاح*\n\n*❀ حسابي انستغرام :*\n\n*instagram.com/dj_flibu_remix*\n\n*❀ مطور البوت :*\n\n*https://wa.me/212645106267*`;

        // إرسال الفيديو مع الوصف
        await conn.sendFile(m.chat, video_hd, 'HasumiBotFreeCodes.mp4', HS, m);

        // إرسال رد نجاح
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (error) {
        console.error(error);
        // إرسال رد خطأ
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
        await conn.reply(m.chat, `*❌ حدث خطأ أثناء العملية.*`, m);
    }
};

HS.tags = ['downloader']
HS.help = ['twitter']
HS.command = ['twitter', 'twitterdl'];

export default HS;
