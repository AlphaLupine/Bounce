import { ClientEvent } from "../../lib/structures/Event";
import { client } from "../../index"
//@ts-ignore
export default new ClientEvent('raw', (data) => {
    //@ts-ignore
    client.manager.updateVoiceState(data);
})