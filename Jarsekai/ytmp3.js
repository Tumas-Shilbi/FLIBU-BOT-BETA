import fetch from 'node-fetch'

let jarsepay = async (m, { conn, text, usedPrefix, command }) => {
    const react = {
        react: {
            text: "⏳",  // رد إيموجي عند انتظار
            key: m.key
        }
    }
    const reactdone = {
        react: {
            text: "✅",  // رد إيموجي عند النجاح
            key: m.key
        }
    }

    // التحقق من وجود رابط
    if (!text) {
        await conn.sendMessage(m.chat, react);  // إرسال رمز تعبيري "⏳" عند الإدخال الخاطئ
        return conn.reply(
            m.chat, 
            `❀ *ادخال رابط من اليوتيوب* 🎥\n*.ytmp3* https://youtu.be/Xvat-B1Ysww?si=UqYNZKH_3dRF5MrP`, 
            m
        );
    }

    // إعلام المستخدم ببدء التحميل
    await conn.reply(m.chat, "*❀ يتم الآن معالجة طلبك. ⏳ يرجى الانتظار قليلاً... 🎶*", m);

    try {
        // طلب البيانات من API مع تحديد وقت انتهاء (10 ثوانٍ)
        const api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp3?url=${text}`, { timeout: 10000 });
        const json = await api.json();

        // التحقق من الاستجابة الصحيحة
        if (!json.result || !json.result.metadata || !json.result.download) {
            throw new Error("*❀ ⚠️ خطأ: لم يتم العثور على البيانات المطلوبة.*");
        }

        // استخراج البيانات المطلوبة
        const title = json.result.metadata.title;
        const dl_url = json.result.download.url;

        // تنزيل الملف الصوتي كـ Buffer
        const response = await fetch(dl_url);
        const buffer = await response.buffer();

        // إرسال الملف إلى المستخدم
        const sentMsg = await conn.sendMessage(
            m.chat, 
            { 
                audio: buffer, 
                fileName: `${title}.mp3`, 
                mimetype: 'audio/mp4' 
            }, 
            { quoted: m }
        );

        // إضافة رد بإيموجي (React Message)
        await conn.sendMessage(m.chat, { react: { text: '🎉', key: sentMsg.key } });

        // إعلام المستخدم بنجاح العملية
        await conn.reply(m.chat, `*❀ ✅  تم  تحميله بنجاح*  🎶  \n*${title}*`, m);
        await conn.sendMessage(m.chat, reactdone);  // رد "✅" عند النجاح

    } catch (error) {
        console.error(error);

        // إعلام المستخدم بوجود مشكلة
        await conn.reply(
            m.chat, 
            `*❀ ⚠️ حدث خطأ أثناء معالجة طلبك:*\n${error.message || "*❀ حاول مرة أخرى لاحقًا.*"} 😔`, 
            m
        );

        // إضافة رد بإيموجي عند الخطأ
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }
};

// تعريف المساعدة والأوامر
jarsepay.tags = ['downloader'];
jarsepay.help = ['ytmp3'];
jarsepay.command = ['ytmp3'];

export default jarsepay;
