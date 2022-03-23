import { ApplicationCommandDataResolvable, GuildMember, Snowflake } from "discord.js";

export interface RegisterCommandsOptions {
    guildId?: string;
    commands: ApplicationCommandDataResolvable[];
}

export type usedButtonCache = {
    customId: string
    timestamp: number
}