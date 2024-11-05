import  { readdirSync, rmSync } from 'fs'

let handler = async (m, { conn, text }) => {
 const dir = './tmp'
 readdirSync(dir).forEach(f => rmSync(`${dir}/${f}`));
 let pesan = "*tmp* تم تنظيف المجلد"
 await m.reply(pesan)
}
handler.help = ['cleartmp']
handler.tags = ['owner']
handler.owner = true
handler.command = /^(cleartmp)$/i

export default handler
