import { messageEmbed } from "../../index";
import { Command } from "../../lib/structures/Command";
import { generateDurationBar, validateMusicCommandConditions } from "../../lib/utilities/Functions";
import { ExtendedInteraction } from "../../lib/typings/ExtendedInteraction";
import { Emojis } from "../../lib/utilities/Constants";
import { MessageActionRow, MessageButton } from "discord.js";

export default new Command({
    name: 'nowplaying',
    description: 'Displaying the current song',

    run: async({client, interaction}) => {
        const extendedInteraction = interaction as ExtendedInteraction;
        const validate = await validateMusicCommandConditions(client, extendedInteraction);
        const player = client.manager.get(interaction.guildId!);
        const track = player?.queue.current;
        if(validate) {

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId(`refresh-np`)
                    .setEmoji(Emojis.music.refresh)
                    .setStyle('PRIMARY'),
            );

            return interaction.reply({
                embeds: [
                    new messageEmbed()
                        .setDescription(
                            [
                                `${player?.playing ? Emojis.music.resume : Emojis.music.pause} Currently Playing:`,
                                `Track: [${track?.title}](${track?.uri})`,
                                generateDurationBar(player!.position, track!.duration!),
                                `Requested by: ${track?.requester}`
                            ].join('\n')
                        )
                ], components: [row]
            });
        }
        return;
    }
})