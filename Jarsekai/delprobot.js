let handler = async (m, { conn, isOwner }) => {
  // التحقق إذا كان المستخدم هو Owner
  if (!isOwner) {
    return m.reply("*❌ هذه الميزة مخصصة للـ Owner فقط.*");
  }

  // حذف صورة البروفايل الخاص بالبوت
  await conn.removeProfilePicture(conn.user.jid);
  m.reply('تم بنجاح حذف صورة البروفايل الخاص بالبوت.');
};

handler.help = ['delprobot'];
handler.tags = ['owner'];
handler.command = /^(delprobot)$/i;

export default handler;
