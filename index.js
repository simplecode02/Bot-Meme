const Discord = require("discord.js");
const fs = require('fs');
const { tictactoe } = require('reconlx')
const { hangman } = require('reconlx')
const { chatBot } = require('reconlx') 

//Game
const SnakeGame = require('./snake-game');
const MinesweeperGame = require('./minesweeper');
const Chess = require('./chess');
const Connect4 = require('./connect4');

//Login Bot
const client = new Discord.Client();
client.login(process.env.TOKEN);
client.commands = new Discord.Collection();

//Game Initial
const snakeGame = new SnakeGame(client);
const minesweeper = new MinesweeperGame(client);
const chess = new Chess(client);
const connect4 = new Connect4(client);

//Commands Handler
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

//Loading Commands
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log("Loading Command: "+commandName)
  });
});

//Bot Activity
const prefix = 'm.';
client.on("ready", function () {
    client.user.setActivity(`MEME ${prefix}help`, { type: "WATCHING" });
    console.log(`${client.user.tag} im active now`,);
})

//Bot Commands
client.on("message", async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.lenght).split(/ +/);
    const command = args.shift().toLocaleLowerCase();
    
    if(command === 'm.help'){
        let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("List Utility Bot")
            .addField("Info", `**${prefix}serverinf** : Show about Server **${prefix}userinf** : Show about user \n` + 
            `**${prefix}weather** : Show weather Info **${prefix}ping** : Shows the bot Latency \n` +
            `**${prefix}aboutme** : Info about the bot **${prefix}maker** : Info The maker`)
            .addField("Fun", `**${prefix}meme** : Generate meme \n` + 
            `**${prefix}joke** : Generate Joke **${prefix}advice** : Generate advice \n` + 
            `**${prefix}cat** : Generate cat picture **${prefix}dog** : Generate dog picure \n` + 
            `**${prefix}bet** : Heads or Tail bet **${prefix}8ball** : 8Ball Commands ** \n`+
            `${prefix}rate** : Rating someone **${prefix}gayscan** : Gay Scanner \n` +
            `**${prefix}poll** : Make simple poll ** ${prefix}chat** : Make simple conversation with bot \n` +
            `**[${prefix}chat still On progress please be patient]**`)
            .addField("Games", `**${prefix}snake** : Play snake game **${prefix}chess** : Play chess game **${prefix}mine** Play minesweeper game \n` +
            `**${prefix}cnnct4** : Play connect4 game **${prefix}hangman** : Play hang man games \n` +
            `**${prefix}tictac** : Play tic tac toe games`)
            .addField('INVITE', `**You can invite my bot use m.invite**`)
        message.channel.send(embed)
    }
    //=====================================================//
    //Info
    //=====================================================//
    //Server Info
    if(command === 'm.invite'){
      message.reply('https://discord.com/oauth2/authorize?client_id=791534486990356493&permissions=523328&scope=bot')
    }
    if(command === 'm.serverinf'){
        const { guild } = message
        const owneracc = guild.owner.user.tag;
        const guildroles = guild.roles.cache.size;
        const { name, region, memberCount, premiumSubscriptionCount, premiumTier } = guild
        const icon = guild.iconURL()
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Server info "${name}"`)
            .setThumbnail(icon)
            .addField(`About Server : \n =================================`, `***Region Server :*** ${region} \n **Create on :** ${new Date(guild.createdAt).toLocaleDateString()} \n ***=================================*** \n ***Members :*** ${memberCount}   ***Roles :*** ${guildroles} \n ***=================================*** \n ***Booster Server :*** ${premiumSubscriptionCount}  ***Nitro User :*** ${premiumTier}`)
            .addField(`Owner : `, owneracc)
        message.channel.send(embed)
    }
    //User Info
    if(command === 'm.userinf'){
        if(!args[0]){
            message.reply("You need to tag someone");return
        }
        else{
            const { guild } = message
            const user = message.mentions.users.first() || message.member.user
            const member = guild.members.cache.get(user.id)
            const memrols = member.roles.cache.size - 1;
            const memicon = user.displayAvatarURL;
            const userEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`User Info for ${user.username}`)
                .setThumbnail(user.displayAvatarURL())
                .addField(`About The User : \n =================================`, `***User Tag :*** ${user.tag} ***Username :*** ${user.username} \n ***=================================*** \n ***Roles :*** ${memrols}   ***Bot :*** ${user.bot}  \n ***=================================*** \n ***Join Server :*** ${new Date(member.joinedTimestamp).toLocaleDateString()} \n  ***Join Discord :*** ${new Date(user.createdTimestamp).toLocaleDateString()}`)
            message.channel.send(userEmbed)
        }
    }
    //Weather Info
    if(command === 'm.weather'){
        client.commands.get('weather').execute(message, args);
    }
    //Bot Latency
    if(command === 'm.ping'){
        client.commands.get('ping').execute(message, client);
    }
    //Bot Info
    if(command === 'm.aboutme'){
        client.commands.get('about').execute(message, client);
    }
    //Maker Info
    if(command === 'm.maker'){
        client.commands.get('maker').execute(message);
    }
    //=====================================================//
    //Fun
    //=====================================================//
    //Meme
    if(command === 'm.meme'){
        client.commands.get('meme').execute(message);
    }
    //Joke
    if(command === 'm.joke'){
        client.commands.get('joke').execute(message);
    }
    //Advice
    if (command === 'm.advice') {
        client.commands.get('advice').execute(message);
    }
    //Cat
    if (command === 'm.cat') {
        client.commands.get('cat').execute(message);
    }
    //Dog
    if (command === 'm.dog') {
        client.commands.get('dog').execute(message);
    }
    //Head & Tail Bet
    if(command === 'm.bet'){
        let number = Math.floor(Math.random() * 2);
        if (number == 1) {
            message.channel.send('Heads')
        }
        if (number == 0) {
            message.channel.send('Tails')
        }
    }
    //8Ball
    if(command === 'm.8ball'){
        if(!args[0]){
            return message.reply('Please give me the question')
        }
        if (!args[2]) {
            return message.reply('Please ask a full questions.')
        }
        let number = Math.floor(Math.random() * 6);
        if (number == 0) {
            return message.channel.send('Yes, definitely so.')
        }
        if (number == 1) {
            return message.channel.send('No, definitely not.')
        }
        if (number == 2) {
            return message.channel.send('Ask again later.')
        }
        if (number == 3) {
            return message.channel.send('It is uncertain.')
        }
        if (number == 4) {
            return message.channel.send('Odds are not in your favor.')
        }
        if (number == 5) {
            return message.channel.send('Odds are in your favor.')
        }
    }
    //Rate
    if(command === 'm.rate'){
        let number = Math.floor(Math.random() * 101);
        if (!args[1]) {
            let user = message.mentions.users.first();
            if (!user) {
                return message.channel.send('Please include who you are rating.')
            }
            return message.channel.send(`I would rate ` + user.username + ` a ${number} /100`)
        }
    }
    //Gay Scanner
    if(command === 'm.gayscan'){
        let number = Math.floor(Math.random() * 101);
        if (!args[1]) {
            let user = message.mentions.users.first();
            if (!user) {
                return message.channel.send('Please enter the user tag you want to scan')
            }
            let embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Gay Rate")
                .setThumbnail("https://www.crossed-flag-pins.com/animated-flag-gif/gifs/Rainbow_240-animated-flag-gifs.gif")
                .setDescription(`${user.username} Gay rate **${number}**/100`)
            return message.channel.send(embed)
        }
    }
    //Vote
    if(command === 'm.poll'){
        let pollChannel = message.mentions.channels.first();
        let pollDescription = args.slice(1).join(' ');
        if (!args[1]) {
            return message.reply('please mention the chanel first and dont forget to add your description. \n Ex: m.poll **currentchannel** **description** ')
        }
        let embedPoll = new Discord.MessageEmbed()
            .setTitle('Vote Now')
            .setDescription(`Please select 👍 for yes and select 👎 for no \n **${pollDescription}**`)
            .setColor("RANDOM")
        let msgEmbed = await pollChannel.send(embedPoll);
        await msgEmbed.react('👍')
        await msgEmbed.react('👎')
    }
    //Bot chat
    if(command === 'm.chat'){
        // chatBot(message, args.join(" "))
        return message.reply("This commands is stil on progress please be patient")
    }
    //=====================================================//
    //Game
    //=====================================================//
    //Bot Snake
    if (command === 'm.snake') {
        snakeGame.newGame(message);
    }
    //Bot Mine
    if(command === 'm.mine'){
        minesweeper.newGame(message);
    }
    //Bot Chess
    if(command === 'm.chess'){
        chess.newGame(message);
    }
    //Bot Connect4
    if(command === 'm.cnnct4'){
        connect4.newGame(message);
    }
    //Bot HangMan
    if (command === 'l-hangman') {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You need manage messages permission.')
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if (!channel) return message.channel.send('Please specify a channel')
        const word = args.slice(1).join(" ")
        if (!word) return message.channel.send('Please specify a word to guess.')

        const hang = new hangman({
            message: message,
            word: word,
            client: client,
            channelID: channel.id,
        })

        hang.start();
    }
    //Bot Tic Tac Toe
    if (command === 'm.tictac') {
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Please specify a member')

        new tictactoe({
            player_two: member,
            message: message
        })
    }
})

require('./server')();