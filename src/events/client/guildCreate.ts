import { BounceClient } from "@structures/BounceClient";
import { ClientEvent } from "../../lib/structures/Event";
import { logger } from "../../index";
import axios from "axios";

export default new ClientEvent('guildCreate', (guild) => {
    const hook = process.env.GUILD_HOOK_URL!
    const Message = {
        "content": `Joined \`\`${guild.name}\`\` containing ${guild.memberCount} members!`
    }
})