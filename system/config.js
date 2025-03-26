import { watchFile, unwatchFile } from 'fs'
import fs from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

// Setting
global.setting = {
    autoclear: false,
    addReply: true
}

// Owner
global.owner = [
    ['212645106267', 'ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ', true]
]

// Info
global.info = {
    namaowner: 'ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ',
    nomorowner: '212645106267',
    pairingNumber: '', // يرجى ملء رقمك بدءًا من رمز بلدك. على سبيل المثال : '21245106267'
    packname: '𝙱𝚈 ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ ',
    author: '𝙵𝙻𝙸𝙱𝚄 𝙱𝙾𝚃',
    namabot: '𝙵𝙻𝙸𝙱𝚄 𝙱𝙾𝚃',
    wm: 'I M  ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ',
    stickpack: '𝙱𝚈 ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ',
    stickauth: '𝙵𝙻𝙸𝙱𝚄 𝙱𝙾𝚃'
}

// Thumbnail 
global.url = {
    profil: 'https://files.catbox.moe/qenvjd.jpg',
    thumb: 'https://files.catbox.moe/qenvjd.jpg',
    logo: 'https://files.catbox.moe/qenvjd.jpg',
    akses: 'https://files.catbox.moe/qenvjd.jpg',
    welcomes: 'https://i.postimg.cc/6pPjhm9T/IMG-20250205-WA0166.jpg',
    lefts: 'https://i.postimg.cc/pdn0cJTC/IMG-20250205-WA0155.jpg',
    sig: 'https://instagram.com/dj_flibu_remix',
    sgh: 'https://github.com',
    sgc: 'https://whatsapp.com/channel/0029VafPIGU2975ALj4uYl1g',
    sdc: 'https://s.id/JK5eM',
    sid: 'https://n9.cl/8pe29'
}

// Message
global.msg = {
    wait: 'تنفيذ أمر...',
    error: 'لقد حدث خطأ، يرجى الإبلاغ إلى المالك عبر */report*.'
}

// Apikey
global.api = {
    lol: 'GataDios'

}

global.APIKeys = {
    "https://api.lolhumaan.xyz": "GataDios"
}

// API
global.APIs = {
    lol: "https://api.lolhumaan.xyz"
}

// RPG & Levelling
global.multiplier = 50
global.rpg = {
    emoticon(string) {
        string = string.toLowerCase()
        let emot = {
            health: '❤️',
            role: '🎭',
            level: '🧬',
            exp: '✨',
            money: '💵',
            limit: '🌟'
        }
        let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
        if (!results.length) return ''
        else return emot[results[0][0]]
    }
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
    unwatchFile(file)
    console.log(chalk.redBright("Update 'config.js'"))
    import(`${file}?update=${Date.now()}`)
})
