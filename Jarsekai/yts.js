import yts from 'yt-search'

var handler = async (m, { text, conn, args, command, usedPrefix }) => {
  // تعريف المتغيرات
  const packname = "FLIBU-BOT"; // اسم البوت أو الحزمة
  const wm = "FLIBU Watermark"; // نص اختياري يظهر كعلامة مائية
  const icons = "https://example.com/thumbnail.jpg"; // رابط لصورة مصغرة (يمكنك تغييره)
  const channel = "https://youtube.com"; // رابط القناة أو موقع يوتيوب
  const waitMessage = "🍟 *يرجى الانتظار، يتم جلب النتائج الآن...*";

  // تعريف ردود الفعل
  const react = {
    react: {
      text: "⏳", // رمز انتظار
      key: m.key,
    },
  };
  const reactdone = {
    react: {
      text: "✅", // رمز نجاح
      key: m.key,
    },
  };

  // التحقق من إدخال النص
  if (!text) {
    return conn.reply(
      m.chat,
      `🍟 *الرجاء كتابة عنوان الفيديو الذي تبحث عنه*\n\n📌 *مثال:*\n*.yts* DJ FLIBU REMIX`,
      m
    );
  }

  // إرسال رد فعل "⏳" للإشارة إلى الانتظار
  await conn.sendMessage(m.chat, react);

  // عرض رسالة انتظار
  conn.reply(m.chat, waitMessage, m, {
    contextInfo: {
      externalAdReply: {
        mediaUrl: null,
        mediaType: 1,
        showAdAttribution: true,
        title: packname,
        body: wm,
        previewType: 0,
        thumbnail: icons,
        sourceUrl: channel,
      },
    },
  });

  // البحث عن النتائج
  let results = await yts(text);
  let tes = results.all;

  // التحقق إذا كانت النتائج فارغة
  if (tes.length === 0) {
    // إرسال رد فعل "✅" إذا لم يتم العثور على نتائج
    await conn.sendMessage(m.chat, reactdone);
    return conn.reply(m.chat, "*❌ لم يتم العثور على أي نتائج.*", m);
  }

  // تنسيق النصوص المستخرجة من النتائج
  let teks = tes
    .map((v) => {
      if (v.type === 'video') {
        return `🍟 *العنوان:* 
» ${v.title}

🔗 *الرابط:* 
» ${v.url}

🕝 *المدة:* 
» ${v.timestamp}

🚩 *تم النشر منذ:* 
» ${v.ago}

👀 *عدد المشاهدات:* 
» ${v.views}`;
      }
    })
    .filter((v) => v)
    .join('\n\n••••••••••••••••••••••••••••••••••••\n\n');

  // إرسال رد فعل "✅" عند الانتهاء من العملية
  await conn.sendMessage(m.chat, reactdone);

  // إرسال النتائج
  if (tes[0].thumbnail) {
    conn.sendFile(m.chat, tes[0].thumbnail, 'yts.jpeg', teks, m);
  } else {
    conn.reply(m.chat, teks, m);
  }
};

// الإعدادات
handler.help = ['ytsearch | yts'];
handler.tags = ['search'];
handler.command = ['playlist','yts', 'ytsearch'];

export default handler;
