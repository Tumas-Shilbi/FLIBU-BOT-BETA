import fetch from 'node-fetch';

let HS = async (m, { conn, text }) => {
    if (!text) {
        return conn.reply(m.chat, `❀ *المرجو إدخال نص للتحدث مع ChatGPT*`, m);
    }

    try {
        let api = await fetch(`https://api.giftedtech.my.id/api/ai/gpt?apikey=gifted&q=${text}`);
        let json = await api.json();
        await m.reply(`✨ *الجواب :* 
        
${json.result}`);
    } catch (error) {
        console.error(error);
        await m.reply(`⚠️ *حدث خطأ أثناء الاتصال بالخدمة. المرجو المحاولة لاحقًا.*`);
    }
};

HS.command = /^(chatgpt)$/i;
HS.tags = ['chatgpt'];
HS.help = ['chatgpt'];

export default HS;
