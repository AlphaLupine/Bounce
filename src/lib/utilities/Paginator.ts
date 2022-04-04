
import { ExtendedInteraction } from "../typings/ExtendedInteraction";
import { BounceEmbed } from "../structures/BounceEmbed";
import { PaginatorOptions } from "../typings/Paginator";
import { messageEmbed } from "../../index";
import { MessageActionRow, MessageButton } from "discord.js";
import { Emojis } from "./Constants";
import { Player } from "erela.js";
import { BounceClient } from "../structures/BounceClient";

export class Paginator {
    public pages: BounceEmbed[];
    public timeout: number;
    private timer: number;
    private interaction: ExtendedInteraction    
    public currentPage: number;

    constructor({pages, timeout, interaction, client, player}: PaginatorOptions) {
        this.pages = pages;
        this.timer = 0;
        this.timeout = timeout;
        this.interaction = interaction;
        this.currentPage = 0;

        setTimeout(this.destroyInstance.bind(this, client, player), timeout);

    }

    public incrementPage() {
        let page = this.getCurrentPage();
        if(page === this.pages.length - 1) {
            return
        }
        page = this.setCurrentPage(true);
        this.displayPage();
    }

    public showLastPage() {
        let page = this.getCurrentPage();
        if(page === this.pages.length - 1) {
            return
        }
        page = this.setCurrentPage(true, (this.pages.length - 1) - page);
        this.displayPage();
    }

    public decrementPage() {
        let page = this.getCurrentPage();
        if(page === 0) {
            return
        }
        page = this.setCurrentPage(false);
        this.displayPage();
    }

    public showFirstPage() {
        let page = this.getCurrentPage();
        if(page === 0) {
            return
        }
        page = this.setCurrentPage(false, page);
        this.displayPage();
    }

    public displayPage(disableButtons = false) {
        const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId(`queue-first-page`)
                        .setEmoji(Emojis.music.skipToStart)
                        .setStyle('PRIMARY')
                        .setDisabled(disableButtons),

                    new MessageButton()
                        .setCustomId(`queue-prev-page`)
                        .setEmoji(Emojis.music.prevPage)
                        .setStyle('PRIMARY')
                        .setDisabled(disableButtons),

                    new MessageButton()
                        .setCustomId(`queue-delete-instance`)
                        .setEmoji(Emojis.music.stop)
                        .setStyle('DANGER')
                        .setDisabled(disableButtons),

                    new MessageButton()
                        .setCustomId(`queue-next-page`)
                        .setEmoji(Emojis.music.nextPage)
                        .setStyle('PRIMARY')
                        .setDisabled(disableButtons),

                    new MessageButton()
                        .setCustomId(`queue-last-page`)
                        .setEmoji(Emojis.music.skipToEnd)
                        .setStyle('PRIMARY')
                        .setDisabled(disableButtons),
                );

        this.interaction.editReply({embeds: [this.pages[this.currentPage].setFooter({text: `${this.getCurrentPage() + 1}/${this.pages.length}`})], components: [row]});
    }

    private getCurrentPage(): number {
        return this.currentPage;
    }

    private setCurrentPage(isIncrement: boolean, value: number = 1): number {
        if(isIncrement) {
            return this.currentPage +=value;
        }
        return this.currentPage -=value;
    }

    public destroyInstance(client: BounceClient, player: Player) {
        client.paginatorCache.delete(player);
        this.displayPage(true);
    }
}