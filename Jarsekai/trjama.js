import fetch from "node-fetch";

let handler = async (m, { args, usedPrefix, command }) => {
    let lang, text;
    if (args.length >= 2) {
        lang = args[0] ? args[0] : "ar", text = args.slice(1).join(" ");
    } else if (m.quoted && m.quoted.text) {
        lang = args[0] ? args[0] : "ar", text = m.quoted.text;
    } else throw `الترجمة الفورية لكل لغات العالم مثال : \n\n *${usedPrefix + command}* ar Hello, I am Flibu Bot`;

    // ⏳ رد انتظار
    await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

    try {
        const prompt = text.trim();
        let res = await translate(prompt, lang);
        let lister = Object.keys(await langList());
        let supp = `❌ خطأ:\nهذه اللغة "${lang}" غير مدعومة من البوت أو لم يتم التعرف عليها أو أنك لم تكتب اختصار اللغة بشكل صحيح.`;

        if (!lister.includes(lang)) return m.reply(supp + "\n\n*مثال:*\n." + command + " ar hello\n\n*حدد الرمز الموجود*\n" + lister.map((v, index) => `${index + 1}. ${v}`).join("\n"));

        let caption = `
🌍 *ترجمتك:*\n\n- ${res[0].trim()}\n\n\n*❀ حسابي انستغرام :*\n\n*instagram.com/dj_flibu_remix*\n\n*❀ مطور البوت :*\n\n*https://wa.me/212645106267*
`;

        // ✅ رد نجاح
        await m.reply(caption, null, m.mentionedJid ? { mentions: conn.parseMention(caption) } : {});
        await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
    } catch (e) {
        // عرض خطأ مفصل بدلاً من رسالة عامة
        console.error(e);
        await m.reply(`❌ حدث خطأ أثناء العملية:\n${e.message}`);
    }
};

handler.help = ["trjama"];
handler.tags = ["tools"];
handler.command = /^(tr|trjama|translate)$/i;
export default handler;

async function langList() {
    let data = await fetch("https://translate.google.com/translate_a/l?client=webapp&sl=auto&tl=en&v=1.0&hl=en&pv=1&tk=&source=bh&ssel=0&tsel=0&kc=1&tk=626515.626515&q=")
        .then((response) => response.json());
    return data.tl;
}

async function translate(query = '', lang) {
    if (!query.trim()) return '';
    const url = new URL('https://translate.googleapis.com/translate_a/single');
    url.searchParams.append('client', 'gtx');
    url.searchParams.append('sl', 'auto');
    url.searchParams.append('dt', 't');
    url.searchParams.append('tl', lang);
    url.searchParams.append('q', query);

    try {
        const response = await fetch(url.href);
        const data = await response.json();
        if (data) {
            return [data[0].map((item) => item[0].trim()).join('\n'), data[2]];
        } else {
            return '';
        }
    } catch (err) {
        throw err;
    }
}
