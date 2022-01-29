import { logger } from "../../index";
import { ErelaEvent } from "../../lib/structures/Event";

export default new ErelaEvent('nodeConnect', (node) => {
    logger.info(`Established connection with node ${node.options.host}`)
})