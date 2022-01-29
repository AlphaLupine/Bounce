import { messageEmbed } from "../../index";
import { Command } from "../../lib/structures/Command";
import { validateMusicCommandConditions } from "../../lib/utilities/Functions";
import { ExtendedInteraction } from "../../lib/typings/ExtendedInteraction";
import { MessageActionRow, MessageButton } from "discord.js";
import { Emojis } from "../../lib/utilities/Constants";

export default new Command({
    name: 'volume',
    description: 'Sets the volume of the player',
    options: [
        {
            name: 'volume',
            type: 10,
            description: 'The volume to set the player',
            required: false

        },
    ],

    run: async({client, interaction, args}) => {
        const extendedInteraction = interaction as ExtendedInteraction;
        const validate = await validateMusicCommandConditions(client, extendedInteraction);
        const player = client.manager.get(interaction.guildId!);
        if(validate) {
            if(args.data[0]) {
                const volume = args.data[0].value as number;
                if(volume < 1 || volume > 100) return interaction.reply({embeds: [new messageEmbed().setDescription(`Volume can only be between 1 - 100%`)], ephemeral: true});
                player?.setVolume(volume);
                return interaction.reply({embeds: [new messageEmbed().setDescription(`${interaction.user} set the volume of the player to ${volume}%`)]});
            }

            return interaction.reply({embeds: [new messageEmbed().setDescription(`Current volume of the player: ${player?.volume}%`)]});
        }
        return;
    }
})