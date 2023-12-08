export interface IStats {
    points: number,
    fgm: number,
    fga: number,
    fgp: number,
    ftm: number,
    fta: number,
    ftp: string,
    tpm: number,
    tpa: number,
    tpp: string,
    offensiveRebounds: number,
    defensiveRebounds: number,
    totalRebounds: number,
    assists: number,
    steals: number,
    blocks: number,
    fouls: number,
    plusMinus: string,
}

export interface IPlayerStats extends IStats {
    playerId: number,
}

export interface IGameStats extends IStats {
    gameId: number,
}