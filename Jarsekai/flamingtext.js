let handler = async (m, { conn, text, args, command, prefix }) => {
const models = {
'fluffy-logo': 'fluffy-logo',
'lava-logo': 'lava-logo',
'cool-logo': 'cool-logo',
'comic-logo': 'comic-logo',
'fire-logo': 'fire-logo',
'water-logo': 'water-logo',
'ice-logo': 'ice-logo',
'elegant-logo': 'elegant-logo',
'gold-logo': 'gold-logo',
'blue-logo': 'blue-logo',
'silver-logo': 'silver-logo',
'neon-logo': 'neon-logo',
'retro-logo': 'retro-logo',
'candy-logo': 'candy-logo',
'glossy-logo': 'glossy-logo',
};

const modelList = Object.keys(models).map(model => `> ${model}`).join('\n');

if (!text) {
return m.reply(`*• الاستخدام مثال :*\n
.flamingtext fluffy-logo | flibu bot 

${modelList}`);
}

let response = args.join(' ').split('|');
if (!response[0] || !response[1]) {
return m.reply(`*• مـثـال :*\n
*.flamingtext* fluffy-logo | flibu bot`);
}

const model = response[0].trim();
const textInput = response[1].trim();

if (!models[model]) {
return m.reply(`*❌ النموذج غير صالح. اختر من بين :*\n
${modelList}`);
}

m.reply('⏳ *جاري المعالجة طلبك المرجو إنتظر لحظة...*');

const res = `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=${models[model]}&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text=${encodeURIComponent(textInput)}`;

await conn.sendFile(m.chat, res, 'flamingtext.jpg', '*🎉 تم التنفيذ بنجاح*\n\n*❀ حسابي انستغرام :*\n\n*instgram.com/dj_flibu_remix*\n\n*❀ مطور البوت :*\n\n*https://wa.me/212645106267*', m, false);
};

handler.help = handler.command = ['flamingtext'];
handler.tags = ['tools'];
export default handler;
