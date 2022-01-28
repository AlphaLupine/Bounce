import { ChatInputApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver, CommandInteractionResolvedData, GuildManager, GuildMember, Interaction, PermissionResolvable } from "discord.js";
import { BounceClient } from "../structures/BounceClient";

export interface ExtendedInteraction extends CommandInteraction {
    member: GuildMember
}

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