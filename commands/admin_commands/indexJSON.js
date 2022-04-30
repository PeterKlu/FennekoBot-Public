// Admin command to index the JSON file for readability
function indexJSON(img, fs, message) {
    for (let i = 0; i < img.URs.length; i++) {
        img.URs[i].index = i;
    }
    for (let i = img.URs.length; i < img.URs.length + img.SSRs.length; i++) {
        img.SSRs[i - img.URs.length].index = i;
    }
    for (let i = img.URs.length + img.SSRs.length; i < img.URs.length + img.SSRs.length + img.SRs.length; i++) {
        img.SRs[i - img.URs.length - img.SSRs.length].index = i;
    }
    for (let i = img.URs.length + img.SSRs.length + img.SRs.length; i < img.URs.length + img.SSRs.length + img.SRs.length + img.Rs.length; i++) {
        img.Rs[i - img.URs.length - img.SSRs.length - img.SRs.length].index = i;
    }
    for (let i = img.URs.length + img.SSRs.length + img.SRs.length + img.Rs.length; i < img.URs.length + img.SSRs.length + img.SRs.length + img.Rs.length + img.commons.length; i++) {
        img.commons[i - img.URs.length - img.SSRs.length - img.SRs.length - img.Rs.length].index = i;
    }

    fs.writeFile("./rarities.json",  JSON.stringify(img, null, 2), err => {
        if (err) console.log("Error writing file: ", err);
        message.channel.send("`JSON file indexed successfully`");
    });
}

module.exports = indexJSON;