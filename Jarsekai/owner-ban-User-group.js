//import db from '../lib/database.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
  else who = m.chat
  let user = global.db.data.users[who]
  if (!who) throw `*✳️ علامة أو ذكرشخص ما*\n\n📌 مثال : ${usedPrefix + command} @user`
  let users = global.db.data.users
  users[who].banned = true
  conn.reply(
    m.chat,
    `
✅ محظور

───────────
@${who.split`@`[0]} لن تتمكن من استخدام أوامري بعد الآن `,
    m,
    { mentions: [who] }
  )
}
handler.help = ['ban <group> @user']
handler.tags = ['owner']
handler.command = /^ban$/i
handler.rowner = true

export default handler
