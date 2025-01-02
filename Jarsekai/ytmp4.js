import fetch from 'node-fetch';

let jarsepay = async (m, { conn, text, usedPrefix, command }) => {
  // رد فعل عند الإدخال الخاطئ
  const react = {
    react: {
      text: "⏳",  // رمز تعبيري للإشارة إلى المعالجة
      key: m.key
    }
  }

  const reactdone = {
    react: {
      text: "✅",  // رمز تعبيري للإشارة إلى النجاح
      key: m.key
    }
  }

  // التحقق من وجود رابط
  if (!text) {
    await conn.sendMessage(m.chat, react);  // إرسال رمز تعبيري "⏳" عند الإدخال الخاطئ
    return conn.reply(m.chat, `❀ *الرجاء إدخال رابط من اليوتيوب* 📹\n*.ytmp4* https://youtu.be/Xvat-B1Ysww?si=UqYNZKH_3dRF5MrP`, m);
  }

  try {
    // إعلام المستخدم ببدء المعالجة
    conn.reply(m.chat, `⌛️ *جاري معالجة الفيديو...* 🕒`, m);  

    // طلب البيانات من API
    let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp4?url=${text}`);
    let json = await api.json();

    // استخراج البيانات
    let title = json.data.metadata.title;
    let dl_url = json.data.download.url;

    // إرسال الفيديو إلى المستخدم
    let sentMsg = await conn.sendMessage(m.chat, { 
      video: { url: dl_url }, 
      fileName: `${json.data.filename}.mp4`, 
      mimetype: "video/mp4" 
    }, { quoted: m });

    // إضافة رد فعل بعد إرسال الفيديو بنجاح
    await conn.sendMessage(m.chat, { react: { text: '🎉', key: sentMsg.key } });

    // إعلام المستخدم بنجاح تحميل الفيديو
    await conn.reply(m.chat, `✅ *تم تحميل الفيديو بنجاح!* 🎉`, m);
    await conn.sendMessage(m.chat, reactdone);  // رد "✅" عند النجاح

  } catch (error) {
    console.error(error);

    // إعلام المستخدم بوجود مشكلة
    conn.reply(m.chat, `❌ *حدث خطأ أثناء تنزيل الفيديو!* 😞`, m);  // رسالة عند حدوث خطأ

    // إضافة رد فعل عند الخطأ
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
  }
}

jarsepay.tags = ['downloader'];
jarsepay.help = ['ytmp4'];
jarsepay.command = ['ytmp4'];

export default jarsepay
