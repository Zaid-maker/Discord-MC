//Import files & packages
const discord = require('discord.js');
const mineflayer = require('mineflayer');
const client = new Discord.Client({ disableEveryone: true })
const fs = require('fs');
const config = require('./config.json');
const players = require('./players.json');

//Global Variables
var token = config['token'];
var channel = config['channel'];
var ip = config['ip'];
var port = config['port'];
var prefix = config['prefix']
var user = config['email'];
var pw = config['password'];


//Creates the minecraft bot & logs into the server
const bot = mineflayer.createBot({

    host: ip, //You can use "localhost" to connect to a LAN server
    port: port,
    username: user,
    password: pw,
    version: '1.12.2' //You can leave blank to auto-detect, but it only supports 1.12.2 and lower

});


client.on('ready', () => {

    //Sends a message once the bot loads correctly
    console.log('Successfully loaded...');

})


bot.on('login', () => {

    //Sends a message once the minecraft bot logs into a minecraft server
    console.log(`Connected to ${ip}:${port}`);
    client.channels.get(channel).send(`Connected to ${ip}: ${port}`);

});


bot.on('chat', (player, message) => {

    //This will send an embed to the discord when a player chats
    client.channels.get(channel).send({
        embed: {
            color: 0x00ffff, //You may change this to whatever hex, but make sure you replace "#" with "0x"
            title: playername,
            description: message
        }
    });

});

client.on('message', (message) => {

    //This splits the message up into arguments
    var args = message.content.slice(' ')

    //If message is in the desired channel then send to the server
    if (message.channel.id == channel) {
        message.delete();
        bot.chat(`[${message.auhtor.tag}] ${message}`)
    } else {
        //If the message is not in the desired channel, then ignore it
        return
    }

})

client.login(token);

