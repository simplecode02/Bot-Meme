const Discord = require("discord.js");

module.exports = {
    name: 'ping',
    description: "Send Latency Bot Info",
    async execute(message, client) {
        message.reply('Calculating ping...').then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp
            let embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`📶 Latency Bot, API`)
                .addField(`=================================`, `***Bot latency*** : ${ping} \n **=================================** \n ***API latency :*** ${client.ws.ping}`)
            resultMessage.edit(embed)
        })
    }
}