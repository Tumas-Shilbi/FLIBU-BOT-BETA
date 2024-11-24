let handler = async (m, { conn, args, usedPrefix, command }) => {
  let who
  if (m.isGroup) who = args[1] ? args[1] : m.chat
  else who = args[1]

  if (new Date() * 1 < global.db.data.chats[who].expired) global.db.data.chats[who].expired = false
  else global.db.data.chats[who].expired = false

  m.reply(`*✅ تمت إزالة أيام انتهاء الصلاحية لهذه المجموعة*`)
}
handler.help = ['un_delete_group']
handler.tags = ['owner']
handler.command = ['un_delete_group']
handler.rowner = true
handler.group = true

export default handler
