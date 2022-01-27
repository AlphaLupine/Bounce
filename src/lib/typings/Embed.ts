import { User } from "discord.js";
import { Track } from "erela.js";

export type ColoursType = {
    main: string,
    success: string,
    warning: string,
    error: string
}

export type MusicEmbedOptions = {
    title: string
    duration: number
    requester: User
    thumbnail?: string
    uri: string
}
