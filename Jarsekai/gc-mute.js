let jarsepay = async (m, { conn, usedPrefix }) => {
	let chat = global.db.data.chats[m.chat]
	if (chat.isBanned === true) {
		m.reply('تم تعطيل البوت في هذه الدردشة بالفعل.')
		return
	}
	chat.isBanned = true
	await m.reply('*✅  تم تعطيل البوت في هذه المجموعة*.')
}
jarsepay.help = ['mute']
jarsepay.tags = ['group']
jarsepay.command = ['mute']

jarsepay.admin = true
jarsepay.group = true

export default jarsepay
