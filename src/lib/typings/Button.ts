import { ButtonInteraction, Interaction } from "discord.js";
import { BounceClient } from "../structures/BounceClient";
//import { Interaction } from "./ExtendedInteraction";
interface RunOptions {
    client: BounceClient,
    interaction: ButtonInteraction,
    data?: string[]; 
}

type RunFunction = (options: RunOptions) => any;

export type ButtonType = {
    name: string
    run: RunFunction;
}