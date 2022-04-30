// Command to ping the bot
function ping(message) {
    var timeTaken = Date.now() - message.createdTimestamp;
    if (timeTaken < 0) {
        timeTaken = 0 - timeTaken;
    }
    message.reply(` pong! This message had a latency of ${timeTaken}ms wan~!`);
}

module.exports = ping;