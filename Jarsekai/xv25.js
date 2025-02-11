import fetch from 'node-fetch';
import { jidDecode } from '@whiskeysockets/baileys';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  // التحقق من إدخال الرابط
  if (!args[0]) {
    await conn.sendMessage(m.chat, { text: '*🍭 المرجو إدخال رابط Xnxx*' });
    return;
  }

  try {
    // إرسال إيموجي انتظار
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

    // التحقق من معرف المستخدم
    const decodedJid = jidDecode(m.key.remoteJid);
    if (!decodedJid) {
      await conn.sendMessage(m.chat, { text: '*❌ لم يتم التعرف على معرف المستخدم.*' });
      return;
    }

    // استدعاء API لجلب البيانات
    let api = `https://archive-ui.tanakadomp.biz.id/download/xnxx?url=${args[0]}`;
    let responde = await fetch(api);
    let json = await responde.json();
    let crow = json.result;

    let resul = `*🎥 العنوان:* ${crow.title}\n\n*✅ تم تحميل الفيديو بنجاح*\n\n*❀ حسابي انستغرام :*\ninstagram.com/dj_flibu_remix\n\n*❀ مطور البوت :*\nhttps://wa.me/212645106267`;
    let img = crow.image;
    let vid = crow.files.low;

    // إرسال الصورة
    await conn.sendFile(m.chat, img, 'crow.jpg', '*⏳ جاري إرسال النتائج...*', m, null);

    // إرسال الفيديو مع العنوان ورسالة النجاح
    await conn.sendMessage(
      m.chat, 
      { video: { url: vid }, caption: resul },
      { quoted: m }
    );

    // إرسال إيموجي نجاح
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (e) {
    console.log(e);
    // رسالة خطأ
    await conn.sendMessage(m.chat, { text: '*❌ حدث خطأ أثناء العملية.*' });
  }
};

handler.command = ['xv25'];
handler.owner = true;
export default handler;
