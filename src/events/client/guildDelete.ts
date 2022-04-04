import { BounceClient } from "@structures/BounceClient";
import { ClientEvent } from "../../lib/structures/Event";
import { logger } from "../../index";
import axios from "axios";

export default new ClientEvent('guildDelete', (guild) => {
    const hook = process.env.GUILD_HOOK_URL!
    const Message = {
        "content": `Left \`\`${guild.name}\`\` containing ${guild.memberCount} members :(`
    }
    axios.post(hook, Message);
})