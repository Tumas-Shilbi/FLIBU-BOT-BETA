let handler = async (m, { conn, isROwner, text }) => {
  const delay = time => new Promise(res => setTimeout(res, time))
  let getGroups = await conn.groupFetchAllParticipating()
  let groups = Object.entries(getGroups)
    .slice(0)
    .map(entry => entry[1])
  let anu = groups.map(v => v.id)
  var pesan = m.quoted && m.quoted.text ? m.quoted.text : text
  if (!pesan) throw '*أدخل الرسالة التي تريد بثها*'
  for (let i of anu) {
    await delay(500)
    conn
      .relayMessage(
        i,
        {
          liveLocationMessage: {
            degreesLatitude: 35.685506276233525,
            degreesLongitude: 139.75270667105852,
            accuracyInMeters: 0,
            degreesClockwiseFromMagneticNorth: 2,
            caption: '[ *انتباه* ]\n\n' + pesan + '\n\nهذا بيان رسمي',
            sequenceNumber: 2,
            timeOffset: 3,
            contextInfo: m,
          },
        },
        {}
      )
      .catch(_ => _)
  }
  m.reply(
    `*الرسالة المرسلة إلى ${anu.length} مجموعة/S*\n\n*ملحوظة: قد يفشل هذا الأمر ولا يتم إرساله إلى جميع الدردشات، نأسف في الوقت الحالي*`
  )
}
handler.help = ['broadcastgroup', 'bcgc'].map(v => v + ' <text>')
handler.tags = ['owner']
handler.command = ['broadcastgroup']
handler.owner = true

export default handler
