var fetch = require('node-fetch')
var handler = async (m, { conn, args }) => {
   response = args.join(' ').split('|')
  if (!args[0]) throw 'Masukkan Text\nContoh : .pictlove BOTCAHX'
  m.reply('_Proses..._')
  let res = `https://api.botcahx.biz.id/api/photooxy/picture-of-love?text=${response[0]}&apikey=Admin`
  conn.sendFile(m.chat, res, 'botcahx.jpg', `© BOTCAHX`, m, false)
}
handler.help = ['pictlove'].map(v => v + ' <text>')
handler.tags = ['photooxy']
handler.command = /^(pictlove)$/i

module.exports = handler
