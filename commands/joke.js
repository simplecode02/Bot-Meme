const Discord = require("discord.js");
const client = new Discord.Client()
const { Random } = require("something-random-on-discord")
const random = new Random();

module.exports = {
    name: 'joke',
    description: "give random joke",
    async execute(message) {
        let data = await random.getJoke()
        message.channel.send(data)
    }
}