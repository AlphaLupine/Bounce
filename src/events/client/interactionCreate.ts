import { CommandInteractionOptionResolver } from "discord.js";
import { client, logger } from "../../index";
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
        const toGet = (interaction.customId).split('|')
        const button = client.buttons.get(toGet[0])
        return button?.run({client, interaction, data: toGet})
    }
    return;
})