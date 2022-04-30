// Command to attempt to give chocolate to the bot
function chocolate(num, message) {
    if (num == 0) {
        message.reply(`eugh <:MioWorry:751634031103180826>`)
    }
    if (num == 1) {
        message.reply(`yay chocolate! <:MioYay:797318372593106956>`);
    }
    if (num == 2) {
        message.reply(`why I never! <:FennekoGasp:825508510841700373>`);
    }
    if (num == 3) {
        message.reply(`you will be banned imminently`);
    }
}

module.exports = chocolate;