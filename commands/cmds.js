const Discord = require('discord.js');

// Command to list the bot's commands
function cmds(message) {
    const embed = new Discord.MessageEmbed()
    .setTitle("Here are my commands, wan~")
    .setColor('ce6b8c');

    embed.addField("Commands:", 
    "\n`!pingfenneko` will let you check if I'm alive\
    \n`!fenneko` will prompt me to share my grand wisdom\
    \n`!pulls` will show you how often each piece of wisdom has appeared so far for the whole server\
    \n`!new` will show you any new quotes that have been added recently, or any that still haven't been pulled yet~!\
    \n`!bonkfenneko` also exists!\
    \n`!patfenneko` lets you pat me!!!\
    \n`!chocolatefenneko` will let you attempt to give me ~~poison~~ chocolate");

    message.channel.send({ embeds: [embed] });
}

module.exports = cmds;