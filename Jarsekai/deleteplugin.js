import { tmpdir } from "os";
import path, { join } from "path";
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch,
} from "fs";

let handler = async (
  m,
  { conn, usedPrefix, usedPrefix: _p, __dirname, args, text, command },
) => {
  const pluginsDir = join(__dirname, "../Jarsekai/");

  // قراءة جميع الملفات في مجلد plugins
  if (!existsSync(pluginsDir)) {
    throw `*❌ مجلد "Jarsekai" غير موجود.*`;
  }

  let pluginFiles = readdirSync(pluginsDir).filter(file => file.endsWith(".js"));
  let ar1 = pluginFiles.map(file => file.replace(".js", ""));

  if (!text) throw `أين النص؟\n\n مثال :\n${usedPrefix + command} play`;

  if (!ar1.includes(args[0])) {
    return m.reply(
      `*❌ لم يتم العثور على المكون الإضافي*\n==================================\n\n${ar1.map((v) => " " + v).join`\n`}`
    );
  }

  const file = join(pluginsDir, args[0] + ".js");

  try {
    unlinkSync(file);
    conn.reply(m.chat, `*✅ تم حذف "Jarsekai${args[0]}.js" بنجاح!*`, m);
  } catch (error) {
    conn.reply(m.chat, `*❌ حدث خطأ أثناء حذف الملف:* ${error.message}`, m);
  }
};

handler.help = ["deleteplugin", "df"];
handler.tags = ["owner"];
handler.command = /^(df|deleteplugin)$/i;
handler.owner = true;
export default handler;
