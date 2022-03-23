import { messageEmbed } from "../../index";
import { Command } from "../../lib/structures/Command";
import { msConversion, validateMusicCommandConditions } from "../../lib/utilities/Functions";
import { ExtendedInteraction } from "../../lib/typings/ExtendedInteraction";
import { SearchResult } from "erela.js";
import { GuildMember } from "discord.js";

export default new Command({
    name: 'tts',
    description: 'Text to speech',
    options: [
        {
            name: 'dialogue',
            type: 3,
            description: 'The words to be spoken',
            required: true
        }
    ],
    run: async({client, interaction, args}) => {
        const extendedInteraction = interaction as ExtendedInteraction;
        const validate = await validateMusicCommandConditions(client, extendedInteraction);
        const guildMember = interaction.member as GuildMember;
        const speech = args.data[0].value as string;
        let res: SearchResult;
        if(typeof validate === 'string' || validate === true) {
            try {
                res = await client.manager.search({source: "tts", query: speech}, interaction.user);
                if(res.loadType === 'LOAD_FAILED') return interaction.reply({embeds: [new messageEmbed().error().setDescription('Failed to speak')]});

                const player = client.manager.create({
                    guild: interaction.guildId!,
                    voiceChannel: typeof validate === 'string' ? validate : guildMember.voice.channelId!,
                    textChannel: interaction.channelId
                });
                player.connect();
                const track = res.tracks[0];
                player.queue.add(track);

                const SRembed = new messageEmbed()
                    .setAuthor({name: client.user!.username/*, iconURL: client.user!.avatarURL()!*/})
                    .setTitle(`${player?.queue.size ? "Adding" : "Now Playing"} Text to Speech ${player?.queue.size ? " To Queue" : ""}`) //2D
                    .setDescription(`**Content: ${track.title}**`)
                    .setFooter("Text To Speech")
                    
                if(!player.queue.size) {
                    interaction.reply({embeds: [SRembed], ephemeral: true});
                } else interaction.reply({embeds: [SRembed]});

                if(!player.playing && !player.paused) player.play();
            }

            catch(err) {
                return interaction.reply({embeds: [new messageEmbed().error().setDescription(`Error Speaking: ${err}`)]});
            }
        }
        return;
    }
})

