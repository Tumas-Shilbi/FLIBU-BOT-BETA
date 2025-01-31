import fs from "fs";
import path from "path";

const handler = async (m, { conn }) => {
  const directory = "./jarsepay/sessions"; // تعديل المسار
  function deleteFilesExceptOne(directory, fileNameToKeep) {
    fs.readdir(directory, (err, files) => {
      if (err) {
        console.error("هناك خطأ:", err);
        m.reply("*❌ حدث خطأ أثناء قراءة المجلد.*");
        return;
      }

      files.forEach((file) => {
        const filePath = path.join(directory, file);
        if (file !== fileNameToKeep) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`فشل حذف الملف ${file}:`, err);
              m.reply(`*❌ فشل حذف الملف ${file}.*`);
            } else {
              console.log(`تم حذف الملف ${file} بنجاح.`);
            }
          });
        }
      });
    });
  }

  deleteFilesExceptOne(directory, "creds.json");
  m.reply("*✅ تم حذف جميع الملفات بنجاح باستثناء creds.json.*");
};

handler.command = handler.help = ["clearsessionusers","sps"];
handler.tags = ["owner"];
handler.owner = true;
export default handler;
