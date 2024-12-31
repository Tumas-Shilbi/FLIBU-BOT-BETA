import fetch from 'node-fetch';

let jarsepay = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `❀ *الرجاء إدخال رابط من اليوتيوب* 📹\n*.ytmp4* https://youtu.be/Xvat-B1Ysww?si=UqYNZKH_3dRF5MrP\n\n🔽 مثال: *.ytmp4 https://youtu.be/xxxxxxx*`, m);

  try {
    conn.reply(m.chat, `⌛️ *جاري معالجة الفيديو...* 🕒`, m);  // إظهار رسالة التحميل أثناء المعالجة

    let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp4?url=${text}`);
    let json = await api.json();
    let title = json.data.metadata.title;
    let dl_url = json.data.download.url;

    let sentMsg = await conn.sendMessage(m.chat, { video: { url: dl_url }, fileName: `${json.data.filename}.mp4`, mimetype: "video/mp4" }, { quoted: m });

    // إضافة رد فعل بعد إرسال الفيديو بنجاح
    await conn.sendMessage(m.chat, { react: { text: '🎉', key: sentMsg.key } });

    // إرسال رسالة تأكيد بعد تحميل الفيديو بنجاح
    await conn.reply(m.chat, `✅ *تم تحميل الفيديو بنجاح!* 🎉`, m);

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `❌ *حدث خطأ أثناء تنزيل الفيديو!* 😞`, m);  // رسالة عند حدوث خطأ
  }
}

jarsepay.tags = ['downloader-youtube'];
jarsepay.help = ['ytmp4'];
jarsepay.command = ['ytmp4'];

export default jarsepay;
