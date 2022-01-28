import { Message, MessageActionRow, MessageButton } from "discord.js";
import { messageEmbed } from "../../index";
import { Command } from "../../lib/structures/Command";

export default new Command({
    name: 'buttons',
    description: 'A development command to learn how to use buttons',
    run: async({client, interaction}) => {

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('test-handler')
                    .setLabel('Test Handler')
                    .setStyle('PRIMARY')
            );

        const embed = new messageEmbed().setDescription(`Does it work?`);
        interaction.reply({embeds: [embed], components: [row]});
    }
})

