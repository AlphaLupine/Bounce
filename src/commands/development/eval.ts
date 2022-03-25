import { Message, MessageActionRow, MessageAttachment, MessageButton } from "discord.js";
import { logger, messageEmbed } from "../../index";
import { Command } from "../../lib/structures/Command";
import { createCodeBlock } from "../../lib/utilities/Functions";
import { inspect } from "util";

export default new Command({
    name: 'eval',
    description: 'Executes code snippets',
    options: [
        {
            name: 'expression',
            type: 3,
            description: 'Snippet to evaluate',
            required: true
        },
        {
            name: 'depth',
            type: 4,
            description: 'Depth of response stack',
            required: false,
            minValue: 0
        },
        {
            name: 'is-async',
            type: 5,
            description: 'If evaluation is asynchronus',
            required: false,
        },
        {
            name: 'is-silent',
            type: 5,
            description: 'If bot should send evaluation result',
            required: false
        }
    ],
    run: async({client, interaction, args}) => {
        if(process.env.DEVELOPER_ID !== interaction.user.id) return;
        let expression = args.data[0].value as string;
        const depth = args.data[1]?.value as number || 0;
        const isAsync = args.data[2]?.value as boolean || false;
        const isSilent = args.data[3]?.value as boolean || false;
        
        const embed = new messageEmbed().addField('**Input:**', createCodeBlock(expression));
        if(isAsync) expression = `(async () => { ${expression} })();`;
        try {
            const evaluated = await eval(expression);
            if(isSilent) return;
            let output = inspect(evaluated, { depth: depth});
            if(output.length < 1000) {
                embed.success().addField('**Output**', createCodeBlock(output.replace(client.token!, 'ODDFOFXUpgf7yEntul5ockCA.OFk6Ph.geTzROlLEDy5XuZk04')));
                return interaction.reply({embeds: [embed]});
            } else {
                const attachment = new MessageAttachment(Buffer.from(expression), 'evaluation.txt');
                return interaction.reply({files: [attachment]});
            }
        } catch (err) {
            //@ts-expect-error
            const full = err.stack as string ?? err as string;
            if(full.length < 1000) {
                embed.error().addField('**Error:**', createCodeBlock(full));
                return interaction.reply({embeds: [embed]});
            } else {
                const attachment = new MessageAttachment(Buffer.from(full), 'error.txt');
                return interaction.reply({files: [attachment]});
            }
        }
    }
})

