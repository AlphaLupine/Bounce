import { messageEmbed } from "../../index";
import { Command } from "../../lib/structures/Command";
import { Paginator } from "../../lib/utilities/Paginator";
import { generateDurationBar, validateMusicCommandConditions, createPageArray } from "../../lib/utilities/Functions";
import { ExtendedInteraction } from "../../lib/typings/ExtendedInteraction";
import { Emojis } from "../../lib/utilities/Constants";
import { MessageActionRow, MessageButton } from "discord.js";
import { BounceEmbed } from "../../lib/structures/BounceEmbed";
import { Track } from "erela.js";

export default new Command({
    name: 'queue',
    description: 'Displays the player\'s current queue',

    run: async({client, interaction}) => {
        const extendedInteraction = interaction as ExtendedInteraction;
        const validate = await validateMusicCommandConditions(client, extendedInteraction);
        const player = client.manager.get(interaction.guildId!);
        const tracks = player?.queue.slice(0, player.queue.size >= 100 ? 100 : player.queue.size);
        const pages = createPageArray(tracks as Track[], 10, 10);
        
        if(validate) {
            //const paginator = new Paginator({pages: pages, timeouAt: 30000, interaction: extendedInteraction});
            let paginator = client.paginatorCache.get(player!);
            if(!paginator) paginator = new Paginator({pages: pages, timeout: 60000, client: client, player: player!, interaction: extendedInteraction});
            client.paginatorCache.set(player!, paginator!);
            await interaction.reply('Generating Queue');
            paginator!.displayPage();
        }
    }
})