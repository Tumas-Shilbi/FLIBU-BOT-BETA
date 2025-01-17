let handler = async (m, { conn, usedPrefix }) => {
  try {
    // إضافة رمز ⏳ عند بداية التنفيذ
    const react = {
      react: {
        text: "⏳",
        key: m.key
      }
    }
    await conn.sendMessage(m.chat, react)

    // جلب البيانات العشوائية للاقتباسات
    let quotesData = await (await fetch("https://raw.githubusercontent.com/Dark-Man747/worker-bot/main/quote.json")).json()
    const randomIndex = quotesData[Math.floor(Math.random() * quotesData.length)]
    const message = `*الاقتباس:*

${randomIndex} 
\n*تابعني في حسابي :*
*instagram.com/dj_flibu_remix*`

    // إرسال الرسالة
    await conn.reply(m.chat, message, m)

    // إضافة رمز ✅ عند النجاح
    const reactdone = {
      react: {
        text: "✅",
        key: m.key
      }
    }
    await conn.sendMessage(m.chat, reactdone)

  } catch (e) {
    console.log(e)
    await conn.reply(m.chat, 'حدث خطأ أثناء استرجاع الاقتباس.', m)
  }
}
handler.command = ['quote']
handler.tags = ['maker']
handler.help = ['quote']
export default handler
