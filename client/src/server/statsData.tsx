import axios from "axios";
import { league, season, url, headers } from "./endpointTypes";
import { IPlayerStats, IGameTeamStats } from "../interfaces/stats";

// Get All Players Stats
const getPlayerStatsPerGameData = async (gameId: number): Promise<IPlayerStats[]> => {
    const params = { "game": gameId }
    try {
        const playerStatsRawResponse = await axios.get(`${url}/players/statistics`, {
            params,
            headers,
        });
        const playerStatsRawData = playerStatsRawResponse.data["response"];
         
        const playerStats: IPlayerStats[] = playerStatsRawData.map((rawStats: any) => {
            return {
                firstName: rawStats.player.firstname,
                lastName: rawStats.player.lastname,
                teamId: rawStats.team.id,
                playerId: rawStats.player.id,
                points: rawStats.points,
                fgm: rawStats.fgm,
                fga: rawStats.fga,
                fgp: rawStats.fgp,
                ftm: rawStats.ftm,
                fta: rawStats.fta,
                ftp: rawStats.ftp,
                tpm: rawStats.tpm,
                tpa: rawStats.tpa,
                tpp: rawStats.tpp,
                offensiveRebounds: rawStats.offReb,
                defensiveRebounds: rawStats.defReb,
                totalRebounds: rawStats.totReb,
                assists: rawStats.assists,
                steals: rawStats.steals,
                blocks: rawStats.blocks,
                fouls: rawStats.pFouls,
                plusMinus: rawStats.plusMinus,
                turnovers: rawStats.turnovers,
            };
        });
        console.log(playerStats);
        return playerStats;
    } catch (error) {
        console.error('Error fetching player stats:', error);
        throw error;
    }
};

// Get All Game Stats
const getGameStatsData = async (gameId: number): Promise<IGameTeamStats[]> => {
    const params = { "game": gameId }
    try {
        const gameStatsRawResponse = await axios.get(`${url}/games/statistics`, {
            params,
            headers,
        });
        const gameStatsRawData = gameStatsRawResponse.data["response"];
         
        const gameStats: IGameTeamStats[] = gameStatsRawData.map((rawStats: any) => {
            return {
                gameId: gameId,
                teamId: rawStats.team.id,
                points: rawStats.statistics.points,
                fgm: rawStats.statistics.fgm,
                fga: rawStats.statistics.fga,
                fgp: rawStats.statistics.fgp,
                ftm: rawStats.statistics.ftm,
                fta: rawStats.statistics.fta,
                ftp: rawStats.statistics.ftp,
                tpm: rawStats.statistics.tpm,
                tpa: rawStats.statistics.tpa,
                tpp: rawStats.statistics.tpp,
                offensiveRebounds: rawStats.statistics.offReb,
                defensiveRebounds: rawStats.statistics.defReb,
                totalRebounds: rawStats.statistics.totReb,
                assists: rawStats.statistics.assists,
                steals: rawStats.statistics.steals,
                blocks: rawStats.statistics.blocks,
                fouls: rawStats.statistics.pFouls,
                plusMinus: rawStats.statistics.plusMinus,
                turnovers: rawStats.statistics.turnovers,
            };
        });
        console.log(gameStats);
        return gameStats;
    } catch (error) {
        console.error('Error fetching player stats:', error);
        throw error;
    }
};

export { getPlayerStatsPerGameData, getGameStatsData };