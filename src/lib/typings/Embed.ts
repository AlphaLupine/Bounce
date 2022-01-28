import { Track } from "erela.js";

export type ColoursType = {
    main: string,
    success: string,
    warning: string,
    error: string
}

export type MusicEmbedOptions = {
    title: string
    duration: string
    requester: unknown
    thumbnail: string | null
    uri: string
}
