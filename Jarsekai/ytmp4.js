import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) {
        return conn.reply(m.chat, '*❀ أدخل رابط من يوتيوب*', m)
    }
    // رسالة انتظار
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    try {
        let api = await fetch(`https://api.davidcyriltech.my.id/download/ytmp4?url=${text}`)
        let json = await api.json()
        let { title, quality, thumbnail, download_url } = json.result

        // إرسال صورة الفيديو والمعلومات مع تكبير الخط باستخدام * للعناوين
        await conn.sendMessage(m.chat, {
            image: { url: thumbnail },
            caption: `*📹 العنوان:* ${title}\n
*🎶 الجودة:* ${quality}\n
*🎥 رابط الفيديو:* ${download_url}\n
*❀ حسابي انستغرام :* \n
*instagram.com/dj_flibu_remix*
\n*❀ مطور البوت :* \n
*https://wa.me/212645106267*`,
        }, { quoted: m })

        // إرسال الفيديو مع الرد مع تكبير النص
        await conn.sendMessage(m.chat, { video: { url: download_url }, caption: `*${title}*` }, { quoted: m })

        // رسالة نجاح
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (error) {
        console.error(error)
        // رسالة خطأ
        await conn.sendMessage(m.chat, '*❌ حدث خطأ أثناء العملية.*', { react: { text: '❌', key: m.key } })
    }
}


handler.tags = ['downloader']
handler.help = ['ytmp4']
handler.command= ['ytmp4']

export default handler
