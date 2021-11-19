const fetch = require("node-fetch")
const Discord = require("discord.js")
//const hook2 = new Discord.WebhookClient({id:"webhookid",token:"token"})
const hook = new Discord.WebhookClientt({id:"webhookid",token:"token"})
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
let dolar = 0
setInterval(function () {
    fetch("https://api.bigpara.hurriyet.com.tr/doviz/headerlist/anasayfa").then(async r => {
    const json = await r.json();
    const dolarobj = json.data.filter(c => c.SEMBOL=="USDTRY")[0]
    if (dolarobj.SATIS > dolar) {
        hook.send(`Dolar ${dolarobj.SATIS-dolar} Kuruş Arttı Şimdi Dolar ${dolarobj.SATIS} TL`)
        //hook2.send(`Dolar ${dolarobj.SATIS-dolar} Kuruş Arttı Şimdi Dolar ${dolarobj.SATIS} TL`)
        dolar = dolarobj.SATIS
    }
    else if (dolarobj.SATIS < dolar) {
        hook.send(`Dolar ${dolar-dolarobj.SATIS} Kuruş Düştü Şimdi Dolar ${dolarobj.SATIS} TL`)
        //hook2.send(`Dolar ${dolar-dolarobj.SATIS} Kuruş Düştü Şimdi Dolar ${dolarobj.SATIS} TL`)
        dolar = dolarobj.SATIS
    }
})
},5000)