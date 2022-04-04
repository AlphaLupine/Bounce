import { BounceClient } from "@structures/BounceClient";
import { ClientEvent } from "../../lib/structures/Event";
import { logger } from "../../index";

export default new ClientEvent('ready', (client) => {
    const bot = client as BounceClient;
    bot.manager.init(client.user.id);
    logger.info(`${bot.user!.username} established websoket connection`);
    bot.user!.setActivity("Host issues", { type: "WATCHING" });
    bot.user!.setStatus("dnd");
})