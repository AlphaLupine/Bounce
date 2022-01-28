import { ButtonInteraction, Message } from "discord.js";
import { messageEmbed } from "../../../index";
import { Button } from "../../../lib/structures/Button";

export default new Button({
    name: 'test-handler',
    run: async({client, interaction}) => {
        interaction.update({embeds: [new messageEmbed().setDescription('It works')]});
    }
})