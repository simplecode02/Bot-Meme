const Discord = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: 'meme',
    description: "Generate random meme",
    async execute(message) {
        let msg = message.reply("please wait a second!");
        fetch('https://meme-api.herokuapp.com/gimme')
            .then(res => res.json())
            .then(json => {
                let embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`Meme successfully generate`)
                    .setImage(json.url)
                message.channel.send(embed)
            });
    }
}