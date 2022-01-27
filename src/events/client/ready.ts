import { Event } from "../../lib/structures/Event";

export default new Event('ready', (client) => {
    console.log(`${client.user.username} is online`);
})