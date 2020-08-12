const commando = require('discord.js-commando');
const bot = new commando.Client();

class DiceRollCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'roll',
            group: 'random',
            memberName: 'roll',
            description: 'Rolls a dice'
        });
    }

    async run(message, args) {
            var roll = Math.floor(Math.random() * 6) + 1;
            message.reply("You rolled a " + roll);
    }
}

module.exports = DiceRollCommand;