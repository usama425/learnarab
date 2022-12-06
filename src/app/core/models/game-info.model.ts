export interface GameInfo {
    meta: GameInfoMeta;
    auther: string[];
    terms: string[];
}

interface GameInfoMeta {
    screen: string;
    helptext: string;
}