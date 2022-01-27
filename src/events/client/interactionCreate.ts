import { CommandInteractionOptionResolver } from "discord.js";
import { client } from "../../index";
import { ClientEvent } from "../../lib/structures/Event";

export default new ClientEvent('interactionCreate', async (interaction) => {
    if(interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        return command?.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction
        });
    }
    return;
})