var fs = require('fs');
var path = require('path');
var fetch = require('node-fetch');
var handler = async (m, { conn, command, args }) => {
  if (!args[0]) return conn.reply(m.chat, 'Input URL!', m);
  if (args[0].match(/xnxx\.com|hamster\.com|nekopoi\.care/i)) {
    return conn.reply(m.chat, 'Link tersebut dilarang!', m);
  }
  await m.reply('_Ｌｏａｄｉｎｇ．．._');
  var url = args[0].startsWith('http') ? args[0] : 'https://' + args[0]

  try {
    var img = await fetch(`https://api.botcahx.biz.id/api/tools/ssweb?link=${url}&apikey=Admin`);
    if (!img) {
      await m.reply('Gagal saat percobaan pertama. Memulai percobaan kedua...');
      img = await fetch(`https://api.botcahx.biz.id/api/tools/ssweb?link=${url}&apikey=Admin`);
      if (!img) return conn.reply(m.chat, 'Gambar tidak tersedia', m);
    }
    var filepath = path.join(__dirname, '../ssresult/') + (+new Date) + '.jpeg';
    if (!fs.existsSync(path.join(__dirname, '../ssresult/'))) fs.mkdirSync(path.join(__dirname, '../ssresult/'));
    const dest = fs.createWriteStream(filepath);
    dest.on('finish', () => {
      conn.sendFile(m.chat, filepath, 'screenshot.jpeg', 'Nih gambarnya.', m)
        .then(() => {
        })
        .catch(() => { });
    });
    img.body.pipe(dest);
    img.body.pipe(fs.createWriteStream(filepath));
  } catch (e) {
    console.log(e);
    conn.reply(m.chat, `Terjadi error!`, m);
  }
}
handler.help = ['ssweb', 'sshp', 'sspc'];
handler.tags = ['tools'];
handler.command = /^(ssweb|ss|sshp|sspc)?f?$/i;

handler.limit = true;
handler.fail = null;

module.exports = handler;
