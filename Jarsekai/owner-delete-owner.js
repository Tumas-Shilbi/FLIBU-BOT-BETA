let handler = async (m, { conn, text }) => {
  let who
  if (m.isGroup) {
    who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
  } else {
    who = m.chat
  }
  if (!who) throw '*قم بوضع علامة على الشخص الذي تريد إزالته كمالك*'

  const ownerId = who.split('@')[0]
  const ownerIndex = global.owner.findIndex(owner => owner[0] === ownerId)

  if (ownerIndex === -1) throw '*هذا الشخص ليس مالكًا !*'

  const removedOwner = global.owner.splice(ownerIndex, 1)[0]
  const caption = `@${removedOwner[0]}   *تمت إزالته كمالك.*`

  await conn.reply(m.chat, caption, m, {
    mentions: conn.parseMention(caption),
  })
}

handler.help = ['delete_owner @user']
handler.tags = ['owner']
handler.command = ['delete_owner']
handler.owner = true

export default handler
