import { BounceEmbed } from "../structures/BounceEmbed";
import { Button } from "../structures/Button";
import { ExtendedInteraction } from "./ExtendedInteraction";

export interface PaginatorOptions {
    pages: BounceEmbed[],
    buttons: Button[],
    timeout: number,
    interaction: ExtendedInteraction
}