import fetch from 'node-fetch'
let handler = async (m, {
    conn,
    usedPrefix
}) => {
    await conn.sendMessage(m.chat, {
        react: {
            text: '😍',
            key: m.key,
        }
    })
    let res = await fetch('https://api.waifu.pics/sfw/waifu')
    if (!res.ok) throw await res.text()
    let json = await res.json()
    if (!json.url) throw 'Error!'
    await conn.sendFile(m.chat, json.url, null, "• 𝙵𝙻𝙸𝙱𝚄 𝙱𝙾𝚃 ♥︎ *instagram.com/dj_flibu_remix* *https://wa.me/212645106267*", m)
    
}
handler.help = ['animepic']
handler.tags = ['anime']
handler.command = /^(animepic)$/i
export default handler
