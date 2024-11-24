//import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  let who
  if (m.isGroup)
    who = m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.quoted
        ? m.quoted.sender
        : text
          ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
          : false
  else who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
  let user = global.db.data.users[who]
  if (!who) return m.reply(`✳️ اذكر المستخدم\n\n📌 *مثال* :\n${usedPrefix + command} @tag`)
  if (!global.prems.includes(who.split`@`[0])) throw '*✳️ المستخدم ليس مميزًا*'
  let index = global.prems.findIndex(
    v =>
      v.replace(/[^0-9]/g, '') + '@s.whatsapp.net' ===
      who.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  )
  global.prems.splice(index, 1)
  conn.reply(m.chat, `✅ مميزا تمت ازالته \n\n@${who.split('@')[0]} أنت لم تعد مميزا`, m, {
    mentions: [who],
  })
}
handler.help = ['delete_premium @user']
handler.tags = ['owner']
handler.command = ['delete_premium']

handler.group = true
handler.rowner = true

export default handler
