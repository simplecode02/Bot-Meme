const Discord = require("discord.js");

module.exports = {
    name: 'about',
    description: "Send Info About the Bot",
    async execute(message, client) {
        let embedbot = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setColor("RANDOM")
            .setThumbnail(client.user.displayAvatarURL())
            .setAuthor(`STATS AND INFORMATION`, client.user.displayAvatarURL())
            .addField("Total Server", client.guilds.cache.size, true)
            .addField("ID", client.user.id, true)
            .addField("Presence", client.user.presence.activities[0].name, true)
            .addField("Uptime", client.uptime, true)
            .addField("Status", client.user.presence.status, true)
            .addField("Total Member", client.users.cache.size, true)
            .addField("Library", "Node Js", true)
            .addField("Owner", "Psycho#7037", true)
            .addField("Date Created", `12/24/2020`, true)
        message.channel.send(embedbot)
    }
}