import { IGameStats, IPlayerStats } from "./stats";

export interface IGame {
    _id: number,
    date: Date,
    arena: string,
    homeTeamId: number,
    awayTeamId: number,
    quarter: number, 
    status: 'Not Started' | 'live' | 'Finished';
    homeTeamScore: number,
    awayTeamScore: number,
    gameStats: IGameStats,
    playerStats: IPlayerStats[],
}