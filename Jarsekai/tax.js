import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
 await m.react('🕐')
    try {
      let response = await fetch('https://dark-core-api.vercel.app/api/random/milf?key=api');
      let data = await response.json();

      if (!data.success) {
        return conn.reply(m.chat, '❌ لم أتمكن من الحصول على الصورة.  يرجى المحاولة مرة أخرى لاحقًا.', m);
      }

      await conn.sendFile(m.chat, data.url, 'milf.jpg', 'Aquí tienes 🔥', m);
     await m.react('🔥')
    } catch (error) {
      console.error(error);
      await conn.reply(m.chat, '❌ حدث خطأ أثناء استرداد الصورة.', m);
    }
  };

handler.help = ['tax'];
handler.tags = ['owner'];
handler.command = ['tax'];
handler.owner = true;
export default handler;
