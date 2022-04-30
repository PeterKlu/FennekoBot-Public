const Discord = require('discord.js');

// Command that lists the pulls for the server
function pull(pulls, img, message, command) {
    arrayOfEverything = [];
    img.URs.forEach(element => arrayOfEverything.push(element));
    img.SSRs.forEach(element => arrayOfEverything.push(element));
    img.SRs.forEach(element => arrayOfEverything.push(element));
    img.Rs.forEach(element => arrayOfEverything.push(element));
    img.commons.forEach(element => arrayOfEverything.push(element));

    if (command === "pulls") {
        let embeds = embedBuilder(img, pulls, arrayOfEverything);
        message.channel.send({ embeds: [embeds[0], embeds[1], embeds[2], embeds[3], embeds[4], embeds[5]] });  
    }
    else if (command === "new") {
        let embeds = embedBuilderForNew(img, pulls, arrayOfEverything);
        message.channel.send({ embeds: [embeds[0]] });
    }
    
}

function embedBuilder (img, pulls, arrayOfEverything) {
    const pageLengthNum = 6;
    const embed1 = new Discord.MessageEmbed()
        .setTitle("The Current Pulls for the Whole Server, Wan~!")
        .setColor('#00ffff')
        .setFooter("Page 1 of ".concat(`${pageLengthNum}`));
    const embed2 = new Discord.MessageEmbed()
        .setColor('#00ffff')
        .setFooter("Page 2 of ".concat(`${pageLengthNum}`));
    const embed3 = new Discord.MessageEmbed()
        .setColor('#00ffff')
        .setFooter("Page 3 of ".concat(`${pageLengthNum}`));
    const embed4 = new Discord.MessageEmbed()
        .setColor('#00ffff')
        .setFooter("Page 4 of ".concat(`${pageLengthNum}`));
    const embed5 = new Discord.MessageEmbed()
        .setColor('#00ffff')
        .setFooter("Page 5 of ".concat(`${pageLengthNum}`));
    const embed6 = new Discord.MessageEmbed()
        .setColor('#00ffff')
        .setFooter("Page 6 of ".concat(`${pageLengthNum}`));

    //Each embed can only hold a maximum of 24 items
    for (let i = 0; i < 24; i++) {
        embed1.addField(`${arrayOfEverything[i].name} (${arrayOfEverything[i].rarity})`, `${arrayOfEverything[i].pulls} pulls`, true);
    }
    for (let i = 24; i < 48; i++) {
        embed2.addField(`${arrayOfEverything[i].name} (${arrayOfEverything[i].rarity})`, `${arrayOfEverything[i].pulls} pulls`, true);
    }
    for (let i = 48; i < 72; i++) {
        embed3.addField(`${arrayOfEverything[i].name} (${arrayOfEverything[i].rarity})`, `${arrayOfEverything[i].pulls} pulls`, true);
    }
    for (let i = 72; i < 96; i++) {
        embed4.addField(`${arrayOfEverything[i].name} (${arrayOfEverything[i].rarity})`, `${arrayOfEverything[i].pulls} pulls`, true);
    }
    for (let i = 96; i < 120; i++) { 
        embed5.addField(`${arrayOfEverything[i].name} (${arrayOfEverything[i].rarity})`, `${arrayOfEverything[i].pulls} pulls`, true);
    }
    for (let i = 120; i < pulls.length; i++) { // length = 126, so it's a list of 7 out of 24 maximum so far
        embed6.addField(`${arrayOfEverything[i].name} (${arrayOfEverything[i].rarity})`, `${arrayOfEverything[i].pulls} pulls`, true);
    }

    pages = [ embed1, embed2, embed3, embed4, embed5, embed6 ];
    return pages;
}

function embedBuilderForNew (img, pulls, arrayOfEverything) {
    const embed1 = new Discord.MessageEmbed()
    .setTitle("Quotes that are new or haven't been pulled yet~!")
    .setColor('ce6b8c');

    newExists = false;

    arrayOfEverything.forEach(element => {
        if (element.pulls === 0) {
            embed1.addField(`${element.name} (${element.rarity})`, `${element.pulls} pulls`, true);
            newExists = true;
        }
    });

    if (newExists === false) {
        embed1.addField("Nothing new today, check back tomorrow~!", "(っ´ω`)ﾉ(╥ω╥)");
    }

    embed = [embed1];
    return embed;
}

module.exports = pull;