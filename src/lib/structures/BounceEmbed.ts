import { MusicEmbedOptions } from "../typings/Embed";
import { ColorResolvable, MessageEmbed } from "discord.js";
import { client } from "../../index";
import { Colours, Emojis } from "../utilities/Constants";
import { Player } from "erela.js";

export class BounceEmbed extends MessageEmbed {
    constructor(data = {}) {
        super(data);
        this.setAuthor({name: client.user!.username/*, iconURL: client.user!.avatarURL()!*/})
        this.setColor(Colours.main as ColorResolvable)
    }

    success() {
        return this.setColor(Colours.success as ColorResolvable)
            .setTitle(`${Emojis.success} Success`);
    }

    error() {
        return this.setColor(Colours.error as ColorResolvable)
			.setTitle(`${Emojis.error} Error`)
    }

    warning() {
        return this.setColor(Colours.warning as ColorResolvable)
			.setTitle(`${Emojis.error} Error`)
    }

    music(trackDetails: MusicEmbedOptions, isPlaylist = false, player?: Player) {
        const {title, duration, requester, thumbnail, uri} = trackDetails;
        const toReturn = (
            this.setAuthor({name: client.user!.username/*, iconURL: client.user!.avatarURL()!*/})
            .setTitle(`${player?.queue.size ? "Adding" : "Now Playing"} ${isPlaylist ? "Playlist" : "Track"}${player?.queue.size ? " To Queue" : ""}`) //2D
            .setDescription(`**${isPlaylist ? 'Playlist Name: ' : 'Song Name: '} **${title}\n**Duration: **${duration}\n**Requested By: **${requester}`)
            .setFooter({text: uri})
            .setColor(Colours.main as ColorResolvable)
        );
        if(thumbnail) toReturn.setThumbnail(thumbnail);
        return toReturn;
    }
}