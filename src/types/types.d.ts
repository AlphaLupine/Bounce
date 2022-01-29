declare module'erela.js/structures/Player' {
    export interface Player {
        reset(): void
        setTimescale(opts?: number): void
        setTremolo(opts?: number): void
        setKaraoke(opts?: number): void
        setVibrato(opts?: number): void
        setNightcore(): void
        setVaporWave(): void
        set8D(): void
        setBassBoost(): void
    }
}