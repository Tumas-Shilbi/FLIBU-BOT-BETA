import axios from 'axios';
import { parseStringPromise } from 'xml2js';

const effects = [
    'sweetheart', 'flutter', 'pinkglow', 'volcano', 'petalprint', 'giftwrap', 'mrfrosty', 'littlehelper', 
    'sprinklesparkle', 'seasonsgreetings', 'heartbeat', 'valentine', 'sapphireheart', 'signature', 'lollipop', 
    'handbag', 'tiptoe', 'sketchy', 'ghostship', 'oldenglish', 'dragonscale', 'magicdust', 'substance', 
    'piratescove', 'backstreet', 'funkyzeit', 'airman', 'foolsgold', 'zephyr', 'paintbrush', 'lokum', 
    'insignia', 'cottoncandy', 'fairygarden', 'neonlights', 'glowstick', 'lavender', 'ohhai', 'bluegecko', 
    'moderno', 'petalprint', 'rhizome', 'devana', 'cupcake', 'fame', 'ionize', 'volcano', 'broadway', 
    'sweetheart', 'starshine', 'flowerpower', 'gobstopper', 'discodiva', 'medieval', 'fruityfresh', 
    'letterboard', 'greenstone', 'alieninvasion', 'pinkglow', 'pinkcandy', 'losttales', 'glowtxt', 
    'purple', 'yourstruly', 'electricblue', 'greek', 'cyrillic', 'cyrillic2', 'cyrillic3', 'korean', 
    'arabic', 'arabic2', 'arabic3', 'hindi', 'chinese', 'japanese', 'hebrew', 'hebrew2', 'hebrew3', 
    'ethiopic', 'ethiopic2', 'ethiopic3', 'vietnamese', 'icelandic', 'bengali', 'yoruba', 'igbo', 
    'armenian', 'armenian2', 'georgian', 'georgian2', 'thai', 'euro', 'euro2', 'euro3', 'allstars', 
    'dearest', 'metropol', 'ransom', 'bronco', 'platformtwo', 'fictional', 'typeface', 'stardate', 
    'beachfront', 'arthouse', 'sterling', 'jukebox', 'bubbles', 'invitation', 'frontier', 'surprise', 
    'firstedition', 'republika', 'jumble', 'warehouse', 'orientexpress', 'orbitron', 'starlight', 'jet', 
    'tamil', 'kannada', 'telugu', 'punjabi', 'malayalam', 'odia', 'thai2', 'thai3', 'thai4', 'hindi2', 
    'hindi3', 'hindi4', 'hindi5', 'hindi6', 'hindi7', 'hindi8', 'euro4', 'arabic4', 'arabic5', 
    'arabic6', 'hebrew4', 'hebrew5', 'hebrew6', 'cyrillic4', 'japanese2', 'japanese3', 'japanese4', 
    'japanese5', 'japanese6', 'japanese7', 'japanese8', 'japanese9', 'japanese10', 'japanese11', 
    'japanese12', 'japanese13', 'chinese_tc'
];

const handler = async (m, { conn, text, command }) => {
    const args = text.split('|').map(arg => arg.trim());
    const effect = args[0];
    const message = args[1];

    if (!effect || !message) {
        return m.reply(`*استخدام المثال :* 

.logomaker electricblue | flibu bot\n\n• *التأثيرات المتاحة :*\n> ${effects.join("\n> ")}`);
    }

    if (!effects.includes(effect)) {
        return m.reply(`التأثير غير موجود. يرجى اختيار من القائمة أدناه:\n\n> ${effects.join("\n> ")}`);
    }

    // إضافة رمز الانتظار ⏳
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

    try {
        const glowTextUrl = await createGlowText(effect, message);
        if (glowTextUrl) {
            // إضافة صورة النجاح مع حسابك ورقمك في الوصف
            await conn.sendMessage(m.chat, { 
                image: { url: glowTextUrl }, 
                caption: `✅ تم التنفيذ بنجاح! \n
*❀ حسابي انستغرام :* \n
*instagram.com/dj_flibu_remix*\n\n*❀ مطور البوت :*\n
*https://wa.me/212645106267*`
            }, { quoted: m });
        } else {
            m.reply('❌ فشل إنشاء النص المتوهج. البيانات غير موجودة.');
        }
    } catch (error) {
        m.reply(`❌ حدث خطأ أثناء العملية: ${error.message}`);
    }
};

handler.help = ['logomaker'];
handler.tags = ['tools'];
handler.command = /^logomaker$/i;
export default handler;

async function createGlowText(effect, text) {
    try {
        const url = `https://glowtxt.com/gentext2.php`;
        const params = {
            text,
            text2: '',
            text3: '',
            font_style: effect,
            font_size: 'x',
            font_colour: '0',
            bgcolour: '#000000',
            glow_halo: '2',
            non_trans: 'false',
            glitter_border: 'false',
            anim_type: 'none',
            submit_type: 'text',
        };
        const headers = {
            'Host': 'glowtxt.com',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Mobile Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9',
        };
        const response = await axios.get(url, { params, headers });
        const result = await parseStringPromise(response.data);
        const datadir = result?.image?.datadir?.[0];
        const fullFilename = result?.image?.fullfilename?.[0];
        return datadir && fullFilename ? `https://glowtxt.com/${datadir}/${fullFilename}` : null;
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}
