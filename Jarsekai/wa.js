let handler = async (m, { conn, usedPrefix, text, command }) => {
  let waLin = ''
  if (text) {
    waLin = text.replace(/[^0-9]/g, '')
  } else if (m.quoted) {
    waLin = m.quoted.sender.replace(/[^0-9]/g, '')
  } else if (m.mentionedJid && m.mentionedJid[0]) {
    waLin = m.mentionedJid[0].replace(/[^0-9]/g, '')
  } else {
    throw `*يرجى تقديم رقم أو ذكر اسم مستخدم*`
  }
  const waLink = `https://wa.me/${waLin}`
  const message = `*WhatsApp Link:*\n${waLink}`

  conn.sendMessage(m.chat, { text: message, quoted: m, contextInfo: { mentionedJid: [m.sender] } })

  m.react('✅')
}

handler.help = ['whatsApp_link']
handler.tags = ['tools']
handler.command = ['whatsapp_link']

export default handler
