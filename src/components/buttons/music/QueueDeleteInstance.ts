import { validateMusicCommandConditions } from "../../../lib/utilities/Functions";
import { messageEmbed } from "../../../index";
import { Button } from "../../../lib/structures/Button";
import { ExtendedInteraction } from "../../../lib/typings/ExtendedInteraction";
import { MessageActionRow, MessageButton } from "discord.js";
import { Emojis } from "../../../lib/utilities/Constants";
import { Paginator } from "../../../lib/utilities/Paginator";

export default new Button({
    name: 'queue-delete-instance',
    run: async({client, interaction, data}) => {
        const player = client.manager.get(interaction.guildId!);
        const paginator = client.paginatorCache.get(player!);
        const validate = await validateMusicCommandConditions(client, (interaction) as unknown as ExtendedInteraction)
        if(validate) {
            interaction.deleteReply();
            client.paginatorCache.delete(player!);
        }

        return;
    }
})