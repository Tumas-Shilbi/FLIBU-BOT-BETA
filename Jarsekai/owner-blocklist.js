let handler = async (m, { conn }) => {
  await conn
    .fetchBlocklist()
    .then(async data => {
      let txt = `*≡ القائمة المحظورة*\n\n*المجموع :* ${data.length}\n\n┌─⊷\n`
      for (let i of data) {
        txt += `▢ @${i.split('@')[0]}\n`
      }
      txt += '└───────────'
      return conn.reply(m.chat, txt, m, { mentions: await conn.parseMention(txt) })
    })
    .catch(err => {
      console.log(err)
      throw '*لا يوجد ارقام محظورة*'
    })
}
handler.help = ['blocklist']
handler.tags = ['info']
handler.command = ['blocklist', 'listblock']
handler.rowner = true
export default handler
