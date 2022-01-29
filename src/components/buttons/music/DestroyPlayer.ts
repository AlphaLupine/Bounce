import { validateMusicCommandConditions } from "../../../lib/utilities/Functions";
import { messageEmbed } from "../../../index";
import { Button } from "../../../lib/structures/Button";
import { ExtendedInteraction } from "../../../lib/typings/ExtendedInteraction";
import { MessageActionRow, MessageButton } from "discord.js";
import { Emojis } from "../../../lib/utilities/Constants";

export default new Button({
    name: 'destroy-player',
    run: async({client, interaction, data}) => {
        const player = client.manager.get(interaction.guildId!);
        const url = data![1];
        if(url !== player?.queue.current?.uri) return interaction.reply({embeds: [new messageEmbed().setDescription('This song is not playing anymore')], ephemeral: true})
        const validate = await validateMusicCommandConditions(client, (interaction) as unknown as ExtendedInteraction)
        if(validate) {
            player.manager.emit('queueEnd', player);
            return interaction.reply({embeds: [new messageEmbed().setDescription('You destroyed the player')], ephemeral: true})
        }

        return;
    }
})