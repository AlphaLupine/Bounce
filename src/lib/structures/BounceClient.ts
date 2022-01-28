import { ApplicationCommandDataResolvable, Client, ClientEvents, Collection, Intents, MessageButton, } from "discord.js";
import { CommandType } from "../typings/Command";
import { RegisterCommandsOptions } from "../typings/Client";
import { ClientEvent, ErelaEvent } from "../structures/Event";
import glob from 'glob';
import { promisify } from "util";
import { Manager, Payload } from "erela.js";
import { root } from '../../index';
import { ButtonType } from "../typings/Button";

const globPromise = promisify(glob);

export class BounceClient extends Client {

    commands: Collection<string, CommandType> = new Collection();
    resetCommands?: Boolean;
    manager: Manager;
    buttons: Collection<string, ButtonType> = new Collection();

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
            send: (id:string, payload) => {
                const guild = this.guilds.cache.get(id);
                if(guild) guild.shard.send(payload);
            }
        })
    }

    async start() {
        this.loadEvents();
        await this.login(process.env.TOKEN);
        this.loadCommands();
        this.loadButtons();
    }

    async importFile(file: string) {
        return (require(file))?.default;
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
        const eventFiles = await globPromise(`${root}/events/*/*.js`);
        for(let file of eventFiles) {
            const event = await this.importFile(file);
            if(event instanceof ClientEvent) {
                this.on(event.name, event.run);
            } else if (event instanceof ErelaEvent) {
                this.manager.on(event.name, event.run);
            }
        }
    }

    async loadButtons() {
        const buttonFiles = await globPromise(`${root}/components/buttons/*/*.js`);
        for(let file of buttonFiles) {
            const button: ButtonType = await this.importFile(file);
            this.buttons.set(button.name, button);
        }
    }

}