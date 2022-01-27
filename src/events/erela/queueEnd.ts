import { ErelaEvent } from "../../lib/structures/Event";
import { client, messageEmbed } from "../../index";
import { TextChannel } from "discord.js";

export default new ErelaEvent('queueEnd', (player) => {
    const channel = client.channels.cache.get(player.textChannel!) as TextChannel;
    channel.send({embeds: [new messageEmbed().setDescription('End of queue reached - Leaving channel')]});
    player.destroy();
})