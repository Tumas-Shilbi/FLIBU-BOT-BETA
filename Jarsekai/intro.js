import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command, conn }) => {
  try {
    // Expanded intro card text with additional fields
    const introText = `
 ◈ •╭═══ ━ ━ • ━ ━ ━ ═══♡᭄
 ◈ •│       「 𝗠𝗬 𝗜𝗡𝗧𝗥𝗢 」
 ◈ •│ Name    : 𝙷𝙸𝙲𝙷𝙰𝙼
 ◈ •│
 ◈ •│ Place     : 𝙺𝙴𝙽𝙸𝚃𝚁𝙰
 ◈ •│
 ◈ •│ Gender  : 𝙼𝙰𝙻𝚁
 ◈ •│
 ◈ •│ Age        : 20_
 ◈ •│
 ◈ •│ Status   : 𝙳𝙴𝚅𝙴𝙻𝙾𝙿𝙴𝚁
 ◈ •│
 ◈ •│ Skills     : 𝙹𝙰𝚅𝙰𝚂𝙲𝚁𝙸𝙿𝚃
 ◈ •│
 ◈ •│ Lang     : 𝙴𝙽𝙶𝙻𝙸𝚂𝙷,𝙰𝚁𝙰𝙱𝙸𝙲
 ◈ •│
 ◈ •│ Project  : 𝙵𝙻𝙸𝙱𝚄-𝙱𝙾𝚃-𝙱𝙴𝚃𝙰
 ◈ •│
 ◈ •│ Hobbie  : 𝙲𝙾𝙳𝙸𝙽𝙶,𝙱𝙾𝚃𝚂
 ◈ •╰═══ ━ ━ • ━ ━ ━ ═══♡᭄
    `;

    let pp = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

    // Try fetching the profile picture of the sender
    try {
      pp = await conn.profilePictureUrl(m.sender);
    } catch (e) {
      console.log("*خطأ في جلب صورة الملف الشخصي*:", e);
    }

    const sourceUrl = 'https://youtube.com/@flibu_gaming'; // Example source URL for the card

    const contextInfo = {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: 'FLIBU-BOT-BETA', // Title of the card
        body: 'ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ',
        thumbnailUrl: 'https://avatars.githubusercontent.com/u/161664729?v=4', // Fixed URL syntax with quotes
        mediaUrl: 'https://avatars.githubusercontent.com/u/161664729?v=4', // Fixed URL syntax with quotes
        sourceUrl: sourceUrl, // Source URL for the card
      },
    };

    // Send the message with the extended intro text and external ad reply
    await conn.sendMessage(m.chat, { text: introText, contextInfo }, { quoted: m });

  } catch (e) {
    console.error(e);
    await conn.sendMessage(m.chat, { text: `*❌ لقد حدث خطأ ما*: ${e.message}` }, { quoted: m });
  }
};

handler.help = ['intro'];
handler.tags = ['fun'];
handler.command = /^|intro|duction$/i;

export default handler;
