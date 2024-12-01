let jarsepay = async (m, { conn }) => {
  if (!conn) {
    console.error('*كائن الاتصال غير محدد*');
    return; // or handle the error as appropriate
  }

  const ownerNumber = global.owner[0] ? global.owner[0][0] : 'https://wa.me/212645106267'; // Fallback

  let vcard = `BEGIN:VCARD
VERSION:3.0
N:;${ownerNumber};;;
FN:ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ
ORG:ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ
TITLE:ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ
item1.TEL;waid=${ownerNumber}:${ownerNumber}
item1.X-ABLabel:ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ
X-WA-BIZ-DESCRIPTION:مالك البوت
X-WA-BIZ-NAME:ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ
END:VCARD`;

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: 'Owner',
      contacts: [{ vcard }]
    }
  }, { quoted: m });
}

jarsepay.help = ['owner2'];
jarsepay.tags = ['infobot'];
jarsepay.command = ['owner2'];

export default jarsepay;
