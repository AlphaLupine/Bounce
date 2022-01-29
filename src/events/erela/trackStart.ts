import { ErelaEvent } from "../../lib/structures/Event";
import { client, logger, messageEmbed } from "../../index";  
import { msConversion } from "../../lib/utilities/Functions";
import { TextChannel, MessageActionRow, MessageButton } from "discord.js";
import { Emojis } from "../../lib/utilities/Constants";

export default new ErelaEvent('trackStart', async (player, track) => {
    logger.info(`Track started <${track.title}> in ${player.guild}`)
    const channel = client.channels.cache.get(player.textChannel!) as TextChannel;
    if(player.trackRepeat) return;
    const embed = new messageEmbed().music({
        title: track.title,
        duration: msConversion(track.duration),
        requester: track.requester,
        uri: track.uri,
        thumbnail: track.thumbnail
        
    });

    const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId(`skip-song|${track.uri}`)
                    .setEmoji(Emojis.music.skip)
                    .setStyle('PRIMARY'),

                new MessageButton()
                    .setCustomId(`play-pause|${track.uri}`)
                    .setEmoji(Emojis.music.pause)
                    .setStyle('PRIMARY'),

                new MessageButton()
                    .setCustomId(`destroy-player|${track.uri}`)
                    .setEmoji(Emojis.music.destroy)
                    .setStyle('DANGER')
            );

    let oldMessage: any = player.getPlayingCache(channel.id);
    if(oldMessage && channel.lastMessageId === oldMessage) {
        let toEdit = channel.messages.cache.get(oldMessage);
        if(toEdit) return toEdit.edit({embeds: [embed], components:[row]});
    }

    let message = await channel!.send({embeds: [embed], components: [row]});
    return player.setPlayingCache(channel.id, message.id);
})