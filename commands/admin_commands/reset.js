// Admin command to reset the values of all the pulls
function resetPulls(imgRarity) {
    // For resetting all pulls values to 0
    for (let i = 0; i < imgRarity.length; i++) {
        imgRarity[i].pulls = 0;
    }
    return imgRarity;
}

module.exports = resetPulls;