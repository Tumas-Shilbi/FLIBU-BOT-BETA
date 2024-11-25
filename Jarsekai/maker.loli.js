let handler = async (m, { conn }) => {
  let who = m.quoted
    ? m.quoted.sender
    : m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender
  conn.sendFile(
    m.chat,
    global.API('https://some-random-api.com', '/canvas/misc/lolice', {
      avatar: await conn
        .profilePictureUrl(who, 'image')
        .catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
    }),
    'error.png',
    '*🚔🚨 𝐋𝐎𝐋𝐈𝐂𝐎𝐍𝐒 كأنك تنتمي فقط إلى السجن 🚨🚔*\n\n*www.instagram.com/dj_flibu_remix*',
    m
  )
}
handler.help = ['lolicon']
handler.tags = ['maker']
handler.command = /^(lolicon)$/i
export default handler
