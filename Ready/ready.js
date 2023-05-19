let { ActivityType} = require("discord.js")
let {Durum} = require("../config")

module.exports = {

    name: 'ready',
    
	once: true,
	execute(client) {
       console.log(`${client.user.tag} Aktif!`)
        client.user.setStatus("dnd")
        client.user.setActivity({name : Durum, type : ActivityType.Streaming , url : `https://www.twitch.tv/sanctusfurki`})}
      
      
    }
    