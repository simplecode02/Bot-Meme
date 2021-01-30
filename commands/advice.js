const Discord = require("discord.js")
const client = new Discord.Client()
const { Random } = require("something-random-on-discord")
const random = new Random();

module.exports = {
    name: 'advice',
    description: "give random joke",
    async execute(message) {
        let data = await random.getAdvice()
        message.channel.send(data)
    }
}