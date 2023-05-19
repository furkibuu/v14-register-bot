

exports.run = async(client, message , args) => {

message.reply({content : `Botun geçikmesi \`${client.ws.ping}\``})


}

exports.help = {

name : `ping`

}

exports.conf = {


    aliases: ['ping',"ms"],
}