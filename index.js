require('dotenv').config()
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { Sequelize, myShard, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/database.sqlite'
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});
/voids add 5
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;
    if (commandName === 'cheers') {
        await interaction.reply(`Cheers ${interaction.user.username}! 🍻`);
    } else if (commandName === 'server') {
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}\nServer ID: ${interaction.guild.id}`);
    }

    if (['ancients', 'sacreds','voids'].includes(commandName) !== false) {
        await sequelize.sync()
        const arguments = interaction.options.get('amount')

        const Shard = require('./models/shard.js')(sequelize, DataTypes)
        const [myShard, created] = await Shard.findOrCreate({
            where: { userId: interaction.user.id, userName: interaction.user.username },
            defaults: {
                ancients: 0,
                sacreds: 0,
                voids: 0,
                userName: interaction.user.username,
                userId: interaction.user.id
            }
        });

        const emojis = {
            ancients: interaction.guild.emojis.cache.find(emoji => emoji.name === 'ancient').id,
            voids: interaction.guild.emojis.cache.find(emoji => emoji.name === 'void').id,
            sacreds: interaction.guild.emojis.cache.find(emoji => emoji.name === 'sacred').id,
        }

        if (interaction.options.getSubcommand() === 'add') {
            try {
                await myShard.increment([commandName], { by: arguments.value });
                await myShard.save()
                interaction.reply(`Added ${arguments.value} of ${commandName} shards to your stack`)
            } catch(e) {
                interaction.reply('couldnt save the shards, oops')
            }
         }

         if (interaction.options.getSubcommand() === 'reset') {
            try {
                let update = {}
                switch (commandName) {
                    case 'voids': update = { voids: 0}
                    break
                    case 'sacreds': update = {sacreds: 0}
                    break
                    case 'ancients': update = {ancients: 0}
                    break
                    default:
                        throw 'Oops! Something went wrong'
                }

                await Shard.update(update, {
                    where: {
                        userId: interaction.user.id
                    }
                });
                interaction.reply(`Reset the number of ${commandName}`)
            } catch(e) {
                interaction.reply('Ooooops! Something went straight to shit')
            }
        }

        if (interaction.options.getSubcommand() === 'list') {
            let response = 'You have:\n'
            response += `${client.emojis.cache.get(emojis.ancients)}: ${myShard.ancients}\n`
            response += `${client.emojis.cache.get(emojis.voids)}: ${myShard.voids}\n`
            response += `${client.emojis.cache.get(emojis.sacreds)}: ${myShard.sacreds}`
            interaction.reply(response)
        }

    }

});
// Login to Discord with your client's token
client.login(process.env.TOKEN);