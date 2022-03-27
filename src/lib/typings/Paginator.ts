import { Paginator } from "../utilities/Paginator";
import { BounceEmbed } from "../structures/BounceEmbed";
import { ExtendedInteraction } from "./ExtendedInteraction";
import { BounceClient } from "../structures/BounceClient";
import { Player } from "erela.js";

export interface PaginatorOptions {
    pages: BounceEmbed[],
    timeout: number,
    client: BounceClient,
    player: Player
    interaction: ExtendedInteraction
}
