import fetch from 'node-fetch';

let jarsepay = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `❀ *الرجاء إدخال رابط من اليوتيوب* 📹\n*.ytmp4* https://youtu.be/Xvat-B1Ysww?si=UqYNZKH_3dRF5MrP`, m)

  try {
    conn.reply(m.chat, `⌛️ *جاري معالجة الفيديو...* 🕒`, m);  // إظهار رسالة التحميل أثناء المعالجة

    let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp4?url=${text}`);
    let json = await api.json();
    let title = json.data.metadata.title;
    let dl_url = json.data.download.url;

    await conn.sendMessage(m.chat, { video: { url: dl_url }, fileName: `${json.data.filename}.mp4`, mimetype: "video/mp4" }, { quoted: m });

    conn.reply(m.chat, `✅ *تم تحميل الفيديو بنجاح!* 🎉`, m);  // رسالة بعد إتمام التحميل بنجاح

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `❌ *حدث خطأ أثناء تنزيل الفيديو!* 😞`, m);  // رسالة عند حدوث خطأ
  }
}

jarsepay.tags = ['downloader-youtube'];
jarsepay.help = ['ytmp4'];
jarsepay.command = ['ytmp4'];

export default jarsepay;
