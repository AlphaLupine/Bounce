import { ErelaEvent } from "../../lib/structures/Event";
import { client, messageEmbed } from "../../index";  
import { MusicEmbedOptions } from "@typings/Embed";
import { TextChannel } from "discord.js";

export default new ErelaEvent('trackStart', (player, track) => {
    const channel = client.channels.cache.get(player.textChannel!) as TextChannel;
    if(player.trackRepeat) return;
    const embed = new messageEmbed().music({
        title: track.title,
        duration: track.duration,
        requester: track.requester,
        uri: track.uri
    });
    return channel!.send({embeds: [embed]});
})