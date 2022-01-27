import { ErelaEvent } from "../../lib/structures/Event";

export default new ErelaEvent('nodeConnect', (node) => {
    console.log(`Established connection with node ${node.options.host}`)
})