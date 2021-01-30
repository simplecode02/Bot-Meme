const Discord = require("discord.js");

module.exports = {
    name: 'maker',
    description: "Send Info About the Maker",
    async execute(message) {
        let embedmaker = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Info about the Maker`)
            .addField(`=================================`, `🛠️ ***Discord tag :*** Psycho#7037 \n ***Instagram :*** https://www.instagram.com/ptravi_01/ \n ***Facebook :*** https://www.facebook.com/ptravi01/ \n ***Wordpress :*** https://simplecode01.wordpress.com \n ***GitHub :*** https://github.com/simplecode01`)
        message.channel.send(embedmaker)
    }
}