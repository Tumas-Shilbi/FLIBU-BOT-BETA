import gplay from "google-play-scraper";

let handler = async (m, { conn, text }) => {
  const react = {
    react: {
      text: "⏳",  // رد إيموجي عند الانتظار
      key: m.key,
    },
  };
  const reactdone = {
    react: {
      text: "✅",  // رد إيموجي عند النجاح
      key: m.key,
    },
  };

  // إرسال تفاعل انتظار
  await conn.sendMessage(m.chat, react);

  if (!text) {
    return conn.reply(m.chat, "*⏳ المرجو إدخال اسم التطبيق الذي تريد البحث عنه.*", m);
  }

  let res = await gplay.search({ term: text });
  if (!res.length) {
    return conn.reply(m.chat, "*❌ المرجو إدخال اسم صحيح لتطبيق متاح على متجر Google Play.*", m);
  }

  let opt = {
    contextInfo: {
      externalAdReply: {
        title: res[0].title,
        body: res[0].summary,
        thumbnail: (await conn.getFile(res[0].icon)).data,
        sourceUrl: res[0].url,
      },
    },
  };

  res = res.map(
    (v) =>
      `*📲 التطبيق:* ${v.title}\n*✍️ المطور:* ${v.developer}\n*💸 السعر:* ${v.priceText}\n*📈 التقييم:* ${v.scoreText}\n*🔗 الرابط:* ${v.url}`
  ).join`\n\n`;

  // إرسال النتيجة مع تفاعل النجاح
  await conn.reply(m.chat, res, m, opt); 
  await conn.sendMessage(m.chat, reactdone);
};

handler.help = ['playstore-search']; 
handler.tags = ['dowloader'];
handler.command = /^(playstore-search)$/i; 
export default handler;
