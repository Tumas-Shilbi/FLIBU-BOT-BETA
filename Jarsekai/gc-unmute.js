let jarsepay = async (m, { conn, usedPrefix }) => {
	let chat = global.db.data.chats[m.chat]
	if (chat.isBanned === false) {
		m.reply('*لم يتم تعطيل البوت في هذه الدردشة*.')
		return
	}
	chat.isBanned = false
	await m.reply('*✅  تم تفعيل البوت في هذه المجموعة*.')
}
jarsepay.help = ['unmute']
jarsepay.tags = ['group']
jarsepay.command = ['unmute']

jarsepay.admin = true
jarsepay.group = true

export default jarsepay
