require('dotenv').config();
import { BounceEmbed } from './lib/structures/BounceEmbed';
import { BounceClient } from './lib/structures/BounceClient';


export const root = __dirname;
export const client = new BounceClient();
export const messageEmbed = BounceEmbed;
client.start();