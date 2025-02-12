import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn, text, args }) => {
    if (!text) return conn.reply(m.chat, `❀ *المرجو إدخال اسم الفيديو الذي تريد البحث عنه*`, m)

    const react = { react: { text: "⏳", key: m.key } }
    const reactdone = { react: { text: "✅", key: m.key } }

    await conn.sendMessage(m.chat, react) // تفاعل انتظار

    try {
        let res = await search(args.join(" "))

        let apiAud = await fetch(`https://api.agungny.my.id/api/youtube-audio?url=${'https://youtu.be/' + res[0].videoId}`)
        let dataAud = await apiAud.json()
        let apiVid = await fetch(`https://api.agungny.my.id/api/youtube-video?url=${'https://youtu.be/' + res[0].videoId}`)
        let dataVid = await apiVid.json()

        let txt = `*◆ [ YOUTUBE - تشغيل ] ◆*

        - *📌 العنوان:* ${res[0].title}

        - *⏳ المدة:* ${res[0].timestamp}

        - *👁️‍🗨️ عدد المشاهدات:* ${res[0].views}

        - *📅 تم الرفع منذ:* ${res[0].ago}

        ◆────────────────◆

        🎵 *لتحميل الصوت:* رد بـ *1* 
        🎥 *لتحميل الفيديو:* رد بـ *2*\n\n

        ◆────────────────◆

*❀ حسابي انستغرام :* 

*instagram.com/dj_flibu_remix*

*❀ مطور البوت :*

*https://wa.me/212645106267*`

        let SM = await conn.sendFile(m.chat, res[0].thumbnail, 'FLIBU-BOT.jpg', txt, m)
        await conn.sendMessage(m.chat, reactdone) // تفاعل النجاح ✅

        conn.ev.on("messages.upsert", async (upsertedMessage) => {
            let RM = upsertedMessage.messages[0]
            if (!RM.message) return

            const UR = RM.message.conversation || RM.message.extendedTextMessage?.text
            let UC = RM.key.remoteJid

            if (RM.message.extendedTextMessage?.contextInfo?.stanzaId === SM.key.id) {
                await conn.sendMessage(UC, { react: { text: "⏳", key: RM.key } }) // تفاعل انتظار عند الرد برقم 1 أو 2

                if (UR === '1') {
                    await conn.sendMessage(UC, { audio: { url: dataAud.result.downloadUrl }, mimetype: "audio/mpeg" }, { quoted: RM })
                } else if (UR === '2') {
                    let videoDescription = `*✅ تم تحميل الفيديو بنجاح*\n\n*❀ حسابي انستغرام :*\n\n*instagram.com/dj_flibu_remix*\n\n*❀ مطور البوت :*\n\n*https://wa.me/212645106267*`

                    await conn.sendMessage(m.chat, { 
                        video: { url: dataVid.result.downloadUrl }, 
                        mimetype: 'video/mp4', 
                        fileName: `${res[0].title}.mp4`,
                        caption: videoDescription
                    }, { quoted: m })
                } else {
                    await conn.sendMessage(UC, { text: "❌ *خيار غير صالح! يرجى الرد بـ 1 لتحميل الصوت أو 2 لتحميل الفيديو.*" }, { quoted: RM })
                }

                await conn.sendMessage(UC, { react: { text: "✅", key: RM.key } }) // تفاعل النجاح بعد إرسال الملف
            }
        })

    } catch (error) {
        console.error(error)
        await conn.reply(m.chat, "❌ *حدث خطأ أثناء البحث عن الفيديو. حاول مرة أخرى لاحقًا.*", m)
    }
}

handler.tags = ['downloader']
handler.help = ['play']
handler.command = ["play"]

export default handler

async function search(query, options = {}) {
    let search = await yts.search({ query, hl: "ar", gl: "MA", ...options })
    return search.videos
}
