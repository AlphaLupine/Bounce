import { ChatInputApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver, CommandInteractionResolvedData, GuildManager, GuildMember, Interaction, PermissionResolvable } from "discord.js";
import { BounceClient } from "../structures/BounceClient";
import { ExtendedInteraction } from "./ExtendedInteraction";
interface RunOptions {
    client: BounceClient,
    interaction: ExtendedInteraction | CommandInteraction,
    args: CommandInteractionOptionResolver
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
    userPermissions?: PermissionResolvable[];
    run: RunFunction;
} & ChatInputApplicationCommandData