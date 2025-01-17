const handler = async (_0x539a2f, { conn: _0x381180, text: _0xc66c29, command: _0x55f077, usedPrefix: _0x122673, args: _0x107239 }) => {
    const globalData = global.db.data.users[_0x539a2f.sender];
    const waitTime = globalData.wait || 0;

    if (new Date() - waitTime < 10000) {
        throw `*🕓 انتظر حتى ${Math.ceil((10000 - (new Date() - waitTime)) / 1000)} ثواني وقم بالعب مره اخري*`;
    }

    if (!_0x107239[0]) {
        return _0x381180.reply(
            _0x539a2f.chat,
            `*حجر 🗿، ورقة 📄 أو مقص ✂️*\n\n*—◉ اختر لتلعب مع البوت مثل:*\n*◉ ${_0x122673 + _0x55f077} حجر*\n*◉ ${_0x122673 + _0x55f077} ورقة*\n*◉ ${_0x122673 + _0x55f077} مقص*\n\nتابعني في حسابي :\n
            *instagram.com/dj_flibu_remix*`,
            _0x539a2f
        );
    }

    const userChoice = _0xc66c29.toLowerCase();
    const botChoices = ["حجر", "ورقة", "مقص"];
    const botChoice = botChoices[Math.floor(Math.random() * botChoices.length)];

    if (userChoice === botChoice) {
        globalData.exp += 500;
        return _0x381180.reply(
            _0x539a2f.chat,
            `*🔰 تعادل!*\n\n*👈🏻 انت: ${userChoice}*\n*👈🏻 البوت: ${botChoice}*\n*🎁 الجائزة +500 XP*`
        );
    }

    if (
        (userChoice === "حجر" && botChoice === "مقص") ||
        (userChoice === "ورقة" && botChoice === "حجر") ||
        (userChoice === "مقص" && botChoice === "ورقة")
    ) {
        globalData.exp += 1000;
        return _0x381180.reply(
            _0x539a2f.chat,
            `*🥳 عاش كسبتني! 🎉*\n\n*👈🏻 انت: ${userChoice}*\n*👈🏻 البوت: ${botChoice}*\n*🎁 الجائزة +1000 XP*`
        );
    }

    globalData.exp -= 300;
    return _0x381180.reply(
        _0x539a2f.chat,
        `*☠️ كسبتك! ❌*\n\n*👈🏻 انت: ${userChoice}*\n*👈🏻 البوت: ${botChoice}*\n*❌ الخسائر -300 XP*`
    );
};

handler.command = ["لعبة", "العب", "game"];
handler.tags = ["games"];
handler.help = ["game | لعبة."];

export default handler;
