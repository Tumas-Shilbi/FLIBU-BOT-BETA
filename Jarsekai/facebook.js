import fetch from 'node-fetch';

let HS = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, `❀ *المرجو إدخال رابط الفيديو من فيسبوك*`, m);

    try {
        await conn.reply(m.chat, `⏳ *جاري تحميل الفيديو، الرجاء الانتظار...*`, m);

        let api = await fetch(`https://api.siputzx.my.id/api/d/facebook?url=${text}`);
        let json = await api.json();

        // إرسال الصورة المصغرة
        await conn.sendFile(
            m.chat, 
            json.data.thumbnail, 
            'HasumiBotFreeCodes.jpg', 
            `✨ *تم تحميل الصورة المصغرة بنجاح!*`, 
            m
        );

        // إرسال الفيديو
        await conn.sendFile(
            m.chat, 
            json.data.video, 
            'HasumiBotFreeCodes.mp4', 
            `🎥 *تم تحميل الفيديو بنجاح!*`, 
            m
        );
    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, `⚠️ *حدث خطأ أثناء التحميل. الرجاء المحاولة لاحقًا.*`, m);
    }
};

HS.command = ['facebook'];
HS.tags = ['downloader'];
HS.help = ['facebook'];

export default HS;
