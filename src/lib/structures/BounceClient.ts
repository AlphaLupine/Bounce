import { ApplicationCommandDataResolvable, Client, ClientEvents, Collection, Intents, } from "discord.js";
import { CommandType } from "../typings/Command";
import { RegisterCommandsOptions } from "../typings/Client";
import { ClientEvent, ErelaEvent } from "../structures/Event";
import glob from 'glob';
import { promisify } from "util";
import { Manager, Payload } from "erela.js";
import { ErelaEvents } from "../typings/ErelaEvent";


const globPromise = promisify(glob);

export class BounceClient extends Client {

    commands: Collection<string, CommandType> = new Collection();
    resetCommands?: Boolean;
    manager: Manager;

    constructor(resetCommands: Boolean = false){
        super({
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES]
        });

        this.manager = new Manager({
            nodes: [{
                host: "localhost",
                password: "youshallnotpass",
                port: 2333
            }],
            send: (id:string, payload: Payload) => {
                const guild = this.guilds.cache.get(id);
                if(guild) guild.shard.send(payload);
            }
        })
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
        const clientEventFiles = await globPromise(`${__dirname}/../../events/!(erela)*/*.js`);
        const erelaEventFiles = await globPromise(`${__dirname}/../../events/erela/*.js`);
        console.log(`Erela Event Files: ${erelaEventFiles}`);
        for(let file of clientEventFiles) {
            const event: ClientEvent<keyof ClientEvents> = await this.importFile(file);
            this.on(event.name, event.run);
        }
        for(let file of erelaEventFiles) {
            console.log(`Erela event file (unopened): ${file}`)
            console.log(`Erela event file (opened): ${await this.importFile(file)}`)
            const event: ErelaEvent<keyof ErelaEvents> = await this.importFile(file);
            //@ts-ignore
            this.manager.on(event.name, event.run);
        }
    }

}