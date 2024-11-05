import os from 'os'

let handler = async (m, { conn, text }) => {
  let totalStorage = Math.floor(os.totalmem() / 1024 / 1024) + 'MB'
  let freeStorage = Math.floor(os.freemem() / 1024 / 1024) + 'MB'
  let cpuModel = os.cpus()[0].model
  let cpuSpeed = os.cpus()[0].speed / 1000
  let cpuCount = os.cpus().length

  let message = `
*مواصفات الروبوت الخاص بك*:

• *إجمالي التخزين* : ${totalStorage}
• *تخزين مجاني* : ${freeStorage}
• *نموذج وحدة المعالجة المركزية* : ${cpuModel}
• *سرعة وحدة المعالجة المركزية* : ${cpuSpeed} GHz
• *عدد نوى وحدة المعالجة المركزية* : ${cpuCount}
`

  m.reply(message)
}

handler.help = ['botspec']
handler.tags = ['infobot']
handler.command = /^botspec$/i

export default handler
