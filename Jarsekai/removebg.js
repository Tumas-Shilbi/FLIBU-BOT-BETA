import axios from "axios";
import FormData from "form-data";

const api = axios.create({ baseURL: "https://api4g.iloveimg.com" });

// إعداد المهمة
const getTaskId = async () => {
  const { data: html } = await axios.get("https://www.iloveimg.com/id/hapus-latar-belakang");
  api.defaults.headers.post["authorization"] = `Bearer ${html.match(/ey[a-zA-Z0-9?%-_/]+/g)[1]}`;
  return html.match(/taskId = '(\w+)/)[1];
};

// رفع الصورة إلى الخادم
const uploadImageToServer = async (imageBuffer) => {
  const taskId = await getTaskId();

  const fileName = Math.random().toString(36).slice(2) + ".jpg";
  const form = new FormData();
  form.append("name", fileName);
  form.append("chunk", "0");
  form.append("chunks", "1");
  form.append("task", taskId);
  form.append("preview", "1");
  form.append("pdfinfo", "0");
  form.append("pdfforms", "0");
  form.append("pdfresetforms", "0");
  form.append("v", "web.0");
  form.append("file", imageBuffer, fileName);

  const reqUpload = await api.post("/v1/upload", form, { headers: form.getHeaders() }).catch((e) => e.response);
  if (reqUpload.status !== 200) throw reqUpload.data || reqUpload.statusText;

  return { serverFilename: reqUpload.data.server_filename, taskId };
};

// إزالة الخلفية
const removeBg = async (imageBuffer, responseType = "arraybuffer") => {
  const { serverFilename, taskId } = await uploadImageToServer(imageBuffer);

  const form = new FormData();
  form.append("task", taskId);
  form.append("server_filename", serverFilename);

  const reqRmbg = await api
    .post("/v1/removebackground", form, {
      headers: form.getHeaders(),
      responseType,
    })
    .catch((e) => e.response);
  const type = reqRmbg.headers["content-type"];
  if (reqRmbg.status !== 200 || !/image/.test(type))
    throw JSON.parse(reqRmbg.data?.toString() || '{"error":{"message":"حدث خطأ ما"}}');

  return reqRmbg.data;
};

// المعالج الرئيسي
let handler = async (m, { conn }) => {
  // التفاعل بالإيموجي للانتظار
  await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

  if (!m.quoted || !m.quoted.mimetype || !m.quoted.mimetype.startsWith("image")) {
    return m.reply(
      "❌ الرجاء الرد على الصورة مع التسمية التوضيحية *removebg.* لإزالة خلفيتها"
    );
  }

  m.reply("*⏳ جاري معالجة طلبك...*");

  try {
    const imageBuffer = await m.quoted.download();
    const result = await removeBg(imageBuffer);

    // التفاعل بالإيموجي عند النجاح
    await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

    await conn.sendFile(
      m.chat,
      result,
      "no-bg.png",
      `*✅ تم التنفيذ بنجاح!*\n\n*❀ تابعني على إنستغرام :*\n*instagram.com/dj_flibu_remix*\n\n*❀ مطور البوت :*\n*https://wa.me/212645106267*`,
      m
    );
  } catch (error) {
    console.error("Error:", error);
    m.reply("*❌ حدث خطأ أثناء العملية.*");
  }
};

handler.help = handler.command = ["removebg"];
handler.tags = ["tools"];
export default handler;
