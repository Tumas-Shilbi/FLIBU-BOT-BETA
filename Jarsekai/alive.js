import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
  let caption = `
╭────────────────────
│👋 مرحبا يا , ${conn.getName(m.sender)}!
│🤖 *أتمنى أنك بخير ♥  ان فليبو بوت هوا أفضل بوت فالعالم ان كنت لا تعلم فها انت دو علم بدالك الان*
╰────────────────────
*─[ BY ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ ]*🌟✨
`.trim()
  m.reply(caption)
}
handler.help = ['alive']
handler.tags = ['infobot']
handler.command = /^(alive)$/i


export default handler