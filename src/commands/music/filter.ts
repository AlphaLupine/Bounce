import { messageEmbed } from "../../index";
import { Command } from "../../lib/structures/Command";
import { validateMusicCommandConditions } from "../../lib/utilities/Functions";
import { ExtendedInteraction } from "../../lib/typings/ExtendedInteraction";

export default new Command({
    name: 'filter',
    description: 'Applies a filter to the track',
    options: [
        {
            name: "karaoke",
            type: 1,
            description: 'Applies a karaoke filter to the player',
        },
        {
            name: "vibrato",
            type: 1,
            description: 'Applies a vibrato filter to the player',
        },
        {
            name: "side-chain",
            type: 1,
            description: 'Applies a tremolo filter to the player',
        },
        {
            name: "nightcore",
            type: 1,
            description: 'Applies a nightcore filter to the player',
        },
        {
            name: "vaporwave",
            type: 1,
            description: 'Applies a vaporwave filter to the player',
        },
        {
            name: "8d",
            type: 1,
            description: 'Applies an 8D filter to the player',
        },
        {
            name: "bassboost",
            type: 1,
            description: 'Applies a bassboost filter to the player',
        },
        {
            name: "reset",
            type: 1,
            description: 'Removes filter from the player',
        },
    ],

    run: async({client, interaction}) => {
        const extendedInteraction = interaction as ExtendedInteraction;
        const validate = await validateMusicCommandConditions(client, extendedInteraction);
        const player = client.manager.get(interaction.guildId!);
        if(validate) {
            let chosenFilter;

            switch (interaction.options.getSubcommand()) {
                case "karaoke":
                    chosenFilter = "karaoke";
                    player!.setKaraoke();
                break
                case "side-chain":
                    chosenFilter = "sidechain";
                    player!.setTremolo();
                break;
                case "vibrato":
                    chosenFilter = "vibrato";
                    player!.setVibrato(2);
                break;
                case "nightcore":
                    chosenFilter = "nightcore";
                    player!.setNightcore();
                break;
                case "vaporwave":
                    chosenFilter = "vaporwave";
                    player!.setVaporWave();
                break;
                case "8d":
                    chosenFilter = "8D";
                    player!.set8D();
                break;
                case "bassboost":
                    chosenFilter = "bassboost";
                    player!.setBassBoost();
                break;
                case "reset":
                    chosenFilter = "reset";
                    player!.reset();
                break;
            }
            return interaction.reply({embeds: [new messageEmbed().setDescription(`${interaction.user} ${chosenFilter === 'reset' ? 'Has removed the filter from the player' : `has applied the ${chosenFilter} filter to the queue`}`)]});
        }
        return;
    }
})