function deleteMessage(message) { 
    let deletedMessageAuthor = message.author.id;
    message.delete()
        .then(message.channel.send("<@" + deletedMessageAuthor + ">, " + `:speaking_head: :no_entry_sign:`));
}

module.exports = deleteMessage;