let handler = async (m, { conn, usedPrefix, isOwner }) => {
  let vcard = `BEGIN:VCARD
VERSION:3.0
N:;ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ;;;
FN:ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ
ORG:ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ
TITLE:Owner
item1.TEL;waid=212645106267:212645106267
item1.X-ABLabel:Developer of the Bot
X-WA-BIZ-DESCRIPTION:مطور البوت
X-WA-BIZ-NAME:ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ
END:VCARD`;

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: 'ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ',
      contacts: [{ vcard }]
    }
  }, { quoted: m });
}

handler.help = ['bot_developer'];
handler.tags = ['infobot'];
handler.command = ['bot_developer'];

export default handler;
