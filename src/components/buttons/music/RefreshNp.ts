import { validateMusicCommandConditions, generateDurationBar } from "../../../lib/utilities/Functions";
import { messageEmbed } from "../../../index";
import { Button } from "../../../lib/structures/Button";
import { ExtendedInteraction } from "../../../lib/typings/ExtendedInteraction";
import { MessageActionRow, MessageButton } from "discord.js";
import { Emojis } from "../../../lib/utilities/Constants";

export default new Button({
    name: 'refresh-np',
    run: async({client, interaction}) => {
        const player = client.manager.get(interaction.guildId!);
        const validate = await validateMusicCommandConditions(client, (interaction) as unknown as ExtendedInteraction)
        const track = player?.queue.current;
        if(validate) { 
            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId(`refresh-np`)
                    .setEmoji(Emojis.music.refresh)
                    .setStyle('PRIMARY'),
            );

            return interaction.update({
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