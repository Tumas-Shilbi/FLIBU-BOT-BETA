import fetch from 'node-fetch'

let HS = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        return conn.reply(m.chat, `❀ *يرجى إدخال رابط يوتيوب 🎥*`, m)
    }

    try {
        let calidad = '128' // جودات متاحة: 32, 64, 128, 192, 320

        // إرسال رد تفاعل عند الانتظار ⏳
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

        conn.reply(m.chat, `⏳ *جاري التحميل، يرجى الانتظار...*`, m)

        // استدعاء API لتحميل الصوت
        let api = await fetch(`https://api.giftedtech.my.id/api/download/dlmp3q?apikey=gifted&quality=${calidad}&url=${text}`)
        let json = await api.json()

        // التحقق من وجود الرابط
        if (!json.result || !json.result.download_url) {
            // إرسال رد تفاعل عند حدوث خطأ ❌
            await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
            return conn.reply(m.chat, `❌ *حدث خطأ، الرابط غير صالح أو غير متاح.*`, m)
        }

        let { quality, title, download_url } = json.result

        // إرسال الرسالة مع الصوت
        let sentMsg = await conn.sendMessage(
            m.chat, 
            { 
                audio: { url: download_url }, 
                caption: `✅ *تم التحميل بنجاح* 🎶\n\n🎵 *العنوان:* ${title}\n🔊 *الجودة:* ${quality}kbps`, 
                mimetype: "audio/mpeg" 
            }, 
            { quoted: m }
        )

        // إرسال رد تفاعل عند نجاح التحميل ✅
        await conn.sendMessage(m.chat, { react: { text: '🎉', key: sentMsg.key } })

        // إضافة تفاعل "✅" عند الانتهاء
        const reactdone = {
            react: {
                text: "✅",
                key: m.key
            }
        }
        await conn.sendMessage(m.chat, reactdone)

        // إرسال رسالة "تم التحميل بنجاح"
        conn.reply(m.chat, `✅ *تم التحميل بنجاح!*`, m)

    } catch (error) {
        console.error(error)
        // رد تفاعل عند حدوث خطأ ❌
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        conn.reply(m.chat, `❌ *حدث خطأ أثناء التحميل. يرجى المحاولة مرة أخرى.*`, m)
    }
}

HS.tags = ['downloader']
HS.help = ['ytmp3-v2']
HS.command = /^(ytmp3-v2)$/i

export default HS
