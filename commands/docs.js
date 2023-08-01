const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('docs')
    .setDescription('Documentações de tecnologias.'),

	async execute(interaction) {
		const select = new StringSelectMenuBuilder()
			.setCustomId('select')
			.setPlaceholder('Selecione uma documentação:')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('JavaScript')
					.setDescription('Veja a documentação do JavaScript.')
					.setValue('javascript'),
				new StringSelectMenuOptionBuilder()
					.setLabel('TypeScript')
					.setDescription('Veja a documentação do TypeScript.')
					.setValue('typescript'),
				new StringSelectMenuOptionBuilder()
					.setLabel('DiscordJS')
					.setDescription('Veja a documentação do DiscordJS.')
					.setValue('discordjs'),
			);

		const row = new ActionRowBuilder()
			.addComponents(select);

		await interaction.reply({
			content: 'Veja a lista de documentações de tecnologias escolhidas abaixo.',
			components: [row],
		});
	},
};