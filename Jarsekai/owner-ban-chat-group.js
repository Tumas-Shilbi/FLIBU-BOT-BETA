//import db from '../lib/database.js'

let handler = async (m, { conn, isOwner, isAdmin, isROwner }) => {
  if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
  global.db.data.chats[m.chat].isBanned = true
  m.reply('*✅  تم تعطيل البوت في هذه المجموعة*')
}
handler.help = ['banchat <group>']
handler.tags = ['owner']
handler.command = ['banchat', 'chatoff']

export default handler
