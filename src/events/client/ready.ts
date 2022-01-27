import { ClientEvent } from "../../lib/structures/Event";

export default new ClientEvent('ready', (client) => {
    console.log(`${client.user.username} is online`);
})