//import db from '../lib/database.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
  else who = m.chat
  let user = global.db.data.users[who]
  if (!who) throw `✳️ قم بالإشارة إلى شخص ما أو الإشارة إليه\n\n📌 مثال : ${usedPrefix + command} @user`
  if (global.prems.includes(who.split`@`[0])) throw '*✳️ المستخدم المذكور بالفعل هو مميز*'
  global.prems.push(`${who.split`@`[0]}`)

  conn.reply(
    m.chat,
    `
✅ PREMIUM

@${who.split`@`[0]} الآن أصبحت مستخدمًا مميزًا
┌───────────
▢ *Number:* ${user.name}
└───────────
`,
    m,
    { mentions: [who] }
  )
}
handler.help = ['add_premium <@tag>']
handler.tags = ['owner']
handler.command = ['add_premium']

handler.group = true
handler.rowner = true

export default handler
