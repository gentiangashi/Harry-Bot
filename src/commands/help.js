const Discord = require(`discord.js`);
const { config } = require(`../index.js`);

module.exports = {
	name: `help`,
	description: `View info about commands.`,
	usage: `<command name>`,
	cooldown: null,
    aliases: [`commands`, `?`, `h`]
}

module.exports.run = async(client, message, args) => {
    const v = `${message.author} »`
    const commands = client.commands;

    let embed = new Discord.MessageEmbed()
    .setColor(config.colors.blue)
    .setAuthor(`Help Menu`)
    .setThumbnail('https://i.imgur.com/PrTsFaf.png')
    .setTimestamp(new Date())
    .setFooter(config.footer, 'https://i.imgur.com/PrTsFaf.png');

    let data = [];
    if(!args[0]) {
        let helpTxt = ``;
        commands.forEach(cmd => cmd.dev != true && cmd.name != `` ? helpTxt += `\`${config.prefix + cmd.name + (cmd.usage !== null ? ` ${cmd.usage}`: ``)}\` - ${cmd.description}\n`: null);
        
        embed.setDescription(helpTxt)
        return message.channel.send(embed);
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    if(!command || command.dev == true) return message.channel.send(`${v} That is not a valid command!`);

    if(command.usage) data.push(`**Usage:** ${config.prefix}${command.name} ${command.usage}`);
    if(command.aliases) data.push(`**Aliases:** ${command.aliases.join(`, `)}`);
    if(command.cooldown !== null) data.push(`**Cooldown:** ${command.cooldown} seconds.`);

    embed.setAuthor(`Help Menu | ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}`)
    .setDescription(`${command.description}\n\n${data.join(`\n`)}`)
    return message.channel.send(embed);
}
