import { Message, MessageActionRow, MessageButton } from "discord.js";
import { logger, messageEmbed } from "../../index";
import { Command } from "../../lib/structures/Command";

export default new Command({
    name: 'reload',
    description: 'Reloads all commands for the bot',
    run: async({client, interaction}) => {
        if(process.env.DEVELOPER_ID !== interaction.user.id) return;
        logger.debug('Attempting command reload');
        try{
            client.commands.clear();
            client.loadCommands();
            const embed = new messageEmbed().success().setDescription(`Reloaded all commands`);
            interaction.reply({embeds: [embed]});
        } catch (err) {
            logger.error(err);
            const embed = new messageEmbed().success().setDescription(`${err}`);
            interaction.reply({embeds: [embed]});
        }
        
    }
})

