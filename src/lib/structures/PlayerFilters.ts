//cba assigning types - if it works it works - Sun T'zu
const { Structure } = require('erela.js');

Structure.extend('Player', (Player) => class extends Player {
    reset() {
        this.node.send({
            guildId: this.guild,
            op: 'filters',
        });
    }
    setTimescale(opts) {
        for (let key in opts) {
            if (typeof opts[key] !== 'number')
                throw new RangeError(`Provided argument '${key}' must be a number`);
            if (opts[key] < 0) throw new RangeError(`Provided argument '${key}' cannot be smaller than 0.0.`);
        }

        opts = { pitch: 1.0, rate: 1.0, speed: 1.0, ...opts };

        this.node.send({
            guildId: this.guild,
            op: 'filters',
            timescale: opts,
        });
    }
    setTremolo(opts) {
        for (let key in opts) {
            if (typeof opts[key] !== 'number')
                throw new RangeError(`Provided argument '${key}' must be a number`);
        }

        opts = { frequency: 2.0, depth: 0.5, ...opts };

        if (opts.frequency < 0) throw new RangeError('Frequency argument cannot be smaller than 0.0.');
        if (opts.depth < 0 || opts.depth > 1)
            throw new RangeError('Depth argument cannot be smaller than 0.0 or bigger than 1.0.');

        this.node.send({
            guildId: this.guild,
            op: 'filters',
            tremolo: opts,
        });
    }
    setKaraoke(opts) {
        for (let key in opts) {
            if (typeof opts[key] !== 'number')
                throw new RangeError(`Provided argument '${key}' must be a number`);
        }

        opts = { mono: 1.0, monoLevel: 1.0, filterBand: 220, filterWidth: 100, ...opts };

        this.node.send({
            guildId: this.guild,
            op: 'filters',
            karaoke: opts,
        });
    }
    setVibrato(opts) {
        for (let key in opts) {
            if (typeof opts[key] !== 'number')
                throw new RangeError(`Provided argument '${key}' must be a number`);
        }

        if (opts.frequency < 0 || opts.frequency > 14)
            throw new RangeError('Frequency argument cannot be smaller than 0.0.');
        if (opts.depth < 0 || opts.depth > 1)
            throw new RangeError('Depth argument cannot be smaller than 0.0 or bigger than 1.0.');

        opts = { frequency: 2.0, depth: 0.5, ...opts };

        this.node.send({
            guildId: this.guild,
            op: 'filters',
            vibrato: opts,
        });
    }
    setNightcore() {

        this.node.send({
            guildId: this.guild,
            op: 'filters',
            timescale: { pitch: 1.5, depth: 0.7, speed: 1.25 },
        });

    }
    setVaporWave() {
        this.node.send({
            guildId: this.guild,
            op: 'filters',
            timescale: { pitch: 0.5 },
            equalizer: [{ band: 1, gain: 0.3},{band: 0, gain: 0.3 }],
            tremolo: { depth: 0.3, frequency: 14 },
        });
    }
    set8D() {
        this.node.send({
            guildId: this.guild,
            op: 'filters',
            rotation: { rotationHz: 0.2 }
        });
    }
    setBassBoost() {
        this.node.send({
            guildId: this.guild,
            op: 'filters',
            equalizer: [
                {band: 0, gain: 0.65},
                {band: 1, gain: 0.45},
                {band: 2, gain: -0.45},
                {band: 3, gain: -0.65},
                {band: 4, gain: -0.35},
                {band: 5, gain: 0.45},
                {band: 6, gain: 0.55},
                {band: 7, gain: 0.6},
                {band: 8, gain: 0.6},
                {band: 9, gain: 0.6},
                {band: 10, gain: 0},
                {band: 11, gain: 0},
                {band: 12, gain: 0},
                {band: 13, gain: 0},
            ]
        });
    }
})