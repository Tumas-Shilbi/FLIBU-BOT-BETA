import fetch from 'node-fetch'

let HS = async (m, { conn, text, usedPrefix, command }) => {
    const react = {
        react: {
            text: "⏳",
            key: m.key
        }
    }
    const reactdone = {
        react: {
            text: "✅",
            key: m.key
        }
    }

    if (!text) {
        await conn.sendMessage(m.chat, react) // إرسال رد "⏳" عند إدخال خاطئ
        return conn.reply(m.chat, `❌ *يرجى إدخال رابط فيديو يوتيوب لتحميله!*\n\n📌 *مثال:*\n${usedPrefix + command} https://youtu.be/xyz`, m)
    }

    try {
        let الجودة = '360' // الجودات المتوفرة: 144, 240, 360, 480, 720, 1080, 1440, 2160

        // رسالة انتظار مع تفاعل
        await conn.sendMessage(m.chat, react)
        await conn.reply(m.chat, `⏳ *جاري معالجة طلبك... يرجى الانتظار* ⏳`, m)

        let api = await fetch(`https://api.giftedtech.my.id/api/download/dlmp4q?apikey=gifted&quality=${الجودة}&url=${text}`)
        let json = await api.json()
        let { quality, title, download_url, thumbnail } = json.result

        // إرسال الفيديو
        let sentMsg = await conn.sendMessage(
            m.chat, 
            { 
                video: { url: download_url }, 
                caption: `🎥 *العنوان:* ${title}\n📺 *الجودة:* ${quality}p`, 
                mimetype: 'video/mp4', 
                fileName: `${title}.mp4` 
            }, 
            { quoted: m }
        )

        // إرسال رسالة نجاح
        await conn.reply(m.chat, `✅ *تم تحميل الفيديو بنجاح!* 🎉`, m)

        // إرسال رد "🎉" كتفاعل مع الرسالة
        await conn.sendMessage(m.chat, { react: { text: '🎉', key: sentMsg.key } })

        // إرسال رد "✅" عند الانتهاء
        await conn.sendMessage(m.chat, reactdone)

    } catch (error) {
        console.error(error)
        await conn.sendMessage(m.chat, reactdone) // إرسال رد "✅" حتى عند الفشل
        conn.reply(m.chat, `❌ *حدث خطأ أثناء التحميل. يرجى المحاولة لاحقًا.*`, m)
    }
}

HS.help = ['ytmp4-v2']
HS.tags = ['downloader']
HS.command = /^(ytmp4-v2)$/i

export default HS
