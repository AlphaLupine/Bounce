import { ClientEvents } from "discord.js";
import { ErelaEvents } from "../typings/ErelaEvent";

export class ClientEvent<Key extends keyof ClientEvents> {
    constructor(public name: Key, public run: (...args: ClientEvents[Key]) => any) {}
}

export class ErelaEvent<Key extends keyof ErelaEvents> {
    constructor(public name: Key, public run: (...args: ErelaEvents[Key]) => any) {}
}
