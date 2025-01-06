import fetch from 'node-fetch';

let handler = async (m, { conn, command, text, usedPrefix }) => {
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

    // التحقق من وجود رابط
    if (!text) {
        await conn.sendMessage(m.chat, react);  // إرسال رمز تعبيري "⏳" عند الإدخال الخاطئ
        return conn.reply(
            m.chat,
            `❀ *الرجاء إدخال رابط من اليوتيوب* 📹\n*.ytmp4* https://youtu.be/Xvat-B1Ysww?si=UqYNZKH_3dRF5MrP`,
            m
        );
    }

    // إعلام المستخدم ببدء المعالجة
    await conn.reply(m.chat, `⌛️ *جاري معالجة الفيديو...* 🕒`, m);

    try {
        // طلب البيانات من API
        const api = await fetch(`https://axeel.my.id/api/download/video?url=${text}`);
        const json = await api.json();

        // التحقق من صحة البيانات
        if (!json.metadata || !json.downloads || !json.downloads.url) {
            throw new Error("*❀ ⚠️ خطأ: لم يتم العثور على البيانات المطلوبة.*");
        }

        // استخراج البيانات
        const { title, views, likes, description, author } = json.metadata;
        const size = json.downloads.size;
        const dl_url = json.downloads.url;

        // إنشاء رسالة المعلومات
        const info = `❀ *تم العثور على التفاصيل:* 🎥
- *العنوان:* ${title}
- *الوصف:* ${description}
- *المشاهدات:* ${views}
- *الإعجابات:* ${likes}
- *الناشر:* ${author}
- *الحجم:* ${size}`;

        // إرسال التفاصيل للمستخدم
        await conn.reply(m.chat, info, m);

        // إرسال الفيديو
        const sentMsg = await conn.sendMessage(
            m.chat,
            {
                video: { url: dl_url },
                fileName: `${title}.mp4`,
                mimetype: 'video/mp4',
            },
            { quoted: m }
        );

        // إضافة رد بإيموجي (React Message)
        await conn.sendMessage(m.chat, { react: { text: '🎉', key: sentMsg.key } });

        // إعلام المستخدم بنجاح العملية
        await conn.reply(m.chat, `✅ *تم تحميل الفيديو بنجاح!* 🎉 
\n*تابعني في حسابي :* 
*instagram.com/dj_flibu_remix*`, m);
        await conn.sendMessage(m.chat, reactdone);  // رد "✅" عند النجاح
    } catch (error) {
        console.error(error);

        // إعلام المستخدم بوجود مشكلة
        await conn.reply(
            m.chat,
            `❌ *حدث خطأ أثناء تنزيل الفيديو!* 😞\n${error.message || "*❀ حاول مرة أخرى لاحقًا.*"}`,
            m
        );

        // إضافة رد بإيموجي عند الخطأ
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }
};

handler.tags = ['downloader'];
handler.help = ['ytmp4'];
handler.command = /^(ytmp4)$/i;

export default handler;
