/* Lyrics By WillZek 
- Free Codes Titan 
- https://github.com/WillZek
- https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S 
*/

// [⌨️] Letra De Canciones

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) {
        await m.reply('*🍭 الرجاء إدخال اسم أغنية.*');
        return;
    }

    // إظهار إيموجي انتظار
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

    try {
        let api = `https://archive-ui.tanakadomp.biz.id/search/lirik?q=${text}`;
        let responde = await fetch(api);
        let json = await responde.json();
        let crow = json.result;

        let txt = `*Nombre:* ${crow.title}\n*Letra:* ${crow.lyrics}\n\n\n` +
                  `*❀ حسابي انستغرام :*\n\n` +
                  `*instagram.com/dj_flibu_remix*\n\n` +
                  `*❀ مطور البوت :*\n\n` +
                  `*https://wa.me/212645106267*`;

        let img = crow.thumb;

        await conn.sendMessage(m.chat, { image: { url: img }, caption: txt }, { quoted: m });
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (e) {
        console.log(e);
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
        await m.reply('*❌ لم يتم العثور على كلمات الأغنية المطلوبة.*');
    }
};

handler.tags = ['search'];
handler.help = ['lyrics'];
handler.command = ['lyrics'];

export default handler;
