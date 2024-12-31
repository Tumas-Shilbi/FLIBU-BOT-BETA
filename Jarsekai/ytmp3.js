import fetch from 'node-fetch'

let jarsepay = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, `❀ *ادخال رابط من اليوتيوب*\n*.ytmp3* https://youtu.be/Xvat-B1Ysww?si=UqYNZKH_3dRF5MrP`, m)

try {
let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp3?url=${text}`)
let json = await api.json()
let title = json.result.metadata.title
let dl_url = json.result.download.url
await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: `${title}.mp3`, mimetype: 'audio/mp4' }, { quoted: m })

} catch (error) {
console.error(error)
}}

jarsepay.tags = ['downloader-youtube']
jarsepay.help = ['ytmp3']
jarsepay.command = ['ytmp3']

export default jarsepay
