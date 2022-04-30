// command to pat the bot
function pat(message) {
    message.channel.send(`<a:FennPat:827655742176886834>`);
    if (message.author.id === "116284273870241799") {
        message.reply(`chuu~ :heart:`);
    }
    if (message.author.id === "233066616508645386") {
        message.reply(`You're so cute, wan!`);
    }
}

module.exports = pat;