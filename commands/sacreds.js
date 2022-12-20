const { SlashCommandBuilder } = require('discord.js')
module.exports = new SlashCommandBuilder().setName('sacreds').setDescription('Manage your sacred shards!')
    .addSubcommand(subcommand =>
        subcommand
            .setName('add')
            .setDescription('Add a number of sacred shards to your stack')
            .addStringOption(option =>
                option.setName('amount')
                    .setDescription('Add a number of sacred shards to your stack')
                    .setRequired(false))
            .setDescription('Adds a number of shards!')
    ).addSubcommand(subcommand =>
        subcommand
            .setName('reset')
            .setDescription('Reset the number of sacred shards')
    ).addSubcommand(subcommand =>
        subcommand
            .setName('list')
            .setDescription(`List how many sacred shards you've pulled`)
    );