import { messageEmbed } from "../../index";
import { Command } from "../../lib/structures/Command";

export default new Command({
    name: 'ping',
    description: 'Returns client websocket ping',
    run: async({client, interaction}) => {
        const embed = new messageEmbed().setDescription(`Client websocket ping: ${client.ws.ping}`);
        interaction.reply({embeds: [embed]}); 
    }
})

