import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
    if (!text) {
        return m.reply("❀ *الرجاء إدخال اسم التطبيق الذي تريد البحث عنه* 🤔");
    }

    try {
        // رسالة "انتظر" قبل البحث
        await conn.reply(m.chat, "❀ *انتظر قليلاً... جاري البحث عن التطبيق* ⏳", m);

        let api = await fetch(`https://api.giftedtech.my.id/api/download/apkdl?apikey=gifted&appName=${text}`);
        let json = await api.json();
        let { appname, appicon, developer, download_url, mimetype } = json.result;
        let txt = `- *الاسم* : ${appname}
- *المطور* : ${developer}`;

        // إرسال أيقونة التطبيق
        await conn.sendFile(m.chat, appicon, 'HasumiBotFreeCodes.jpg', txt, m);

        // إرسال ملف الـ APK
        await conn.sendMessage(m.chat, { document: { url: download_url }, mimetype: mimetype, fileName: appname + '.apk', caption: null }, {quoted: m});

        // رسالة "تم التحميل بنجاح"
        await conn.reply(m.chat, "❀ *تم التحميل بنجاح!* 🎉", m);

    } catch (error) {
        console.error(error);
        return m.reply("❀ *حدث خطأ أثناء تحميل التطبيق* 😣");
    }
};

handler.command = /^()$/i;
handler.help = [''];
handler.tags = [''];

export default handler;
