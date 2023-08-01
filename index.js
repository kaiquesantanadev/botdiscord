const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

//dotenv
const dotenv = require('dotenv').config()
const {TOKEN} = process.env

// import dos comandos
const fs = require('node:fs')
const path = require('node:path')
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection()

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)

    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command)
    } else {
        console.log(`Esse comando em ${filePath} está com "data" ou "execute" ausentes.`)
    }
}

//Login bot
client.once(Events.ClientReady, c => {
	console.log(`Pronto! Login realizado como: ${c.user.tag}`);
});
client.login(TOKEN);

//Listener de interação com o bot
client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isStringSelectMenu()) {
        const selected = interaction.values[0]

        switch(selected) {
            case 'javascript': {
                await interaction.reply('Documentação do Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScrip')
                break;
            }
            case 'typescript': {
                await interaction.reply("Documentação do TypeScript: https://www.typescriptlang.org/docs/")
                break;
            }
            case 'discordjs': {
                await interaction.reply('Documentação do DiscordJS: https://discordjs.guide/#before-you-begin')
                break;
            }
        }
        
    }

    if (!interaction.isChatInputCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) {
        console.error('Comando não encontrado.')
        return
    }
    try {
        await command.execute(interaction)
    } catch(e) {
        console.error(e)
        await interaction.reply(`Houve um erro ao executar esse comando (${e})`)
    }
})