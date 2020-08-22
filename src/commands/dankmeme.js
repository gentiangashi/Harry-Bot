const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const fetch = require(`node-fetch`);

module.exports = {
    name: `dankmeme`,
    description: `View a random meme from /r/dankmemes.`,
    usage: null,
    cooldown: 5,
    aliases: [`meme`]
}

module.exports.run = async(client, message, args) => {

    fetch(`https://api.reddit.com/r/dankmemes/top.json?sort=top&t=day&limit=800`)
    .then(response => response.json())
    .then(response => {

         let image = response.data.children[Math.floor(Math.random() * Object.keys(response).length)].data;
         
        const dankEmbed = new Discord.MessageEmbed()
        .setColor(0x0099ff)
        .setTitle(image.title)
        .setImage(image.url)
	.setFooter("Image from r/dankmemes")
        message.channel.send(dankEmbed);
    });
}