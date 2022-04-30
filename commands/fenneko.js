const Discord = require('discord.js');
var moment = require('moment-timezone');

// Command that pulls an image from the pool
function fenneko(img, fs, message) {
    fennequote = gacha(img, fs, between(0, 100), message);
    console.log(moment.tz(new Date(), "America/New_York").format("MM/DD/YYYY h:mma z --"), fennequote[0], fennequote[2]); // For logging purposes
    status = '';
    embedColor = "#2f3136";
    // , Pulls: *${fennequote[1]}* <== something that can be added to the string literals below to show the amount of pulls in the message body

    if (fennequote[2] === "UR")      {   status = `Wowowowow! You pulled a UR, wan~!\n`; embedColor = "#a54efc"; }
    else if(fennequote[2] === "SSR") {   status = `Wowow! You pulled a SSR, wan~!\n`; embedColor = "#e59b3b"; }
    else if (fennequote[2] === "SR") {   status = `Wow! You pulled a SR, wan~!\n`; embedColor = "#f7d113"; }
    else if (fennequote[2] === "R")  {   status = `You pulled a R, wan~!\n`; embedColor = "#1394f7"; }
    else                            {   status = `You pulled a common, wan~!\n`;        }

    //message.channel.send(status + "> " + `Title: *${fennequote[0]}*`, { files: [`./assets/`+fennequote[0]+`.png`] }); old image message without embed

    fennEmbed = {};
    if (fennequote[1] === 1) {
        fennEmbed = {
            description: status,
            title: `*${fennequote[0]}*`,
            color: "#e904f9",
            footer: { text: `Rarity: ${fennequote[2]} | Pulls: ${fennequote[1]} | NEW` },
            image : { url: `${fennequote[3]}`, },
        };
    }
    else if (fennequote[1] === 100 || fennequote[1] === 500 || fennequote[1] === 1000) {
        fennEmbed = {
            description: status,
            title: `*${fennequote[0]}*`,
            color: "#00efef",
            footer: { text: `Rarity: ${fennequote[2]} | PULL NUMBER ${fennequote[1]}!!!` },
            image : { url: `${fennequote[3]}`, },
        };
    }
    else {
        fennEmbed = {
            description: status,
            title: `*${fennequote[0]}*`,
            color: embedColor,
            footer: { text: `Rarity: ${fennequote[2]} | Pulls: ${fennequote[1]}` },
            image : { url: `${fennequote[3]}`, },
        };
    }
    message.channel.send({ embeds: [fennEmbed] });
    //channel.send({ content: 'Hello!', embeds: [embed, embed2] });
}

function between(min, max) { return Math.floor(Math.random() * (max - min) + min); }

function gacha(img, fs, num, message) {
    // console.log(new Date(), "Number out of 100: ", num);
    randvar = 0;
    var rarity; 
    let URIndex = img.URs.length;
    let SSRIndex = URIndex + img.SSRs.length;
    let SRIndex = SSRIndex + img.SRs.length ;
    let RIndex = SRIndex + img.Rs.length;
    let commonsIndex = RIndex + img.commons.length;
    let indexArray = [URIndex, SSRIndex, SRIndex, RIndex, commonsIndex];
    
    if (num >= 0 && num <= 5)       { randVar = between(0, URIndex);   } // UR
    else if (num > 5 && num <= 17)  { randVar = between(URIndex, SSRIndex);   } // SSR
    else if (num > 17 && num <= 35) { randVar = between(SSRIndex, SRIndex);  } // SR
    else if (num > 35 && num <= 60) { randVar = between(SRIndex, RIndex); } // R
    else                            { randVar = between(RIndex, commonsIndex); } // Common
    // console.log(new Date(), "Random Number: ", randVar);
    
    if (randVar <= URIndex) {
        rarity = 'URs';
    }
    else if (randVar <= SSRIndex) {
        rarity = 'SSRs';
    }
    else if (randVar <= SRIndex) {
        rarity = 'SRs';
    }
    else if (randVar <= RIndex) {
        rarity = 'Rs';
    }
    else if (randVar <= commonsIndex) {
        rarity = 'commons';
    }

    return getJSON(img, fs, randVar, rarity, indexArray);   
}

function getJSON(img, fs, num, rarity, indexArray) {
    // Updates the pull count for the pulled image, writes to the file to update it, then returns the results

    if (rarity === 'URs') {
        img.URs[num].pulls += 1;
        updateRaritiesJson(img, fs)
        return [img.URs[num].name, img.URs[num].pulls, img.URs[num].rarity, img.URs[num].url];
    }
    else if (rarity === 'SSRs') {
        num -= indexArray[0];
        img.SSRs[num].pulls += 1;
        updateRaritiesJson(img, fs)
        return [img.SSRs[num].name, img.SSRs[num].pulls, img.SSRs[num].rarity, img.SSRs[num].url];
    }
    else if (rarity === 'SRs') {
        num -= indexArray[1];
        img.SRs[num].pulls += 1;
        updateRaritiesJson(img, fs)
        return [img.SRs[num].name, img.SRs[num].pulls, img.SRs[num].rarity, img.SRs[num].url];
    }
    else if (rarity === 'Rs') {
        num -= indexArray[2];
        img.Rs[num].pulls += 1;
        updateRaritiesJson(img, fs)
        return [img.Rs[num].name, img.Rs[num].pulls, img.Rs[num].rarity, img.Rs[num].url];
    }
    else if (rarity === 'commons') {
        num -= indexArray[3];
        img.commons[num].pulls += 1;
        updateRaritiesJson(img, fs)
        return [img.commons[num].name, img.commons[num].pulls, img.commons[num].rarity, img.commons[num].url];
    }
}

function updateRaritiesJson(img, fs) {
    fs.writeFile("./rarities.json",  JSON.stringify(img, null, 2), err => {
        if (err) console.log("Error writing file:", err);
    });
}

module.exports = fenneko;