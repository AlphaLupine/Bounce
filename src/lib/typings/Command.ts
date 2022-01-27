import { ChatInputApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver, PermissionResolvable } from "discord.js";
import { BounceClient } from "../structures/BounceClient";

interface RunOptions {
    client: BounceClient,
    interaction: CommandInteraction,
    args: CommandInteractionOptionResolver
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
    userPermissions?: PermissionResolvable[];
    run: RunFunction;
} & ChatInputApplicationCommandData