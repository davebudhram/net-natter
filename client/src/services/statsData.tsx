import axios from "axios";
import { league, season, url, headers } from "./endpointTypes";
import { IPlayerStats, IGameTeamStats, ITeamStats } from "../interfaces/stats";

// Get All Players Stats based on a given game
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

// Get the two teams playing stats based on given ID
// Return an array of two with the team's stats
const getGameStatsData = async (gameId: number): Promise<IGameTeamStats[]> => {
    const params = { "id": gameId }
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
                points: rawStats.statistics['0'].points,
                fgm: rawStats.statistics['0'].fgm,
                fga: rawStats.statistics['0'].fga,
                fgp: rawStats.statistics['0'].fgp,
                ftm: rawStats.statistics['0'].ftm,
                fta: rawStats.statistics['0'].fta,
                ftp: rawStats.statistics['0'].ftp,
                tpm: rawStats.statistics['0'].tpm,
                tpa: rawStats.statistics['0'].tpa,
                tpp: rawStats.statistics['0'].tpp,
                offensiveRebounds: rawStats.statistics['0'].offReb,
                defensiveRebounds: rawStats.statistics['0'].defReb,
                totalRebounds: rawStats.statistics['0'].totReb,
                assists: rawStats.statistics['0'].assists,
                steals: rawStats.statistics['0'].steals,
                blocks: rawStats.statistics['0'].blocks,
                fouls: rawStats.statistics['0'].pFouls,
                plusMinus: rawStats.statistics['0'].plusMinus,
                turnovers: rawStats.statistics['0'].turnovers,
            };
        });
        console.log(gameStats);
        return gameStats;
    } catch (error) {
        console.error('Error fetching player stats:', error);
        throw error;
    }
};

// Get Team Stats based on a given team ID
const getTeamStatsData = async (teamId: number): Promise<ITeamStats> => {
    const params = { "id": teamId, "season": season }
    try {
        const teamsDataResponse = await axios.get(`${url}/teams/statistics`, {
            params,
            headers,
        });
        const teamStatsRawData = teamsDataResponse.data["response"];
         
        const teamStats: ITeamStats[] = teamStatsRawData.map((rawStats: any) => {
            return {
                teamId: teamId,
                gamesPlayed: rawStats.games,
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
        console.log(teamStats);
        return teamStats[0];
    } catch (error) {
        console.error('Error fetching team stats:', error);
        throw error;
    }
};


export { getPlayerStatsPerGameData, getGameStatsData, getTeamStatsData };