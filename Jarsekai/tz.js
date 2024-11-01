import moment from 'moment-timezone';

const handler = async (m, {conn}) => {

  const tzAF = moment().tz('Africa/Casablanca').format('DD/MM HH:mm');
  await conn.sendMessage(m.chat, {text: `\`\`\`
الوقت الحالي في المغرب هو :


▢ morocco     : ${tzAF}
  ${String.fromCharCode(8206).repeat(850)}
  ▢ instagram.com/dj_flibu_remix`}, {quoted: m});
  };
handler.help = ["date_hour"]
handler.tags = ["infobot"]
handler.command = /^(date_hour)$/i
  export default handler;