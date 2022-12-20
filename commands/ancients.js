const { SlashCommandBuilder } = require('discord.js')
module.exports = new SlashCommandBuilder().setName('ancients').setDescription('Manage your ancient shards!')
    .addSubcommand(subcommand =>
        subcommand
            .setName('add')
            .setDescription('Add a number of ancient shards to your stack')
            .addStringOption(option =>
                option.setName('amount')
                    .setDescription('Add a number of ancient shards to your stack')
                    .setRequired(false))
            .setDescription('Adds a number of shards to your list!')
    ).addSubcommand(subcommand =>
        subcommand
            .setName('reset')
            .setDescription('Reset the number of ancient shards')
    ).addSubcommand(subcommand =>
        subcommand
            .setName('list')
            .setDescription(`List how many ancient shards you've pulled`)
    );