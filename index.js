const Discord = require("discord.js");
const fs = require("fs");
var moment = require('moment-timezone');

const config = require("./config.json");
const choco = require("./commands/chocolate");
const pat = require("./commands/pat");
const cmds = require("./commands/cmds");
const ping = require("./commands/ping");
const pull = require("./commands/pulls");
const fenneko = require("./commands/fenneko");
const bonk = require("./commands/bonk");
const drip = require("./commands/drip");
const deleteMessage = require("./commands/deleteMessage");

const resetPulls = require("./commands/admin_commands/reset");
const indexJSON = require("./commands/admin_commands/indexJSON");


const client = new Discord.Client({ intents: ["GUILDS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_MESSAGES", "GUILD_MESSAGE_TYPING", "GUILD_PRESENCES"]});
const prefix = "!";
const AUTHOR = "125285454814642176";
//const customEmojiRegex = /:.+?:\d+:/;
//const defaultEmojiRegex = /:[^:\s]+:/;

var img = fs.readFile("./rarities.json", "utf8", (err, data) => {
    try {
        img = JSON.parse(data);
    } catch (error) {
        console.log(err);
    }
    
})

client.login(config.BOT_TOKEN);
client.on("ready", () => { 
    client.user.setStatus("online");
    console.log("Succesffully started at " + moment.tz(new Date(), "America/New_York").format("MM/DD, h:mma z"));

    client.user.setActivity(moment.tz(new Date(), "Asia/Tokyo").format("MM/DD, HH:mm z"));
    setInterval(() => {
        client.user.setActivity(moment.tz(new Date(), "Asia/Tokyo").format("MM/DD, HH:mm z"));
    }, 60000);
})

client.on("messageCreate", function(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return; // && message.channel.id !== "714021906176802879") return;
    
    if (message.channel.id === "834908564417282058" || message.channel.id === "826560091083505715") {
    // if (message.channel.id === "714021906176802879") {
        const commandBody = message.content.slice(prefix.length);
        const args = commandBody.split(' ');
        const command = args.shift().toLowerCase();
        pulls = Array(img.images.length);

        // Command that pulls an image from the pool
        if (command === "fenneko" || (command === "fantastic" && message.author.id === "192182341244944384") || 
           (command === "caw" && message.author.id === "785659024250896435")) { fenneko(img, fs, message); }

        // Command that lists the pulls for the server
        else if (command === "pulls") { /*message.channel.send(pulls.length)*/pull(pulls, img, message); }

        // Command to ping the bot
        else if (command === "pingfenneko") { ping(message) }

        // Command to bonk the bot
        else if (command === "bonkfenneko" || command === "fennekobonk" || 
                 command === "bonkfenn" || command === "fennbonk") { bonk(message); }

        // command to pat the bot
        else if (command === "patfenneko" || command === "fennekopat" || 
                 command === "patfenn" || command === "fennpat") { pat(message); }

        // Command to attempt to give chocolate to the bot
        else if (command === "chocolatefenneko" || command === "chocolatefenn" || 
                command === "chocofenn" || command === "fennchoco" || 
                command === "fennekochocolate" || command === "chocofenneko") 
                { choco(Math.floor(Math.random() * 4), message); }

        // Command to list the bot's commands
        else if (command === "fennekocommands" || command === "fenncommands") { cmds(message); }

        else if (command === "fennekodrip" || command === "fenndrip") { drip(message); }
        // Admin commands
        if (message.author.id === AUTHOR) {
            // Admin command to reset the values of all the pulls
            if (command === "resetfenneko" || command === "resetfenn") { img.images = resetPulls(img); }

            // Admin command to index the JSON file for readability
            if (command === "indexfenneko" || command === "indexfenn") { indexJSON(img, fs, message); }
        }
    }

    // else if (message.channel.id === "714021906176802879") {
    //     if (!message.content.match(customEmojiRegex) ) { deleteMessage(message); }
    // }
});