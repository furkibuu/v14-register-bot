const { EmbedBuilder } = require("discord.js");
let db = require("croxydb");
const limit = new Map();
let {Footer} =require("../config")

exports.run = async(client, message , args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    
    let erkek = db.fetch(`yetkili.${message.author.id}.erkek`);
    let kadın = db.fetch(`yetkili.${message.author.id}.kadın`);
    let kayıtlar = db.fetch(`yetkili.${message.author.id}.toplam`); 
    if(erkek === null) erkek = "0"  
    if(erkek === undefined) erkek = "0"
    if(kadın === null) kadın = "0"
    if(kadın === undefined) kadın = "0"
    if(kayıtlar === null) kayıtlar = "0"
    if(kayıtlar === undefined) kayıtlar = "0"

    let er = new EmbedBuilder()
    .setColor("Random")
    .setAuthor({name : `${member.user.tag} Profile`, iconURL: member.user.avatarURL({dynamic : true})})
    .setThumbnail(member.user.avatarURL({dynamic : true}))
    .setDescription(`
    
**• Kullanıcı: (<@${member.id}> - \`${member.id}\`) (${member.roles.highest})
• Hesap Kurulum Tarihi: <t:${Math.floor(member.user.createdTimestamp / 1000)}> (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>)
• Sunucuya Katılma Tarihi: <t:${Math.floor(member.joinedAt / 1000)}> (<t:${Math.floor(member.joinedAt / 1000)}:R>)
• Rolleri: ${(member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(', ') : 'Üzerinde Hiç Rol Bulunmamakta!')}
• Avatar: [Tıkla](${member.user.avatarURL({dynamic:true})})

-> Kullanıcının Data Verileri

• Toplam Kayıt Sayısı: \`${kayıtlar}\`
• Erkek Kayıt Sayısı: \`${erkek}\`
• Kadın Kayıt Sayısı: \`${kadın}\`**
    `)
    .setFooter({text : Footer})
    message.reply({embeds : [er]})
    
    }
    
    exports.help = {
    
    name : `profil`
    
    }
    
    exports.conf = {
    
    
        aliases: ['profil',"profile"],
    }