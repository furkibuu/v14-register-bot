let db = require("croxydb");
let {EmbedBuilder} = require("discord.js");
let emoji = require("../emojis.json")

exports.run = async(client, message , args) => {

    
    if((message.author.id !== message.guild.ownerId)) return message.reply(`${emoji.red} **Bu komutu sadece \`Sunucu Sahibi\` kullanabilir**`)
 
    
    if (!args[0]) return message.reply("> **.taglı-alım aç/kapat**")

    if (args[0] != "aç") {if (args[0] != "kapat") {return message.reply("> **.taglı-alım aç / kapat**")}}

    if(args[0] === "aç"){db.set(`taglialim_${message.guild.id}`,true)
message.reply(`> **Başarıyla Taglı Alım Modu Açıldı!**`)}else if(args[0] === "kapat"){db.delete(`taglialim_${message.guild.id}`)
message.reply(`> **Başarıyla Taglı Alım Modu Kapatıldı!**`)}
    
    }
    
    exports.help = {
    
    name : `taglı-alım`
    
    }
    
    exports.conf = {
    
    
        aliases: ['taglı-alım',"taglıalım"],
    }