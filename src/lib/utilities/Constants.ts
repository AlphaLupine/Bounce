import { ColoursType } from "../typings/Embed";

export const Colours: ColoursType = {
    main: 'BLUE',
    success: 'GREEN',
    warning: 'ORANGE',
    error: 'RED'
}

export const Emojis = {
    success: "✅",
    error: "❌", 
    warning: "⚠️" ,
    status: ["🟢", "🟠", "🔴" ],
    music: {
        skip: '<:skip_white:936799242436091974>',
        pause: '<:pause_white:936799262522630164>',
        resume: '<:resume_white:936799262635859998>',
        close: '<:remove_white:936817436475420693>',
        destroy: '<:disconnect_white:936816124564242453>',
        refresh: '<:refresh_white:937024706039664681>',
        nextPage: '<:next_page:957667214167777330>',
        prevPage: '<:prev_page:957667528677675028>',
        stop: '<:stop_white:957735840212201542>',
        skipToEnd:'<:skip_to_end:957990762178551829>',
        skipToStart: '<:skip_to_front:957990580649095268>'
    }
}

export const Statuses = ["Online", "Maintenance", "Unstable"]

export enum Status {
    Online,
    Maintenace,
    Unstable
}