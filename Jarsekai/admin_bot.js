import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
  let caption = `
*「 معلومات عن صاحب البوت 」*

*Number :*\nwa.me/212645106267
*instagram:*\ninstagram.com/dj_flibu_remix

*youtube:*\nyoutube.com/@FLIBU_GAMING

*facebook page:*\nwww.facebook.com

*script bot :* github.com

`.trim()
  m.reply(caption)
}
handler.help = ['owner']
handler.tags = ['infobot']
handler.command = /^(owner)$/i
handler.limit = false

export default handler