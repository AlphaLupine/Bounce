import { ApplicationCommandDataResolvable, Client, ClientEvents, Collection, Intents, } from "discord.js";
import { CommandType } from "../typings/Command";
import { RegisterCommandsOptions } from "../typings/Client";
import { Event } from "../structures/Event";
import glob from 'glob';
import { promisify } from "util";


const globPromise = promisify(glob);

export class BounceClient extends Client {

    commands: Collection<string, CommandType> = new Collection();
    resetCommands?: Boolean

    constructor(resetCommands: Boolean = false){
        super({
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES]
        });
    }

    async start() {
        this.loadEvents();
        await this.login(process.env.TOKEN);
        this.loadCommands();
    }

    async importFile(file: string) {
        return (await import(file))?.default;
    }
    
    async registerCommands({commands, guildId}: RegisterCommandsOptions) {
        if(guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
        } else {
            this.application?.commands.set(commands)
        }
    }

    async loadCommands() {
        const Commands: ApplicationCommandDataResolvable[] = [];
        const commandFiles = await globPromise(`${__dirname}/../../commands/*/*.js`);
        for(let file of commandFiles) {
            const command: CommandType = await this.importFile(file);
            if(!command.name) return;

            this.commands.set(command.name, command);
            Commands.push(command);
        }
        this.registerCommands({
            commands: Commands,
            guildId: '933904253901217802'
        });

    }

    async loadEvents() {
        const eventFiles = await globPromise(`${__dirname}/../../events/*/*.js`);
        for(let file of eventFiles) {
            const event: Event<keyof ClientEvents> = await this.importFile(file);
            this.on(event.name, event.run);
        }
    }

}