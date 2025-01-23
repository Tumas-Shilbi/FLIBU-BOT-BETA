import fetch from 'node-fetch';
import axios from 'axios';
import yts from 'yt-search';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (command === 'song') {
        if (!text) return conn.reply(m.chat, `*❀ أدخل اسم الصوت الذي تريد تحميله من يوتيوب\n\n*❀ مثال :*\n *${usedPrefix + command}* dj flibu remix`, m);

        try {
            // البحث باستخدام اسم الأغنية
            const search = await yts(text);
            let bodyv1 = `*❀ نتائج البحث :*
            \n *بحث :* ${text}\n\n❀ *العنوان :* ${search.videos[0].title}\n\`\`\`----------\`\`\`\n❀ *المشاهدات :*  ${search.videos[0].views}\n\`\`\`----------\`\`\`\n❀ *المدة :*  ${search.videos[0].duration}\n\`\`\`----------\`\`\`\n❀ *تم الرفع قبل :*  ${search.videos[0].ago}\n\`\`\`----------\`\`\`\n❀ *الرابط :*  ${search.videos[0].url}\n\`\`\`----------\`\`\`
            \n*⏳ جاري المعالجة طلبك المرجو انتظر...*`;
            conn.sendMessage(m.chat, { image: { url: search.videos[0].thumbnail }, caption: bodyv1 }, { quoted: m });

            // إضافة رد تفاعل عند الانتظار
            await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } }); // تفاعل عند الانتظار

            const api = await axios.get(`https://api-rin-tohsaka.vercel.app/download/ytmp3?url=${search.videos[0].url}`);
            const response = api.data.data.download;

            // إرسال الموسيقى
            await conn.sendMessage(
                m.chat,
                { 
                    audio: { url: response },
                    mimetype: 'audio/mpeg',
                    ptt: false, // إرسال كموسيقى
                    fileName: `${search.videos[0].title}.mp3`
                },
                { quoted: m }
            );

            // إرسال الرسالة النصية
            const message = `✅ تم تحميل بنجاح.\n\n*❀ تابعني على إنستغرام :*\n\n*instagram.com/dj_flibu_remix*\n\n*❀ مطور البوت :*\n\n*https://wa.me/212645106267*`;
            conn.reply(m.chat, message, m);

            // إضافة رد تفاعل عند النجاح
            await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } }); // تفاعل عند النجاح

        } catch (e) {
            conn.reply(m.chat, `❌ حدث خطأ أثناء العملية.\n\n> ${e}`, m);

            // إضافة رد تفاعل عند الخطأ
            await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } }); // تفاعل عند الخطأ
        }
    }

    // التعامل مع الأمر song2 (الرابط المباشر)
    if (command === 'song2') {
        if (!text) return conn.reply(m.chat, `*❀  أدخل رابط لتحميل الصوت مباشرة من يوتيوب*\n\n*❀ مثال :*\n *${usedPrefix + command}* https://youtu.be/Xvat-B1Ysww?si=Nk63ZU9Y5BHW4EHC`, m);

        try {
            if (m.text.includes('http://') || m.text.includes('https://') || m.text.includes('youtube.com') || m.text.includes('youtu.be')) {
                // تحميل الصوت عبر رابط
                const api = await axios.get(`https://api-rin-tohsaka.vercel.app/download/ytmp3?url=${text}`);
                const response = api.data.data.download;

                // إرسال الموسيقى
                await conn.sendMessage(
                    m.chat,
                    { 
                        audio: { url: response },
                        mimetype: 'audio/mpeg',
                        ptt: false, // إرسال كموسيقى
                        fileName: `song2.mp3`
                    },
                    { quoted: m }
                );

                // إرسال الرسالة النصية الخاصة بـ song2
                const message = `✅ تم تحميل الصوت عبر الرابط بنجاح.\n\n*❀ تابعني على إنستغرام :*\n\n*instagram.com/dj_flibu_remix*\n\n*❀ مطور البوت :*\n\n*https://wa.me/212645106267*`;
                conn.reply(m.chat, message, m);

                // إضافة رد تفاعل عند النجاح
                await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } }); // تفاعل عند النجاح

            } else {
                return conn.reply(m.chat, `❀ أدخل رابط صحيح لتحميل الصوت باستخدام الأمر *song2*`, m);
            }
        } catch (e) {
            conn.reply(m.chat, `❌ حدث خطأ أثناء العملية.\n\n> ${e}`, m);

            // إضافة رد تفاعل عند الخطأ
            await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } }); // تفاعل عند الخطأ
        }
    }
};

handler.tags = ['downloader'];
handler.help = ['song | text', 'song2 | url'];
handler.command = ['song', 'song2'];
export default handler;
