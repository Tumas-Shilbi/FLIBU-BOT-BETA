let handler = async (m, { conn }) => {

m.reply(`*قناتي على الواتساب:*\n
*https://whatsapp.com/channel/0029VafPIGU2975ALj4uYl1g*

*تابعني هناك ♥*`)
}
handler.help = ['channel']
handler.tags = ['infobot']
handler.command = /^(channel)$/i

export default handler;
