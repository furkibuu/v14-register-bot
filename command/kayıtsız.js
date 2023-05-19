const { EmbedBuilder } = require("discord.js");
let emoji = require("../emojis.json");
let set = require("../setting")


exports.run = async(client, message , args) => {
    if (!message.member.roles.cache.has(set.regsiteryt) && !message.member.permissions.has("Administrator")) return message.reply({ content : `${emoji.red} **Bu komutu kullanmak için yetkin bulunmamaktadır!**`}).then((e) => setTimeout(() => { if(e.deletable){e.delete()}; }, 10000));

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) { message.reply({ content : `${emoji.red} Önce bir kullanıcı belirt!`});
return }
if(message.author.id === member.id){ message.reply({content : `${emoji.red} Kendini kayıtsıza mı atıcan?`});
if(member.id === message.guild.ownerID) return message.reply({content : `${emoji.red} **Sunucu sahibini kayıt edemezsin!**`})
if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply({content :`${emoji.red} **Bu kullanıcı sizden üst/aynı pozsiyondadır!**`})
   
return}

await member.roles.cache.has(set.boosterRole) ? member.roles.set([set.boosterRole,set.kayıtsız]) : member.roles.set([set.kayıtsız])
await member.setNickname(set.kayıtsızisim)
message.reply({content : `${emoji.onay} ${member} kullanıcısı ${message.author} tarafından kayıtsıza atıldı.`})
    
    }
    
    exports.help = {
    
    name : `kayıtsız`
    
    }
    
    exports.conf = {
    
    
        aliases: ['kayıtsız-at',"kayıtsızver"],
    }