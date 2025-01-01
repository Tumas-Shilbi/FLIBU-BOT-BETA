import fetch from 'node-fetch';

let HS = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, `❀ *المرجو إدخال رابط من Mediafire*`, m);

    try {
        await conn.reply(m.chat, `⏳ *جاري استخراج البيانات، الرجاء الانتظار...*`, m);

        let api = await fetch(`https://restapi.apibotwa.biz.id/api/mediafire?url=${text}`);
        let json = await api.json();
        let { filename, type, size, uploaded, ext, mimetype, download: dl_url } = json.data.response;

        // رسالة معلومات الملف
        await m.reply(`✨ *تم استخراج البيانات بنجاح!*

📄 *اسم الملف:* ${filename}
📂 *النوع:* ${type}
📏 *الحجم:* ${size}
🗓️ *تاريخ الإنشاء:* ${uploaded}`);

        // إرسال الملف
        await conn.sendFile(
            m.chat,
            dl_url,
            filename,
            null,
            m,
            null,
            { mimetype: ext, asDocument: true }
        );

        await m.reply(`✅ *تم تحميل الملف بنجاح!*`);
    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, `⚠️ *حدث خطأ أثناء التحميل. الرجاء المحاولة لاحقًا.*`, m);
    }
};

HS.command = ['mediafire'];
HS.tags = ['downloader'];
HS.help = ['mediafire'];

export default HS;
