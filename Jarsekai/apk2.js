import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text) {
        return m.reply("❀ *الرجاء إدخال اسم التطبيق الذي تريد البحث عنه* 🤔");
    }

    try {
        // رد إيموجي الانتظار
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

        // رسالة "انتظر" قبل البحث
        await conn.reply(m.chat, "❀ *انتظر قليلاً... جاري البحث عن التطبيق* ⏳", m);

        // استدعاء الـ API الجديد
        let api = await fetch(`https://api-streamline.vercel.app/dlapk?search=${encodeURIComponent(text)}`);
        let json = await api.json();

        const {
            name,
            package: packageName,
            size,
            icon,
            added,
            updated,
            developer: { name: developerName },
            store: { name: storeName },
            stats: { downloads },
            file: { path: filepath, filesize }
        } = json;

        const appsize = (parseInt(size) / (1024 * 1024)).toFixed(2) + ' MB';

        let cap = `
          *❀─  𝙵 𝙻 𝙸 𝙱 𝚄 - 𝙱 𝙾 𝚃  ─❀*

*❀ 📱 الاسم* :  ${name}

*❀ 📦 الحزمة* : ${packageName} 

*❀ 📊 الحجم* :  ${appsize} 

*❀ انتظر قليلاً جاري التحميل... ⏳*

*❀ تـابـع قـنـاة الـبـوت :*

*https://whatsapp.com/channel/0029VafPIGU2975ALj4uYl1g* `;

        // إرسال أيقونة التطبيق
        await conn.sendMessage(m.chat, { image: { url: icon }, fileName: `${name}.png`, caption: cap }, { quoted: m });

        // إرسال ملف الـ APK
        await conn.sendMessage(m.chat, {
            document: { url: filepath },
            mimetype: 'application/vnd.android.package-archive',
            fileName: `${name}.apk`,
            caption: `\n*❀ تم التنزيل بنجاح 🎉*

*❀ تابعني على حسابي :*\n
*instagram.com/dj_flibu_remix*
\n*❀ مـطـور الـبـوت :* 

*https://wa.me/212645106267*`
        }, { quoted: m });

        // رد إيموجي النجاح
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (error) {
        // في حالة حدوث خطأ
        await conn.reply(m.chat, '[ ☠ ] حدث خطأ أثناء محاولة تحميل التطبيق. حاول مجددًا.', m);
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }
};

handler.tags = ['applications']
handler.help = ['apk']
handler.command = /^(apk)$/i;
export default handler;
