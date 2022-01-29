require('dotenv').config();
import { BounceEmbed } from './lib/structures/BounceEmbed';
import { BounceClient } from './lib/structures/BounceClient';
require('./lib/structures/PlayerFilters');
import { Logger, config } from "@dimensional-fun/logger";

export const logger = new Logger('main');

export const root = __dirname;
export const client = new BounceClient();
export const messageEmbed = BounceEmbed;
client.start();