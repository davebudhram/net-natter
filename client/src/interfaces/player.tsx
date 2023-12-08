import { IPlayerStats } from "./stats";

export interface IPlayer {
    _id: number,
    firstName: string,
    lastName: string,
    position: string,
    teamId: string,
    dob: Date,
    playerStats: IPlayerStats,
}