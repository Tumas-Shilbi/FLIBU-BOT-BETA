import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        const react = {
            react: {
                text: "⏳",  // رد إيموجي عند الانتظار
                key: m.key,
            },
        };
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
        return conn.reply(m.chat, `*❀ *المرجو إدخال نص للتحدث مع ChatGPT*`, m);
    }

    try {
        const react = {
            react: {
                text: "⏳",  // رد إيموجي عند الانتظار
                key: m.key,
            },
        };
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

        let prompt = 'eres hasumi, creado por JTxs, tu proposito es ayudar a los usuarios respondiendo sus preguntas';
        let api = await axios.get(`https://restapi.apibotwa.biz.id/api/gptlogic?message=${text}&prompt=${prompt}`);
        let json = api.data;

        const reactdone = {
            react: {
                text: "✅",  // رد إيموجي عند النجاح
                key: m.key,
            },
        };
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        m.reply(`✨ *الجواب :*\n\n${json.data.response}
\n*❀ تابعني في حسابي :*

*instagram.com/dj_flibu_remix*

*❀ مطور البوت :*

*https://wa.me/212645106267*\n`);
    } catch (error) {
        console.error(error);

        const reacterror = {
            react: {
                text: "❌",  // رد إيموجي عند الخطأ
                key: m.key,
            },
        };
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
        await m.reply(`*❌ حدث خطأ أثناء العملية.*\n⚠️ *المرجو المحاولة لاحقًا.*`);
    }
};
handler.tags = ['ai']
handler.help = ['chatgpt']
handler.command = ['chatgpt'];

export default handler;
