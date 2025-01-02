import fetch from "node-fetch";
import yts from "yt-search";

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } }); // رد فعل عند الإدخال الخاطئ
        return m.reply("❀ *الرجاء إدخال النص الذي تريد البحث عنه* 🤔");
    }

    let ytres = await yts(text);
    let video = ytres.videos[0];

    if (!video) {
        await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } }); // رد فعل عند عدم العثور على الفيديو
        return m.reply("❀ *الفيديو غير موجود* 😔");
    }

    let { title, thumbnail, timestamp, views, ago, url } = video;

    // عرض عدد المشاهدات بالإنجليزية
    let vistas = parseInt(views).toLocaleString("en-US") + " views";

    let HS = `- *المدة:* ${timestamp} ⏳
- *عدد المشاهدات:* ${vistas} 👀
- *تم التحميل في:* ${ago} 🗓️
- *الرابط:* ${url} 🔗`;

    let thumb = (await conn.getFile(thumbnail))?.data;

    let JT = {
        contextInfo: {
            externalAdReply: {
                title: title, body: "",
                mediaType: 1, previewType: 0,
                mediaUrl: url, sourceUrl: url,
                thumbnail: thumb, renderLargerThumbnail: true,
            }
        }
    };

    await conn.reply(m.chat, HS, m, JT);

    // رد فعل "⏳" عند بدء التحميل
    await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

    // رسالة "انتظر" قبل تحميل الصوت
    await conn.reply(m.chat, "❀ *انتظر قليلاً... جاري تحميل الصوت* ⏳", m);

    try {
        let api = await fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${url}`);
        let json = await api.json();
        let { download } = json.result;

        // إرسال المقطع الصوتي
        let sentMsg = await conn.sendMessage(m.chat, { audio: { url: download.url }, caption: `🎶 *تم تنزيل الصوت بنجاح!* 🎧`, mimetype: "audio/mpeg", }, { quoted: m });

        // إضافة رد فعل على المقطع الصوتي بعد إرساله
        setTimeout(async () => {
            await conn.sendMessage(m.chat, { react: { text: '🎉', key: sentMsg.key } });
        }, 2000); // تأخير 2 ثانية قبل إضافة رد الفعل (منبثق)

        // رد فعل "✅" بعد إتمام التحميل بنجاح
        await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

        // رسالة إتمام التحميل
        await conn.reply(m.chat, "❀ *تم التحميل بنجاح!* 🎉", m);

    } catch (error) {
        console.error(error);
        await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } }); // رد فعل عند حدوث خطأ
        return m.reply("❀ *حدث خطأ أثناء تحميل الصوت* 😣");
    }
};

handler.tags = ['downloder'];
handler.help = ['play'];
handler.command = /^(play)$/i;

export default handler;
