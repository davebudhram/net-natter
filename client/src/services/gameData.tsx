import axios from "axios";
import {season, url, headers} from "./endpointTypes";
import {IGame} from "../interfaces/game";

// Get All Upcoming Games
const getUpcomingGameData = async (): Promise<IGame[]> => {
  try {
    const params = {season: season};
    const allGames = await parseGameData(params);

    const upcomingGames = allGames.filter((game) => {
      const gameDate = new Date(game.startTime);
      const currentDate = new Date();
      return gameDate > currentDate;
    });
    return upcomingGames;
  } catch (error) {
    console.error("Error fetching game stats:", error);
    throw error;
  }
};

// Get All Games Data of a Team given Team ID
const getIndividualGameTeamData = async (teamId: number): Promise<IGame[]> => {
  try {
    const params = {team: teamId, season: season};
    const games = await parseGameData(params);
    return games;
  } catch (error) {
    console.error("Error fetching game stats:", error);
    throw error;
  }
};

// Get All Games Data of a Team given Team ID
const getIndividualGameByGameId = async (
  gameId: number
): Promise<IGame | undefined> => {
  try {
    const params = {id: gameId};
    const games = await parseGameData(params);
    if (games.length > 0) {
      return games[0];
    }
    return undefined;
  } catch (error) {
    console.error("Error fetching game stats:", error);
    throw error;
  }
};

// Get Game Data Based on if they are Live
const getLiveGameData = async (): Promise<IGame[]> => {
  try {
    const params = {live: "all"};
    const games = await parseGameData(params);
    return games;
  } catch (error) {
    console.error("Error fetching game stats:", error);
    throw error;
  }
};

// Get Game Data Based on Date
const getDateGameData = async (): Promise<IGame[]> => {
  try {
    const tomorrowDate = new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0];
    const params = {date: tomorrowDate};
    const games = await parseGameData(params);
    return games;
  } catch (error) {
    console.error("Error fetching game stats:", error);
    throw error;
  }
};

const parseGameData = async (params: any): Promise<IGame[]> => {
  try {
    const gameRawResponse = await axios.get(`${url}/games`, {
      params,
      headers,
    });
    const gameRawData = gameRawResponse.data["response"];

    const games: IGame[] = gameRawData.map((rawGame: any) => {
      return {
        _id: rawGame.id,
        startTime: rawGame.date.start,
        arena: rawGame.arena.name,
        homeTeamId: rawGame.teams.home.id,
        awayTeamId: rawGame.teams.visitors.id,
        homeTeamName: rawGame.teams.home.name,
        awayTeamName: rawGame.teams.visitors.name,
        homeTeamScore: rawGame.scores.home.points,
        awayTeamScore: rawGame.scores.visitors.points,
        homeTeamCode: rawGame.teams.home.code,
        awayTeamCode: rawGame.teams.visitors.code,
        homeLogo: rawGame.teams.home.logo,
        awayLogo: rawGame.teams.visitors.logo,
        quarter: rawGame.periods.current,
        status: rawGame.status.long,
        clock: rawGame.status.clock,
      };
    });
    return games;
  } catch (error) {
    console.error("Error fetching game stats:", error);
    throw error;
  }
};

export {
  getLiveGameData,
  getIndividualGameTeamData,
  getUpcomingGameData,
  getDateGameData,
  getIndividualGameByGameId,
};
