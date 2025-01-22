import moment from 'moment-timezone'
import { xpRange } from '../lib/levelling.js'
import { platform } from 'node:process'
import os from 'os'

let tags = {
	"info": "Info",
	"main": "Main",
	"owner": "Owner",
}

const defaultMenu = { before: `%taguser                        

%ucapan 
\n%readmore
`.trimStart(),
	header: '`%category`',
	body: '> %cmd %islimit %isPremium',
	footer: '',
	after: info.wm,
}

let jarsepay = async (m, { conn, usedPrefix: _p, text }) => {
	try {
		let { exp, limit, level, role } = global.db.data.users[m.sender]
		let { min, xp, max } = xpRange(level, global.multiplier)
		let name = m.sender
		let taguser = `@${(m.sender || '').replace(/@s\.whatsapp\.net/g, '')}`
		let names = await conn.getName(m.sender)
		let botnama = info.namabot
		let ucapans = ucapan()
		let d = new Date(new Date + 3600000)
		let locale = 'id'
		const wib = moment.tz('Africa/Casablanca').format("HH:mm:ss")
		const wita = moment.tz('Africa/Casablanca').format("HH:mm:ss")
		const wit = moment.tz('Africa/Casablanca').format("HH:mm:ss")
		let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
		let week = d.toLocaleDateString(locale, {
			weekday: 'long'
		})
		let date = d.toLocaleDateString(locale, {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		})
		let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		}).format(d)

		const platform = os.platform()

		const targetDate = new Date('January 1, 2025 00:00:00')
		const currentDate = new Date()
		const remainingTime = targetDate.getTime() - currentDate.getTime()
		const seconds = Math.floor(remainingTime / 1000) % 60
		const minutes = Math.floor(remainingTime / 1000 / 60) % 60
		const hours = Math.floor(remainingTime / 1000 / 60 / 60) % 24
		const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24)
		let dateCountdown = `${days} hari, ${hours} jam, ${minutes} menit, ${seconds} detik lagi menuju tahun baru!`

		let time = d.toLocaleTimeString(locale, {
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric'
		})
		let _uptime = process.uptime() * 1000
		let _muptime
		if (process.send) {
			process.send('uptime')
			_muptime = await new Promise(resolve => {
				process.once('message', resolve)
				setTimeout(resolve, 1000)
			}) * 1000
		}
		let muptime = clockString(_muptime)
		let uptime = clockString(_uptime)
		let totalreg = Object.keys(global.db.data.users).length
		let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
		let help = Object.values(global.jarspy).filter(jarspy => !jarspy.disabled).map(jarspy => {
			return {
				help: Array.isArray(jarspy.tags) ? jarspy.help : [jarspy.help],
				tags: Array.isArray(jarspy.tags) ? jarspy.tags : [jarspy.tags],
				prefix: 'customPrefix' in jarspy,
				limit: jarspy.limit,
				premium: jarspy.premium,
				enabled: !jarspy.disabled,
			}
		})
		for (let jarspy of help)
			if (jarspy && 'tags' in jarspy)
				for (let tag of jarspy.tags)
					if (!(tag in tags) && tag) tags[tag] = tag
		conn.menu = conn.menu ? conn.menu : {}
		let before = conn.menu.before || defaultMenu.before
		let header = conn.menu.header || defaultMenu.header
		let body = conn.menu.body || defaultMenu.body
		let footer = conn.menu.footer || defaultMenu.footer
		let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
		let _text = [
			before,
			...Object.keys(tags).map(tag => {
				return header.replace(/%category/g, tags[tag]) + '\n' + [
					...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
						return menu.help.map(help => {
							return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
								.replace(/%islimit/g, menu.limit ? 'Ⓛ' : '')
								.replace(/%isPremium/g, menu.premium ? '🅟' : '')
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			}),
			after
		].join('\n')
		text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
		let replace = {
			'%': '%',
			p: _p,
			uptime,
			muptime,
			me: conn.getName(conn.user.jid),
			ucapan: ucapan(),
			exp: exp - min,
			maxexp: xp,
			totalexp: exp,
			xp4levelup: max - exp,
			level,
			limit,
			name,
			names,
			weton,
			week,
			date,
			dateIslamic,
			dateCountdown,
			platform,
			wib,
			wit,
			wita,
			time,
			totalreg,
			rtotalreg,
			role,
			taguser,
			readmore: readMore
		}
		text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

		// إرسال الرد
		conn.sendMessage(m.chat, {
			text: await style(text),
			contextInfo: {
				forwardingScore: 0,
				isForwarded: true,
				mentionedJid: [m.sender],
				forwardedNewsletterMessageInfo: {
					newsletterJid: idchannel,
					serverMessageId: null,
					newsletterName: `⌜ ${info.namabot} ⌟ || 𝙵𝙻𝙸𝙱𝚄 - 𝙱𝙾𝚃 𝙲𝙷𝙰𝙽𝙽𝙴𝙻`,
				},
				externalAdReply: {
					showAdAttribution: true,
					title: info.wm,
					body: null,
					mediaType: 1,
					sourceUrl: url.sgc,
					thumbnailUrl: url.thumb,
					renderLargerThumbnail: true
				}
			}
		}, {
			quoted: m
		})

		// **إرسال المقطع الصوتي**
		const audioUrl = 'https://files.catbox.moe/27db2j.mp3'; // رابط المقطع الصوتي
		conn.sendMessage(m.chat, {
			audio: { url: audioUrl },
			mimetype: 'audio/mp4',
			ptt: false, // اجعلها true إذا كنت تريد إرساله كمقطع صوتي (PTT)
		}, {
			quoted: m
		}).then((audioMessage) => {
			// **تفاعل مع المقطع الصوتي باستخدام الإيموجي 😂**
			conn.sendMessage(m.chat, { react: { text: "😂", key: audioMessage.key } });
		});

	}
	catch (error) {
		console.error(error)
		throw 'Error: ' + error.message
	}
}

jarsepay.help = ['menu']
jarsepay.tags = ['main']
jarsepay.command = ['menu', 'allmenu']

export default jarsepay

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function pickRandom(list) {
	return list[Math.floor(Math.random() * list.length)]
}

function clockString(ms) {
	let d = Math.floor(ms / 86400000) // عدد الأيام
	let h = Math.floor(ms % 86400000 / 3600000) // عدد الساعات
	let m = Math.floor(ms % 86400000 % 3600000 / 60000) // عدد الدقائق
	let s = Math.floor(ms % 86400000 % 3600000 % 60000 / 1000) // عدد الثواني
	return [
		d > 9 ? d : '0' + d,
		h > 9 ? h : '0' + h,
		m > 9 ? m : '0' + m,
		s > 9 ? s : '0' + s
	].join(':') // النتيجة بالتنسيق "DD:HH:MM:SS"
}

function ucapan() {
	const hour_now = moment.tz('Africa/Casablanca').format('HH')
var ucapanWaktu = '*صباح الخير 🌅*' 
if (hour_now >= '03' && hour_now <= '10') {
    ucapanWaktu = '*صباح الخير 🌅*' 
} else if (hour_now >= '10' && hour_now <= '15') {
    ucapanWaktu = '*ظهيرة سعيدة ☀️*' 
} else if (hour_now >= '15' && hour_now <= '17') {
    ucapanWaktu = '*عشية سعيدة 🌇*' 
} else if (hour_now >= '17' && hour_now <= '18') {
    ucapanWaktu = '*عشية سعيدة 🌇*' 
} else if (hour_now >= '18' && hour_now <= '23') {
    ucapanWaktu = '*مساء الخير 🌙*' 
} else {
    ucapanWaktu = '*مساء الخير 🌙*' 
}
	return ucapanWaktu
}
