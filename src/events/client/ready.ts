import { BounceClient } from "@structures/BounceClient";
import { ClientEvent } from "../../lib/structures/Event";

export default new ClientEvent('ready', (client) => {
    const bot = client as BounceClient;
    bot.manager.init(client.user.id);
    console.log(`${client.user.username} is online`);
})