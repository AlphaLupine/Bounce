import { Button } from "../structures/Button";
import { ExtendedInteraction } from "../typings/ExtendedInteraction";
import { BounceEmbed } from "../structures/BounceEmbed";
import { PaginatorOptions } from "../typings/Paginator";
import { messageEmbed } from "../../index";

export class Paginator {
    public pages: BounceEmbed[];
    public buttons: Button[]
    public timeout: number;
    private interaction: ExtendedInteraction

    public currentPage: number;

    constructor({pages, buttons, timeout, interaction}: PaginatorOptions) {
        this.pages = pages;
        this.buttons = buttons;
        this.timeout = timeout;
        this.interaction = interaction;
        this.currentPage = 0;
    }

    public incrementPage() {
        let page = this.getCurrentPage();
        if(page === this.pages.length) {
            return this.interaction.reply({embeds: [new messageEmbed().setDescription("Already on the last page")], ephemeral: true});
        }
        page = this.setCurrentPage(true);
        this.displayPage();
    }

    public decrementPage() {
        let page = this.getCurrentPage();
        if(page === 0) {
            return this.interaction.reply({embeds: [new messageEmbed().setDescription("Already on the first page")], ephemeral: true});
        }
        page = this.setCurrentPage(false);
        this.displayPage();
    }

    public displayPage() {
        this.interaction.editReply({embeds: [this.pages[this.currentPage]]});
    }

    public getCurrentPage(): number {
        return this.currentPage;
    }

    public setCurrentPage(isIncrement: boolean): number {
        if(isIncrement) {
            return this.currentPage +=1;
        }
        return this.currentPage -=1;
    }
}