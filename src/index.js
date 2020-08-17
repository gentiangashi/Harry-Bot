/* Network-Installed Dependencies */
const Discord = require(`discord.js`);
const Math = require(`math.js`);
const fs = require(`fs`);
const dotenv = require(`dotenv`).config();

/* Client Config */
const config = require(`./config/config`);
const client = new Discord.Client({
    // disableEveryone: true,
    fetchAllMembers: true, 
    sync: true
});
const cooldowns = new Discord.Collection();

module.exports = {
    config: config,
    client: client
}

/* Client Events */
client.on(`ready`, async () => {
    console.log(`${client.user.username}#${client.user.discriminator} has started, with ${client.users.cache.size} users in ${client.guilds.cache.size} servers at ${config.hostname}.`);
    refreshActivity();
});

/* Client Events */
client.events = new Discord.Collection();
fs.readdir(`${__dirname}/events/`, (err, files) => {
    if(err) console.error(err);

    let jsFiles = files.filter(f => f.split(`.`).pop() == `js`);
    if(jsFiles.length <= 0) return console.log(`No events to load!`);

    /* Load Commands */
    jsFiles.forEach(f => client.events.set(f.split(`.`)[0], require(`./events/${f}`)));
    // console.log(`[${client.shard.id}]: Loaded ${jsFiles.length} event${jsFiles.length === 1 ? ``: `s`}!`);
    console.log(`Loaded ${jsFiles.length} event${jsFiles.length === 1 ? null: `s`}!`);
});

/* Client Commands */
client.commands = new Discord.Collection();
fs.readdir(`${__dirname}/commands/`, (err, files) => {
    if(err) console.error(err);

    let jsFiles = files.filter(f => f.split(`.`).pop() == `js`);
    if(jsFiles.length <= 0) return console.log(`No commands to load!`);

    /* Load Commands */
    jsFiles.forEach(f => {
        let props = require(`./commands/${f}`);
        client.commands.set(props.name, props);
    });
    console.log(`Loaded ${jsFiles.length} command${jsFiles.length === 1 ? ``: `s`}!`);
});

/* Client Checks */
const refreshActivity = async() => {

	client.user.setPresence({
        activity: {
            name: `!h help`,
            type: `PLAYING`
        },
        status: `online`
	});
}

client.on(`message`, async message => {
    const m = `${message.author} » `;
    
    /* Botception & Message Handling */
    if(message.author.bot || message.channel.type == `dm`) return;
    if(message.content.slice(0, config.prefix.length).toString().toLowerCase() != config.prefix) return;
    if(!message.content.toLowerCase().startsWith(config.prefix)) return;

    /* Get Commands & Arguments */
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    /* Validate Commands */
    let cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if(!cmd || command === ``) return;
    else if((cmd.usage) && args.length < (cmd.usage.split(`<`).length) - 1) return message.channel.send(`${message.author} Proper usage is \`${config.prefix + cmd.name} ${cmd.usage}\`.`);
    else {
    	if (!cooldowns.has(cmd.name)) cooldowns.set(cmd.name, new Discord.Collection());
        const now = Date.now();
        const timestamps = cooldowns.get(cmd.name);
        let cooldownAmount = cmd.cooldown * 1000;
        
        if (timestamps.has(message.author.id)) {
            let expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.channel.send(`${m} You cannot ${cmd.name} for another \`${timeLeft.toFixed(1)}\` seconds.`);
          }
        } 
          
          timestamps.set(message.author.id, now);
          setTimeout(() => timestamps.delete(message.author.id) , cooldownAmount);
    
        try {
            console.log(`${message.author.tag} ran command ${command} in ${message.guild.name} [${message.author.id}].`);
            cmd.run(client, message, args);
           } 

        catch(err) { console.log(`There was an error executing command ${command} by ${message.author.tag}.`);
        message.channel.send(err)}
    }
});


client.login(config.token).catch(err => console.error(`Failed to authenticate client with application.`));
client.setMaxListeners(0);
