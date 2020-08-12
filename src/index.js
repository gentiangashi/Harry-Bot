const commando = require('discord.js-commando');
const bot = new commando.Client();

bot.registry.registerGroup('random', 'Random');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.on('message', (message) => {

    if(message.content == 'ping') {
       message.channel.send('pong!');
    }
});

bot.login('NzQzMTIxNTc4Mzg4MjI2MTY5.XzQD5g.mSlN-k-HjJCWwMVDcZQNKQ-IkuI');