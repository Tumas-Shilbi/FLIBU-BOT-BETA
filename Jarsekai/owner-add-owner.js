let handler = async (m, { conn, text }) => {
  let who;
  if (m.isGroup) {
    who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
  } else {
    who = m.chat;
  }
  
  if (!who) throw '*قم بوضع علامة على الشخص الذي تريد أن تجعله مالكًا !*';
  
  let name = await conn.getName(who);
  if (global.owner.some(owner => owner[0] === who.split('@')[0])) throw '*هذا الشخص هو المالك بالفعل !*';
  
  global.owner.push([who.split('@')[0], name, true]);
  
  const caption = `*الآن لقد أصبح مالكًا !* @${who.split('@')[0]} `;
  await conn.reply(m.chat, caption, m, {
    mentions: conn.parseMention(caption),
  });
};

handler.help = ['add_owner @user'];
handler.tags = ['owner'];
handler.command = ['add_owner'];
handler.owner = true;

