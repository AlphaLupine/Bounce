import { ErelaEvent } from "../../lib/structures/Event";
import { client, messageEmbed } from "../../index";  
import { msConversion } from "../../lib/utilities/Functions";
import { TextChannel } from "discord.js";

export default new ErelaEvent('trackStart', async (player, track) => {
    const channel = client.channels.cache.get(player.textChannel!) as TextChannel;
    if(player.trackRepeat) return;
    const embed = new messageEmbed().music({
        title: track.title,
        duration: msConversion(track.duration),
        requester: track.requester,
        uri: track.uri,
        thumbnail: track.thumbnail
        
    });
    let oldMessage: any = player.getPlayingCache(channel.id);
    if(oldMessage && channel.lastMessageId === oldMessage) {
        let toEdit = channel.messages.cache.get(oldMessage);
        if(toEdit) return toEdit.edit({embeds: [embed]});
    }
    let message = await channel!.send({embeds: [embed]});
    return player.setPlayingCache(channel.id, message.id);
})