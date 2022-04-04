import { messageEmbed } from "../../index";
import { Command } from "../../lib/structures/Command";
import os from "os-utils";
import { msConversion } from "../../lib/utilities/Functions";
import { Statuses, Status, Emojis } from "../../lib/utilities/Constants";

export default new Command({
    name: 'info',
    description: 'Returns information about the bot',
    run: async({client, interaction}) => {
        const url = "https://www.bounce.center"
        const embed = new messageEmbed()
            .setDescription(
                [
                    `**[${client.user?.username}](${url})**`,
                    "Keeping music *simple*, as it should be\n",
                    "**Bounce Information**",
                    `   **- Uptime:** ${msConversion(client.uptime!)}`,
                    `   **- Guilds:** ${client.guilds.cache.size}`,
                    `   **- Users:** ${client.users.cache.size}`,
                    `   **- Players:** ${client.manager.players.size}\n`,
                    "**Server Information**",
                    `   **- CPU Cores:** ${os.cpuCount()}`,
                    `   **- Memory Usage:** ${((os.totalmem() - os.freemem()) / 1024).toFixed(2)} / ${(os.totalmem() / 1024).toFixed(2)} GB`,
                    `   **- Operating System:** ${os.platform()}\n`,
                    "**Using**",
                    "   **-** Node.js",
                    "   **-** Erela.js",
                    "   **-** Lavalink",
                    "   **-** Written in: TypeScript"
                ].join("\n")
            ).setFooter({ text: `Status: ${client.status}` })
        interaction.reply({embeds: [embed]}); 
    }
})

