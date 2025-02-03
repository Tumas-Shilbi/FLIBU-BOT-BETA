import fetch from 'node-fetch';

let handler = async(m, { conn, args, usedPrefix, command }) => {
    const react = { react: { text: "⏳", key: m.key } };
    const reactdone = { react: { text: "✅", key: m.key } };

    if (!args[0]) {
        return m.reply(`  *المرجو إدخال رابط من تيك توك*\n\n*مثال :*\n*.tiktok-mp3* https://vm.tiktok.com/ZMkqgH4ao/`);
    }

    try {
        await conn.sendMessage(m.chat, react); // رد انتظار

        let api = `https://eliasar-yt-api.vercel.app/api/search/tiktok?query=${args[0]}`;
        let response = await fetch(api);
        let json = await response.json();

        if (!json || !json.results) {
            return m.reply(`❌ *عذرًا، لم يتم العثور على أي بيانات. تأكد من صحة الرابط!*`);
        }

        let res = json.results;
        let author = res.author || "غير متوفر";
        let title = res.title || "غير متوفر";
        let aud = res.audio || null;

        if (!aud) {
            return m.reply(`❌ *لم يتم العثور على رابط الصوت. حاول مجددًا!*`);
        }

        // التحقق من مدة الصوت (أقل من دقيقة)
        let audioResponse = await fetch(aud);
        let audioBuffer = await audioResponse.arrayBuffer();

        if (audioBuffer.byteLength < 60000) {
            return m.reply(`❌ *الصوت أقل من دقيقة، حاول برابط آخر!*`);
        }

        let ttt = `*📀 معلومات الصوت:* \n\n*🎤 المؤلف:* ${author}\n*🎵 العنوان:* ${title}\n\n*❀ حسابي انستغرام :*\n\n*instagram.com/dj_flibu_remix*\n\n*❀ مطور البوت :*\n\n*https://wa.me/212645106267*`;
        let img = 'https://files.catbox.moe/51xcx4.jpg';

        await conn.sendFile(m.chat, img, 'thumbnail.jpg', ttt, m, null);

        // إرسال الملف الصوتي
        await conn.sendMessage(m.chat, { audio: { url: aud }, mimetype: 'audio/mpeg' }, { quoted: m });

        await conn.sendMessage(m.chat, reactdone);
        await conn.sendMessage(m.chat, { react: { text: '🎉', key: m.key } });

    } catch (e) {
        m.reply(`❌ *حدث خطأ أثناء العملية:* ${e.message}`);
    }
};

handler.tags = ['downloader'];
handler.help = ['tiktok-mp3'];
handler.command = ['tiktok-mp3', 'ttmp3'];

export default handler
