import { messageEmbed } from "../../index";
import { Command } from "../../lib/structures/Command";
import { validateMusicCommandConditions } from "../../lib/utilities/Functions";
import { ExtendedInteraction } from "../../lib/typings/ExtendedInteraction";

export default new Command({
    name: 'repeat',
    description: 'Repeats song or queue',
    options: [
        {
            name: 'repeat-queue',
            type: 5,
            description: 'Wether the queue should repeat',
            required: false
        },
    ],

    run: async({client, interaction, args}) => {
        const extendedInteraction = interaction as ExtendedInteraction;
        const validate = await validateMusicCommandConditions(client, extendedInteraction);
        const player = client.manager.get(interaction.guildId!);
        const toRepeatQueue = args.data[0]?.value;
        if(validate) {
            let trackPreviousState = player?.trackRepeat;
            let queuePreviousState = player?.queueRepeat;
            if(toRepeatQueue) {
                player?.setQueueRepeat(!queuePreviousState);
                return interaction.reply({embeds: [new messageEmbed().setDescription(`Queue repeat was set to \`\`${!queuePreviousState}\`\` by ${interaction.user}\n${queuePreviousState ? '' : '*Remember:* The current track is set to repeat'}`)]});
            }

            player?.setTrackRepeat(!trackPreviousState);
            return interaction.reply({embeds: [new messageEmbed().setDescription(`Queue repeat was set to \`\`${!queuePreviousState}\`\` by ${interaction.user}`)]});
            
        }
        return;
    }
})