import { messageEmbed } from "../../index";
import { Command } from "../../lib/structures/Command";
import { validateMusicCommandConditions } from "../../lib/utilities/Functions";
import { ExtendedInteraction } from "../../lib/typings/ExtendedInteraction";

export default new Command({
    name: 'skip',
    description: 'Skips the current song',

    run: async({client, interaction}) => {
        const extendedInteraction = interaction as ExtendedInteraction;
        const validate = await validateMusicCommandConditions(client, extendedInteraction);
        const player = client.manager.get(interaction.guildId!);
        if(validate) {
            await interaction.reply({
                embeds: [
                    new messageEmbed().setDescription(`${interaction.user} skipped the song`)
                ]
            });
            player!.stop();
        }
        return;
    }
})