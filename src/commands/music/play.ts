import { messageEmbed } from "../../index";
import { Command } from "../../lib/structures/Command";
import { msConversion, validateMusicCommandConditions } from "../../lib/utilities/Functions";
import { ExtendedInteraction } from "../../lib/typings/Command";
import { SearchResult } from "erela.js";
import { GuildMember } from "discord.js";

export default new Command({
    name: 'play',
    description: 'Plays a song using a url or search query',
    options: [
        {
            name: 'query',
            type: 3,
            description: 'The url or search query for the song',
            required: true
        }
    ],
    run: async({client, interaction, args}) => {
        const extendedInteraction = interaction as ExtendedInteraction;
        const validate = await validateMusicCommandConditions(client, extendedInteraction);
        const guildMember = interaction.member as GuildMember;
        const query = args.data[0].value as string;
        let res: SearchResult;
        if(typeof validate === 'string' || validate === true) {
            try {
                res = await client.manager.search(query, interaction.user);
                if(res.loadType === 'LOAD_FAILED') return interaction.reply({embeds: [new messageEmbed().error().setDescription('Failed to load query result; try again')]});

                const player = client.manager.create({
                    guild: interaction.guildId!,
                    voiceChannel: typeof validate === 'string' ? validate : guildMember.voice.channelId!,
                    textChannel: interaction.channelId
                });
                player.connect();
                switch(res.loadType) {
                    case 'TRACK_LOADED':
                        player.queue.add(res.tracks[0]);

                        const TLembed = new messageEmbed().music({
                            title: res.tracks[0].title,
                            duration: msConversion(res.tracks[0].duration),
                            requester: res.tracks[0].requester,
                            thumbnail: res.tracks[0].thumbnail,
                            uri: res.tracks[0].uri
                        }, false, player);
                        if(!player.queue.size) {
                            interaction.reply({embeds: [TLembed], ephemeral: true});
                        } else interaction.reply({embeds: [TLembed]});

                        if(!player.playing && !player.paused) player.play();
                    break;
                    case 'PLAYLIST_LOADED':
                        const url = args.data[0].value as string;
                        const queueSize = player.queue.size;
                        player.queue.add(res.tracks);
                        const PLembed = new messageEmbed().music({
                            title: res.playlist!.name,
                            duration: msConversion(res.playlist!.duration),
                            requester: res.tracks[0].requester,
                            thumbnail: res.tracks[0].thumbnail,
                            uri: url
                        }, true, player);
                        if(!queueSize) {
                            interaction.reply({embeds: [PLembed], ephemeral: true});
                        } else interaction.reply({embeds: [PLembed]});
                        if (!player.playing && !player.paused) player.play();
                    break;
                    case 'SEARCH_RESULT':
                        const track = res.tracks[0];
                        player.queue.add(track);

                        const SRembed = new messageEmbed().music({
                            title: track.title,
                            duration: msConversion(track.duration),
                            requester: track.requester,
                            thumbnail: track.thumbnail,
                            uri: track.uri
                        }, false, player);
                        if(!player.queue.size) {
                            interaction.reply({embeds: [SRembed], ephemeral: true});
                        } else interaction.reply({embeds: [SRembed]});

                        if(!player.playing && !player.paused) player.play();
                    break
                }

            } catch(err) {
                return interaction.reply({embeds: [new messageEmbed().error().setDescription(`Error Searching: ${err}`)]});
            }
        }
        return;


    }
})

