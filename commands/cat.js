const Discord = require("discord.js");
const axios = require('axios');

module.exports = {
    name: 'cat',
    description: "Generate random cat picture",
    async execute(message) {
        message.reply("Generate cat picture....")
        axios
            .get('https://api.thecatapi.com/v1/images/search')
            .then((res) => {
                const link = res.data[0].url;
                let embed = new Discord.MessageEmbed()
                    .setColor(0x00FF2E)
                    .setTitle(`Cat successfully generate`)
                    .setImage(link)
                message.channel.send(embed)
            })
            .catch((err) => {
                console.error('ERR:', err)
            })
    }
}