import { ButtonInteraction, CommandInteractionOptionResolver } from "discord.js";
import { client, logger, messageEmbed } from "../../index";
import { ClientEvent } from "../../lib/structures/Event";


export default new ClientEvent('interactionCreate', async (interaction) => {
    if(interaction.isCommand()) {
        logger.info(`New interaction created at ${interaction.guild?.name}`)
        const command = client.commands.get(interaction.commandName);
        return command?.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction
        });
    }
    if(interaction.isButton()) {
        const buttonInteraction = interaction as ButtonInteraction;
        const toCompare = buttonInteraction.customId.split('|')
        const cache = client.usedButtonCache.get(interaction.user.id);
        const toGet = (interaction.customId).split('|');
        if(cache) {
            const { timestamp } = cache;
            if(toGet[0] === toCompare[0] && ((interaction.createdTimestamp - timestamp) / 1000) <= 5) {
                return interaction.reply({embeds: [new messageEmbed().setDescription('Step it down a notch! This button is on cooldown')], ephemeral: true});
            }
        }
        client.usedButtonCache.set(interaction.user.id, {customId: toGet[0], timestamp: interaction.createdTimestamp});
        const button = client.buttons.get(toGet[0]);
        return button?.run({client, interaction, data: toGet})
    }
    return;
})