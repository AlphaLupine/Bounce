import { Node, Player, Track, TrackEndEvent, TrackExceptionEvent, TrackStartEvent, TrackStuckEvent, UnresolvedTrack } from "erela.js";

export interface ErelaEvents {
    nodeCreate: [node: Node];
    nodeDestroy: [node: Node];
    nodeConnect: [node: Node];
    nodeReconnect: [node: Node];
    nodeDisconnect: [node: Node, reason: {code: number, reason:string}];
    nodeError: [node: Node, error:Error];
    nodeRaw: [payload: unknown];
    playerCreate: [player: Player];
    playerDestroy: [player: Player];
    queueEnd: [player: Player];
    playerMove: [player: Player, oldChannel: string, newChannel: string];
    trackStart: [player: Player, track: Track, payload: TrackStartEvent];
    trackEnd: [player: Player, track: Track, payload: TrackEndEvent];
    trackStuck: [player: Player, track: Track, payload: TrackStuckEvent];
    trackError: [player: Player, track: Track | UnresolvedTrack, payload: TrackExceptionEvent];
}
