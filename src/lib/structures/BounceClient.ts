import { ApplicationCommandDataResolvable, Client, Collection, Intents, } from "discord.js";
import { CommandType } from "../typings/Command";
import { RegisterCommandsOptions, usedButtonCache } from "../typings/Client";
import { ClientEvent, ErelaEvent } from "../structures/Event";
import glob from 'glob';
import { promisify } from "util";
import { Manager } from "erela.js";
import { logger, root } from '../../index';
import { ButtonType } from "../typings/Button";

const globPromise = promisify(glob);

export class BounceClient extends Client {

    commands: Collection<string, CommandType> = new Collection();
    resetCommands?: Boolean;
    manager: Manager;
    buttons: Collection<string, ButtonType> = new Collection();
    usedButtonCache: Collection<string, usedButtonCache> = new Collection();
    buttonCooldown: number

    constructor(buttonCooldown: number = 5000){
        super({
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES]
        });
        this.buttonCooldown = buttonCooldown;
        this.manager = new Manager({
            nodes: [{
                host: "localhost",
                password: "youshallnotpass",
                port: 2333
            }],
            send: (id:string, payload) => {
                const guild = this.guilds.cache.get(id);
                if(guild) guild.shard.send(payload);
            },
        })
    }

    async start() {
        await this.loadEvents();
        await this.login(process.env.TOKEN);
        await this.loadCommands();
        await this.loadButtons();
    }

    async importFile(file: string) {
        logger.info(`Loading file: ${file}`)
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
        logger.info('Loading Commands')
        for(let file of commandFiles) {
            const command: CommandType = await this.importFile(file);
            if(!command.name) return;
            logger.info(`Successfully loaded command: ${file}`)

            this.commands.set(command.name, command);
            Commands.push(command);
        }
        this.registerCommands({
            commands: Commands,
            guildId: '938866748881522800'
        });

    }

    async loadEvents() {
        const eventFiles = await globPromise(`${root}/events/*/*.js`);
        logger.info('Loading Events')
        for(let file of eventFiles) {
            const event = await this.importFile(file);
            logger.info(`Successfully loaded event: ${file}`)
            if(event instanceof ClientEvent) {
                this.on(event.name, event.run);
            } else if (event instanceof ErelaEvent) {
                this.manager.on(event.name, event.run);
            }
        }
    }

    async loadButtons() {
        const buttonFiles = await globPromise(`${root}/components/buttons/*/*.js`);
        logger.info('Loading Buttons')
        for(let file of buttonFiles) {
            const button: ButtonType = await this.importFile(file);
            logger.info(`Successfully loaded button: ${file}`)
            this.buttons.set(button.name, button);
        }
    }

}