let {Client, Collection, Partials, GatewayIntentBits, EmbedBuilder} = require("discord.js");
let moment = require("moment");
let fs = require("fs")
let {Token} = require("./config")
let set = require("./setting")
let emoji = require("./emojis.json")
let { readdirSync} = require("fs")
let eventFiles = readdirSync('./Ready').filter(file => file.endsWith('.js'));

let client = new Client({
	partials: [
	  Partials.Message, // for message
	  Partials.Channel, // for text channel
	  Partials.GuildMember, // for guild member
	  Partials.Reaction, // for message reaction
	  Partials.GuildScheduledEvent, // for guild events
	  Partials.User, // for discord user
	  Partials.ThreadMember, // for thread member
	],
	intents: [
	  GatewayIntentBits.Guilds, // for guild related things
	  GatewayIntentBits.GuildMembers, // for guild members related things
	  GatewayIntentBits.GuildBans, // for manage guild bans
	  GatewayIntentBits.GuildEmojisAndStickers, // for manage emojis and stickers
	  GatewayIntentBits.GuildIntegrations, // for discord Integrations
	  GatewayIntentBits.GuildWebhooks, // for discord webhooks
	  GatewayIntentBits.GuildInvites, // for guild invite managing
	  GatewayIntentBits.GuildVoiceStates, // for voice related things
	  GatewayIntentBits.GuildPresences, // for user presence things
	  GatewayIntentBits.GuildMessages, // for guild messages things
	  GatewayIntentBits.GuildMessageReactions, // for message reactions things
	  GatewayIntentBits.GuildMessageTyping, // for message typing things
	  GatewayIntentBits.DirectMessages, // for dm messages
	  GatewayIntentBits.DirectMessageReactions, // for dm message reaction
	  GatewayIntentBits.DirectMessageTyping, // for dm message typinh
	  GatewayIntentBits.MessageContent, // enable if you need message content things
	  GatewayIntentBits.GuildPresences
	],
  });
  moment.locale("tr");
  require('moment-duration-format');
  require('./eventloader')(client);

  

  for (let file of eventFiles) {
	let event = require(`./Ready/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


  client.login(Token).catch( err=>{
    
    
    console.log(`Tokene bağlanılamadı! Tokeni kontrol edin.`)}


  ).then(

console.log("Tokene başarılı bir şekilde bağlanıldı!")

  )

  process.on("unhandledRejection", (err) => {
	console.log(err);  
	  });
  process.on("uncaughtException", (err) => {
  console.log(err)
  }
  
	  );






  // Komut İşleme  //

  client.commands = new Collection();
  client.aliases = new Collection();
  fs.readdir("./command/", (err, files) => {
	if (err) console.error(err);
	
	files.forEach(f => {
	  let props = require(`./command/${f}`);
	  ;
	  client.commands.set(props.help.name, props);
	  props.conf.aliases.forEach(alias => {
		client.aliases.set(alias, props.help.name);
	  });
	});
  });
  client.reload = command => {
	return new Promise((resolve, reject) => {
	  try {
		delete require.cache[require.resolve(`./command/${command}`)];
		let cmd = require(`./command/${command}`);
		client.commands.delete(command);
		client.aliases.forEach((cmd, alias) => {
		  if (cmd === command) client.aliases.delete(alias);
		});
		client.commands.set(command, cmd);
		cmd.conf.aliases.forEach(alias => {
		  client.aliases.set(alias, cmd.help.name);
		});
		resolve();
	  } catch (e) {
		reject(e);
	  }
	});
  };
  client.load = command => {
	return new Promise((resolve, reject) => {
	  try {
		let cmd = require(`./command/${command}`);
		client.commands.set(command, cmd);
		cmd.conf.aliases.forEach(alias => {
		  client.aliases.set(alias, cmd.help.name);
		});
		resolve();
	  } catch (e) {
		reject(e);
	  }
	});
  };
  client.unload = command => {
	return new Promise((resolve, reject) => {
	  try {
		delete require.cache[require.resolve(`./command/${command}`)];
		let cmd = require(`./command/${command}`);
		client.commands.delete(command);
		client.aliases.forEach((cmd, alias) => {
		  if (cmd === command) client.aliases.delete(alias);
		});
		resolve();
	  } catch (e) {
		reject(e);
	  }
	});
  };
//Dokanma Üst Tarafa //

  // Tag mesaj

  client.on("messageCreate" , msg => {

if(msg.content.toLowerCase() === "tag"){


msg.reply({content : `\`${set.tag}\``})

}

  })
  client.on("messageCreate" , msg => {

	if(msg.content.toLowerCase() === ".tag"){
	
	
	msg.reply({content : `\`${set.tag}\``})
	
	}
	
	  })


	  // Kayıt Mesaj

client.on("guildMemberAdd" , (member) => {

let guild = member.guild

let sayi = member.guild.memberCount

var kurulus = (Date.now() - member.user.createdTimestamp);

  let user = client.users.cache.get(member.id);

  var kurulus = (Date.now() - member.user.createdTimestamp);
      const ayyy = moment.duration(kurulus).format("M");
      var kontrol = [];
    
      if (ayyy < 1) {
        kontrol = ` ${emoji.red}  \`Şüpheli\` `;
      }
      if (ayyy > 1) {
        kontrol = ` ${emoji.onay} \`Güvenilir\` `;
      }


	client.channels.cache.get(set.registerchat).send(
		`
		
${emoji.hg1} **Sunucuya Hoşgeldin ${member}.

${emoji.hg2} Seninle Beraber \`${sayi}\` Kişi Olduk!

${emoji.hg3} Kaydının yapılması için <@&${set.regsiteryt}> bekleyip, ses teyite gelebilirsin ya da isim yaş söyleyip kayıt olabilirsin!

${emoji.hg4} Hesabın <t:${Math.floor(member.user.createdTimestamp / 1000)}> Tarihinde (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>) Önce Oluşturulmuş. Bu Hesap ${kontrol}

${emoji.hg6} \`Bu Sunucuya Girdikten Sonra Kuralları Okumuş Ve Kabul Etmiş Sayılırsınız, İyi Sohbetler Dileriz.\`**
		`
		)

member.roles.add(set.kayıtsız)
member.setNickname(set.kayıtsızisim)


})

// Kayıt Mesaj Son


//Tagrol

client.on("userUpdate", async function(oldUser, newUser) { 
    const guildID = set.sunucuid//Sunucunuz
    const roleID = set.tagrol//taglırolü
    const tag = set.tag
    const chat = set.chat// chat
    const log2 = set.taglog// log kanalı
  
    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
     if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(log2).send(` ${newUser} isminden ${ayarlar.tag} çıkartarak ailemizden ayrıldı!`)
        } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            member.roles.add(roleID)
            client.channels.cache.get(chat).send(`Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.(${tag})`)
            client.channels.cache.get(log2).send(`${newUser} ismine ${ayarlar.tag} alarak ailemize katıldı`)
        }}})

		//Tagrol son





