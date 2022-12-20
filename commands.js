require('dotenv').config()

const { REST, SlashCommandBuilder, Routes } = require('discord.js')
const {token,serverId,clientId} = require('./config.js')
const fs = require('node:fs')
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
const commands = []

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    commands.push(command.toJSON())
}

const rest = new REST({ version: '10' }).setToken(token)

rest.put(Routes.applicationGuildCommands(clientId, serverId), { body: commands })
    .then((data) => console.log(`Successfully registered ${data.length} application commands.`))
    .catch(console.error)