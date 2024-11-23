import fs from 'fs/promises';
import path from 'path';

let handler = async (m, { text, usedPrefix, command, __dirname }) => {
  if (!text) {
    m.reply(`يستخدم :  <اسم الملف>  ${usedPrefix + command} \n❇️ مثال :\n${usedPrefix}getfile main.js`);
    return;
  }
  
  const filePath = path.join(__dirname, text);
  try {
    await fs.access(filePath); // Check if file exists
    const fileContent = await fs.readFile(filePath, 'utf8');
    m.reply(fileContent);
  } catch (e) {
    if (e.code === 'لا شيء') {
      m.reply(`❌  خطأ: *لا يوجد ملف اسمه* "${text}" found.`);
    } else {
      console.error(e);
      m.reply(`*❌ خطأ*: ${e.message}`);
    }
  }
}

handler.help = ['getfile <filename>'];
handler.tags = ['owner'];
handler.command = ['getfile'];
handler.rowner = true;

export default handler;
