const { SlashCommandBuilder } = require('discord.js')

module.exports = new SlashCommandBuilder().setName('voids').setDescription('Manage your void shards!')
    .addSubcommand(subcommand =>
        subcommand
            .setName('add')
            .setDescription('Add a number of void shards to your stack')
            .addStringOption(option =>
                option.setName('amount')
                    .setDescription('Add a number of void shards to your stack')
                    .setRequired(false))
            .setDescription('Adds a with shard numbers!')
    ).addSubcommand(subcommand =>
        subcommand
            .setName('reset')
            .setDescription('Reset the number of void shards')
    ).addSubcommand(subcommand =>
        subcommand
            .setName('list')
            .setDescription(`List how many void shards you've pulled`)
    );