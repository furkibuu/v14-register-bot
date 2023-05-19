let {EmbedBuilder} = require("discord.js");
let db = require("croxydb");
let set = require("../setting")
let emoji = require("../emojis.json")
let {Footer} =require("../config")
exports.run = async (client ,message, args) =>{
    
    if (!message.member.roles.cache.has(set.regsiteryt) && !message.member.permissions.has("Administrator")) return message.reply({ content : `${emoji.red} **Bu komutu kullanmak için yetkin bulunmamaktadır!**`}).then((e) => setTimeout(() => { if(e.deletable){e.delete()}; }, 10000));

    
    let member = (message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member){

    let erkek = db.fetch(`yetkili.${message.author.id}.erkek`);
    let kadın = db.fetch(`yetkili.${message.author.id}.kadın`);
    let kayıtlar = db.fetch(`yetkili.${message.author.id}.toplam`); 
    if(erkek === null) erkek = "0"  
    if(erkek === undefined) erkek = "0"
    if(kadın === null) kadın = "0"
    if(kadın === undefined) kadın = "0"
    if(kayıtlar === null) kayıtlar = "0"
    if(kayıtlar === undefined) kayıtlar = "0"

    let kayıtlarss = new EmbedBuilder()
    .setAuthor({name : `Kullanıcının  Toplam Kayıtları`})
    .setColor("Yellow")
    .setThumbnail(member.user.avatarURL({dynamic : true}))
    .setDescription(`
    Toplam Kayıt  Sayı: \`${kayıtlar}\`
    Erkek Kayıt Sayı : \`${erkek}\`
    Kadın Kayıt Sayı : \`${kadın}\`
    `)
    .setFooter({text : Footer})
    message.reply({embeds : [kayıtlarss]})

}

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kayıtsayı','kayıtbilgi']
   };
    
   exports.help = {
    name: 'kayıt-sayı',
    description: 'Botun Pingine Bakarsın',
    usage: '!ping'
   };