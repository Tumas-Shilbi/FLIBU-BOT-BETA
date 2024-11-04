let handler = async (m, { conn }) => {
  await conn.removeProfilePicture(conn.user.jid)
  m.reply('تم بنجاح حذف صورة البروفايل الخاص بالبوت.')
}

handler.help = ['delprobot']
handler.tags = ['owner']
handler.command = /^(delprobot)$/i

export default handler
