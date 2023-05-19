const db = require("croxydb");
let {EmbedBuilder} = require("discord.js")
let set = require("../setting")
let emoji = require("../emojis.json")
let {Footer} =require("../config")

exports.run = async(client, message , args) => {
    if (!message.member.roles.cache.has(set.regsiteryt) && !message.member.permissions.has("Administrator")) return message.reply({ content : `${emoji.red} **Bu komutu kullanmak için yetkin bulunmamaktadır!**`}).then((e) => setTimeout(() => { if(e.deletable){e.delete()}; }, 10000));

    var tag = set.tag;

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.reply({content : `${emoji.red} **Bir kullanıcı belirtmelisin!**`})

if(member.id === message.guild.ownerID) return message.reply({content : `${emoji.red} **Sunucu sahibinin ismini değiştiremezsin!**`})
if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply({content :`${emoji.red} **Bu kullanıcı sizden üst/aynı pozsiyondadır!**`})
    
    let name = args[1]
    if(!name) return message.reply({content : `${emoji.red} İsim belirtmelisin.`})
    let age = args[2]
    if(!age || isNaN(age)) return message.reply({content : `${emoji.red} Yaş belirtmelisin. \`(Sayılardan oluşmalı.)\``})

    let Name2 = name.toLocaleLowerCase()[0].toUpperCase() + name.toLocaleLowerCase().substring(1);

    await message.guild.members.cache.get(member.id).setNickname(`${tag} ${Name2} | ${age}`);
    let embed = new EmbedBuilder()
    .setColor("Random")
    .setDescription(`${emoji.onay} **\`${member.user.username}\` adlı kullanıcın ismi başarıyla \`${tag} ${Name2} | ${age}\` olarak ayarlandı**`)
.setFooter({text : Footer})
    message.reply({embeds : [embed]})
    }
    
    exports.help = {
    
    name : `isim`
    
    }
    
    exports.conf = {
    
    
        aliases: ['isim',"isim"],
    }