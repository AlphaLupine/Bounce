import { validateMusicCommandConditions } from "../../../lib/utilities/Functions";
import { messageEmbed } from "../../../index";
import { Button } from "../../../lib/structures/Button";
import { ExtendedInteraction } from "../../../lib/typings/ExtendedInteraction";
import { MessageActionRow, MessageButton } from "discord.js";
import { Emojis } from "../../../lib/utilities/Constants";

export default new Button({
    name: 'play-pause',
    run: async({client, interaction, data}) => {
        const player = client.manager.get(interaction.guildId!);
        const url = data![1];
        if(url !== player?.queue.current?.uri) return interaction.reply({embeds: [new messageEmbed().setDescription('This song is not playing anymore')], ephemeral: true})
        const validate = await validateMusicCommandConditions(client, (interaction) as unknown as ExtendedInteraction)
        if(validate) { 

            let playerPauseState = player!.paused;
            player!.pause(!playerPauseState)
            const track = player!.queue.current;

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId(`skip-song|${track!.uri}`)
                    .setEmoji(Emojis.music.skip)
                    .setStyle('PRIMARY'),

                new MessageButton()
                    .setCustomId(`play-pause|${track!.uri}`)
                    .setEmoji(playerPauseState ? Emojis.music.pause : Emojis.music.resume)
                    .setStyle('PRIMARY'),

                new MessageButton()
                    .setCustomId(`destroy-player|${track!.uri}`)
                    .setEmoji(Emojis.music.destroy)
                    .setStyle('DANGER')
            )

            await interaction.update({components: [row]})
        }

        return;
    }
})