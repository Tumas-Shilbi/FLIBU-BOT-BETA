import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
import axios from 'axios'


let jarsepay = m => m
jarsepay.all = async function(m) {
	let name = await conn.getName(m.sender)
	let pp = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
	try {
		pp = await this.profilePictureUrl(m.sender, 'image')
	} catch (e) {} finally {

		global.idchannel = '120363299366714464@newsletter'
		global.doc = pickRandom(['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/msword', 'application/pdf'])
		global.fsizedoc = pickRandom([2000, 3000, 2023000, 2024000])

		global.axios = (await import('axios')).default
		global.fetch = (await import('node-fetch')).default
		global.cheerio = (await import('cheerio')).default
		global.fs = (await import('fs')).default

		global.kontak2 = [
			[owner[0], await conn.getName(owner[0] + info.nomorowner + '@s.whatsapp.net'), `${info.namaowner}`, 'https://whatsapp.com', true],
		]

		global.fkontak = {
			key: {
				fromMe: false,
				participant: m.sender,
				...(m.chat ? {
					remoteJid: info.namabot
				} : {})
			},
			message: {
				contactMessage: {
					displayName: `${name}`,
					vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
				}
			}
		}

		global.ephemeral = '86400'
		global.ucapan = ucapan()
		global.botdate = date()

		global.adReply = {
			contextInfo: {
				forwardingScore: 0,
				isForwarded: true,
				forwardedNewsletterMessageInfo: {
					'newsletterJid': idchannel,
					'serverMessageId': 103,
					'newsletterName': `⌜ ${info.namabot} ⌟  ||  𝙵𝙻𝙸𝙱𝚄 𝙱𝙾𝚃 𝙲𝙷𝙰𝙽𝙽𝙴𝙻`
				},
				externalAdReply: {
					showAdAttribution: true,
					title: info.namabot,
					body: ucapan(),
					previewType: 'PHOTO',
					thumbnailUrl: url.logo,
					sourceUrl: url.sid,
				}
			}
		}

		global.fakeig = {
			contextInfo: {
				externalAdReply: {
					showAdAttribution: true,
					title: info.namabot,
					body: ucapan(),
					thumbnailUrl: pp,
					sourceUrl: url.sig
				}
			}
		}
	}
}

export default jarsepay

function date() {
	let d = new Date(new Date + 3600000)
	let locale = 'id'
	let week = d.toLocaleDateString(locale, {
		weekday: 'long'
	})
	let date = d.toLocaleDateString(locale, {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	})
	let tgl = `${week}, ${date}`
	return tgl
}

function ucapan() {
	const time = moment.tz('Africa/Casablanca').format('HH')
	let res = 'ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ ♥️'
	if (time >= 4) {
		res = 'ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ ♥️'
	}
	if (time > 10) {
		res = 'ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ ♥️'
	}
	if (time >= 15) {
		res = 'ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ ♥️'
	}
	if (time >= 18) {
		res = 'ᎿᏬᎷᎯᏕ ᏕᎻᎨᏝᏰᎨ ♥️ '
	}
	return res
}

function pickRandom(list) {
	return list[Math.floor(list.length * Math.random())]
}
