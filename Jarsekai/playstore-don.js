import gplay from 'google-play-scraper';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix: prefix, command }) => {
    if (!args[0]) {
        // إظهار إيموجي "⏳" عند إدخال أمر فارغ
        const react = { react: { text: '⏳', key: m.key } };
        await conn.sendMessage(m.chat, react);

        return conn.reply(m.chat, `*❌ المرجو إدخال رابط التطبيق لتحميله من Play Store*\n\n*🔍 مثال:*\n\`${prefix + command} https://play.google.com/store/apps/details?id=com.whatsapp\``, m);
    }

    // إظهار إيموجي انتظار
    const react = { react: { text: '⏳', key: m.key } };
    await conn.sendMessage(m.chat, react);

    // رسالة انتظار
    await conn.reply(m.chat, '❀ *انتظر قليلاً... جاري تحميل التطبيق* ⏳', m);

    const url = args[0];
    let packageName;

    try {
        packageName = new URL(url).searchParams.get("id");
        if (!packageName) throw new Error();
    } catch {
        return conn.reply(m.chat, `*❌ الرابط غير صالح أو لا يحتوي على معرف التطبيق.*`, m);
    }

    let info;
    try {
        info = await gplay.app({ appId: packageName });

    } catch (error) {
        console.error(error);
        return conn.reply(m.chat, `*❌ لم يتم العثور على التطبيق. تأكد من صحة الرابط.*`, m);
    }

    const appName = info.title;
    let apkLink = `https://d.apkpure.com/b/APK/${info.appId}?version=latest`;

    // إرسال ملف التطبيق
    await conn.sendFile(m.chat, apkLink, `${appName}\n by ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ.apk`, `*📱 اسم التطبيق:* ${appName}\n\n*📦 رابط التحميل:* ${apkLink}\n\n*✅ تم تحميل تطبيق :* ${appName}
\n\n*❀ مطور البوت :* \n\n*https://wa.me/212645106267*\n\n*❀ حساب الإنستغرام :*\n\n*instagram.com/dj_flibu_remix*`, m, false, { mimetype: 'application/vnd.android.package-archive', asDocument: true });

    // نجاح
    const reactdone = { react: { text: '✅', key: m.key } };
    conn.sendMessage(m.chat, reactdone);
};
handler.tags = ['downloader'];
handler.help = ['playstore-don'];
handler.command = /^(playstore-don)$/i;
export default handler;
