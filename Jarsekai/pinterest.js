import axios from "axios";

let handler = async (m, { conn, text }) => {
    // التحقق من وجود الرابط
    if (!text) throw "*❌ الرجاء إدخال رابط فيديو من Pinterest*           \n*مثال :*\n*.pinterest* https://pin.it/1vSANy6jC";

    try {
        // إرسال رسالة انتظار مع إيموجي
        await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });
        m.reply("*⏳ المرجو الانتظار قليلاً...*");

        const { medias, title } = await pindl(text);

        // التحقق من البيانات
        if (!medias || !Array.isArray(medias)) throw "*❌ فشل في الحصول على الوسائط. الرجاء المحاولة برابط صالح.*";

        // البحث عن ملفات MP4
        let mp4 = medias.filter(v => v.extension === "mp4");

        if (mp4.length > 0) {
            const size = formatSize(mp4[0].size); // تنسيق الحجم
            // إرسال الفيديو
            await conn.sendMessage(
                m.chat,
                { 
                    video: { url: mp4[0].url }, 
                    caption: `*✅ تم التنفيذ بنجاح!*\n\n*🎥 العنوان:* \`${title}\`\n*✨ الجودة:* ${mp4[0].quality}\n*📦 الحجم:* ${size}\n\n*❀ تابعني على إنستغرام :*\n
*instagram.com/dj_flibu_remix*
\n*❀ مطور البوت :*\n
*https://wa.me/212645106267*`
                },
                { quoted: m }
            );
        } else if (medias[0]) {
            // إرسال الوسائط الأخرى كخيار احتياطي
            await conn.sendFile(
                m.chat, 
                medias[0].url, 
                '', 
                `*✅ تم التنفيذ بنجاح!*\n\n*🎥 العنوان:* \`${title}\`\n\n*❀ تابعني على إنستغرام :*\n
*instagram.com/dj_flibu_remix*
\n*❀ مطور البوت :*\n
*https://wa.me/212645106267*`,
                m
            );
        } else {
            throw "*❌ لم يتم العثور على وسائط قابلة للتنزيل للرابط المقدم.*";
        }
    } catch (e) {
        console.error("Error:", e);
        throw `*❌ حدث خطأ أثناء العملية:*\n${e}`;
    }
};

handler.help = ["pinterest"];
handler.command = /^(pinterest)$/i;
handler.tags = ["downloader"];

export default handler;

// دالة لتحميل بيانات Pinterest
async function pindl(url) {
    try {
        const apiEndpoint = 'https://pinterestdownloader.io/frontendService/DownloaderService';
        const params = { url };

        // جلب البيانات من API
        let { data } = await axios.get(apiEndpoint, { params });

        // التحقق من صحة الاستجابة
        if (!data || !data.medias) throw "Invalid API response.";

        return data;
    } catch (e) {
        console.error("Error in pindl function:", e.message);
        throw "*❌ فشل في جلب البيانات من خدمة تنزيل Pinterest. الرجاء المحاولة لاحقاً.*";
    }
}

// دالة لتنسيق حجم الملف
function formatSize(bytes) {
    if (bytes === 0) return "0 B";
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}
