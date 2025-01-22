import fetch from 'node-fetch';

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

    if (!text) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
        return conn.reply(m.chat, `❀ *المرجو إدخال رابط الفيديو من فيسبوك*`, m);
    }

    try {
        // رسالة انتظار
        await conn.reply(m.chat, `⏳ *جاري تحميل الفيديو، الرجاء الانتظار...*`, m);
        await conn.sendMessage(m.chat, react);

        let api = await fetch(`https://api.siputzx.my.id/api/d/facebook?url=${text}`);
        let json = await api.json();

        // إرسال الفيديو
        await conn.sendFile(
            m.chat, 
            json.data.video, 
            'HasumiBotFreeCodes.mp4', 
            `🎥 *تم تحميل الفيديو بنجاح!*\n\n*❀ تابعنا على الإنستغرام :*
            \n*instagram.com/dj_flibu_remix*
\n*❀ مطور البوت :*

*https://wa.me/212645106267*`, 
            m
        );

        // تفاعل النجاح
        await conn.sendMessage(m.chat, reactdone);
    } catch (error) {
        console.error(error);
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
        await conn.reply(m.chat, `⚠️ *حدث خطأ أثناء التحميل. الرجاء المحاولة لاحقًا.*`, m);
    }
};

HS.command = ['facebook','fb'];
HS.tags = ['downloader'];
HS.help = ['facebook'];

export default HS;
