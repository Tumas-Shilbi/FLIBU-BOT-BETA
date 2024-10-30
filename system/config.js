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
    pairingNumber: '', // Please fill your number starting with your country code, example: '212645106267'
    namaowner: 'ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ',
    nomorowner: '212645106267',
    packname: '𝙱𝚈 ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ ',
    author: 'ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ',
    namabot: '𝙵𝙻𝙸𝙱𝚄 𝙱𝙾𝚃',
    wm: 'I M  ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ',
    stickpack: '𝙱𝚈 ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ',
    stickauth: '𝙵𝙻𝙸𝙱𝚄 𝙱𝙾𝚃'
}

// Thumbnail 
global.url = {
    profil: 'https://i.ibb.co/3Fh9V6p/avatar-contact.png',
    thumb: 'https://qu.ax/Wkkdh.jpg',
    logo: 'https://qu.ax/Wkkdh.jpg',
    akses: 'https://qu.ax/Wkkdh.jpg',
    welcomes: 'https://qu.ax/Wkkdh.jpg',
    lefts: 'https://qu.ax/Wkkdh.jpg',
    sig: 'https://instagram.com/dj_flibu_remix',
    sgh: 'https://github.com',
    sgc: '',
    sdc: 'https://whatsapp.com/channel/0029VafPIGU2975ALj4uYl1g',
    sid: 'https://n9.cl/8pe29'
}

// Donasi
global.payment = {
    psaweria: 'https://saweria.co/renfunix',
    gopay: '212645106267',
    dana: '212645106267'
}

// Message
global.msg = {
    wait: 'Sedang menjalankan perintah...',
    error: 'Terjadi error, harap melapor ke owner melalui */report*.'
}

// Apikey
global.api = {
    lol: 'GataDios'

}
global.APIs = {
    lol: "https://api.lolhumaan.xyz"
}

global.APIKeys = {
    "https://api.lolhumaan.xyz": "GataDios"
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
