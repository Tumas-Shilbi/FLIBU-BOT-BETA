import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
    // انتظار ⏳
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

    if (!text) {
        return conn.reply(m.chat, ` *المرجو إدخال نص للتحدث مع FLIBU AI*`, m);
    }

    try {
        let api = await fetch(`https://api.davidcyriltech.my.id/ai/lori?text=${encodeURIComponent(text)}`);
        let json = await api.json();

        if (json.success) {
            // نجاح ✅
            await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
            await m.reply(`*جوابك يا صديقي :*

${json.response}  


*❀  حسابي انستغرام :*\n\n *instagram.com/dj_flibu_remix*  
\n*❀  مطور البوت :*\n\n *https://wa.me/212645106267*`);
        } else {
            // خطأ ❌
            await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
            await m.reply(`*❌ حدث خطأ أثناء الحصول على الاستجابة.*`);
        }
    } catch (error) {
        console.error(error);
        // خطأ ❌
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
        await m.reply(`*❌ حدث خطأ أثناء معالجة طلبك.*`);
    }
};

handler.tags = ['flibu ai'];
handler.help = ['flibu-ai'];
handler.command = ['flibu-ai'];

export default handler;
