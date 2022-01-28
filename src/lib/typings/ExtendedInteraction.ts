import {GuildMember, CommandInteraction } from "discord.js";

export interface ExtendedInteraction extends CommandInteraction {
    member: GuildMember
}