require('dotenv').config();
import { BounceEmbed } from './lib/structures/BounceEmbed';
import { BounceClient } from './lib/structures/BounceClient';

export const client = new BounceClient();
export const messageEmbed = BounceEmbed;
client.start();