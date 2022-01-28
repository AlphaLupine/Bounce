import { CommandInteraction } from "discord.js";
import { Player } from "erela.js";
import { messageEmbed } from "../../index";
import { BounceClient } from "../structures/BounceClient";
import { ExtendedInteraction } from "../typings/Command";

export function msConversion(ms: number) {
    let hours: any = Math.floor((ms / (1000 * 60 * 60)) % 24);
    let minutes: any = Math.floor((ms / (1000 * 60)) % 60);
    let seconds: any = Math.floor((ms / 1000 ) % 60);

    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds

    const concatenatedTime: string = `${hours === '00' ? '' : `${hours}:`}${minutes === '00' ? 'Seconds: ' : `${minutes}:`}${seconds}`;
    return concatenatedTime;

}
//Get player; if exists check if user is in the same vc; if it does not exist check if user is in a VC and return the voicechannel id
export function validateMusicCommandConditions(client: BounceClient, interaction: ExtendedInteraction): Promise<void> | Boolean | string {
    const player: Player | undefined = client.manager.get(interaction.guildId!);
    if(player && interaction.member.voice.channelId != player.voiceChannel) {
        return interaction.reply({embeds: [new messageEmbed().setDescription('You must be in the same VC to use this command')], ephemeral: true});
    }
    if(!interaction.member.voice.channel) return interaction.reply({embeds: [new messageEmbed().setDescription('You must be in a voice channel to use this command')], ephemeral: true});
    if(!player && interaction.commandName === 'play') {
        return interaction.member.voice.channel.id;
    }

    if(!player) return interaction.reply({embeds: [new messageEmbed().setDescription('There is no player in this guild to use this command')], ephemeral: true});
    return true;
}