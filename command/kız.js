let emoji = require("../emojis.json");
let db = require("croxydb");
let set = require("../setting")
let {EmbedBuilder, ButtonBuilder , ActionRowBuilder} = require("discord.js")
let {Footer} =require("../config")
exports.run = async(client, message , args) => {
    var tag = set.tag;

    if (!message.member.roles.cache.has(set.regsiteryt) && !message.member.permissions.has("Administrator")) return message.reply({ content : `${emoji.red} **Bu komutu kullanmak için yetkin bulunmamaktadır!**`}).then((e) => setTimeout(() => { if(e.deletable){e.delete()}; }, 10000));

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.reply({content : `${emoji.red} **Bir kullanıcı belirtmelisin!**`})
if(member.id === message.author.id) return message.reply({content : `${emoji.red} **Kendini kayıt edemezsin!**`})
if(member.id === message.guild.ownerID) return message.reply({content : `${emoji.red} **Sunucu sahibini kayıt edemezsin!**`})
if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply({content :`${emoji.red} **Bu kullanıcı sizden üst/aynı pozsiyondadır!**`})
    
    let name = args[1]
    if(!name) return message.reply({content : `${emoji.red} İsim belirtmelisin.`})
    let age = args[2]
    if(!age || isNaN(age)) return message.reply({content : `${emoji.red} Yaş belirtmelisin. \`(Sayılardan oluşmalı.)\``})

    if(db.get(`taglialim_${message.guild.id}`)){


        if (set.tag.some(tag => !member.user.username.includes(tag))){

return message.reply({content : `${emoji.red} **Sunucumuzda taglı alım açıktır. Sadece taglı kullanıcılar kayıt edilebilir!`})

        }

    }
    db.add(`yetkili.${message.author.id}.kadın`, 1 )
    db.add(`yetkili.${message.author.id}.toplam`, 1 )
    let alldata = db.fetch(`yetkili.${message.author.id}.toplam`)
    
    member.roles.add(set.kadin1, set.kadin2)
    member.setNickname(`${tag} ${name} | ${age}`)
    member.roles.remove(set.kayıtsız)
    
    let kayit1 = new EmbedBuilder()
    .setAuthor({name : `Kayıt başarılı`})
    .setDescription(`${emoji.kayityey} ${message.author} **Tarafından ${member} adlı üyenin kayıt işlemi tamamlanmıştır. Kayıt işlemi sonucunda : \n - ${set.kayıtsız} Rolü alındı \n - ${set.kadin1}, ${set.kadin2} Rolleri verildi**`)
    .setFooter({text : `${message.author.username} Toplam kayıdı : ${alldata}`, iconURL : message.author.avatarURL({dynamic : true})})
    .setColor("Random")
    .setThumbnail(member.user.avatarURL({dynamic: true}))
    .setFooter({text : Footer})
            
    
    message.reply({embeds : [kayit1]})
    

    client.channels.cache.get(set.chat).send(`
    
    ${member} Sunucumuza kayıt oldu hadi selam verelim.
    
    `)

}
exports.help = {

    name : `erkek`

    }
    
    exports.conf = {
    
    
        aliases: ['man',"e"],
    }