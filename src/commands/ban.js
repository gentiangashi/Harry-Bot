const Discord = require(`discord.js`);
const { config } = require(`../index.js`);

module.exports = {
    name: `ban`,
    description: `Ban Mentioned User`,
    usage: '<mentionnd|id> <Reason>',
    cooldown: null,
    aliases: null
}

module.exports.run = async(client, message, args) => {
	if (!message.mentions.users.size) {
            return message.reply('You need to tag a user in order to kick them!');
        } else {
            let toBan = message.mentions.users.first();
            let reason = args.join(' ').slice(22);
            
            if(!reason) return message.channel.send("No reason specified");
            if (!message.member.hasPermission('MANAGE_MESSAGES')) {
                return message.channel.send('Sorry You Dont Have Permission To Ban User');
            }
            let inline = true;
            let embed = new Discord.MessageEmbed()
            .setTitle(`**Banned**`)
            .setColor('PURPLE')
            .setDescription(`**You Were Banned From ${message.guild.name}**`)
            .addField('Banned By', `${message.author.tag}`, inline)
            .addField('Reason:', reason)
            .setTimestamp()
            toBan.send(embed);
            let modlog = message.guild.channels.cache.find(ch => ch.name === 'mod-log');
    
            let banEmbed = new Discord.MessageEmbed()
            .setTitle('**Ban**')
            .setColor('PURPLE')
            .addField('Kicked User', `${toBan} with ID: ${toBan.id}`)
            .addField('Kicked By', `<@${message.author.id}> with ID: ${message.author.id}`)
            .addField('Kicked From', `${message.channel}`)
            .addField('Reason', `${reason}`)
            .setTimestamp(new Date())
            .setFooter('RIP');
            if(!modlog) {
                return message.channel.send('Can\'t find incidents channel');
            }

            message.guild.member(toBan).ban(reason);
            modlog.send(banEmbed);

        }
        message.delete();    
}