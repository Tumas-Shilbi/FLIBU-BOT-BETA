import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `❀ *يرجى إدخال رابط يوتيوب*\n\n❀ *مثل :* \n*.ytmp4* *https://youtu.be/Xvat-B1Ysww?si=UqYNZKH_3dRF5MrP*`, m)

    try {
        let api = await fetch(`https://apidl.asepharyana.cloud/api/downloader/ytmp4?url=${text}&quality=360`)
        let json = await api.json()
        let { title, author, authorUrl, lengthSeconds, views, uploadDate, thumbnail, description, duration, downloadUrl, quality } = json
        let HS = `- *العنوان :* ${title}
- *الكاتب :* ${author}
- *عدد المشاهدات :* ${views}
- *تاريخ التحميل :* ${uploadDate}
- *المدة :* ${duration}
- *الجودة :* ${quality}p`
        
        // إرسال رسالة انتظار
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
        
        // إرسال الفيديو
        const sentMsg = await conn.sendMessage(m.chat, { video: { url: downloadUrl }, caption: HS }, { quoted: m })
        
        // إرسال رسالة نجاح
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
        
        // إرسال التفاعل 🎉 بعد تحميل الفيديو بنجاح
        await conn.sendMessage(m.chat, { react: { text: '🎉', key: sentMsg.key } })
        
        // إضافة حساب الإنستغرام مع التنسيق المطلوب
        const instagramLink = "*https://instagram.com/dj_flibu_remix*"
        const successMessage = `✅ تم تحميل الفيديو بنجاح!\n\n*لمزيد من التحديثات، تابعنا على إنستغرام :*\n\n${instagramLink}`
        const successMsg = await conn.sendMessage(m.chat, { text: successMessage })

        // إرسال التفاعل ✅ على الرسالة الخاصة بحساب الإنستغرام
        await conn.sendMessage(m.chat, { react: { text: '✅', key: successMsg.key } })
    } catch (error) {
        console.error(error)
        // رسالة خطأ مع التنسيق الصحيح
        await conn.sendMessage(m.chat, { text: "*❌ حدث خطأ أثناء العملية.*" })
    }
}

handler.tags = ['downloader']
handler.help = ['ytmp4']
handler.command = ['ytmp4']

export default handler
