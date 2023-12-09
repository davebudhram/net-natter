import axios from "axios";
import { url, headers } from "./endpointTypes";
import { Status, IGame } from "../interfaces/game";

// Get Game Data based on statues 
const getGameData = async (status: Status): Promise<IGame[]> => {
    const params = { "live": status }
    try {
        const gameRawResponse = await axios.get(`${url}/games`, {
            params,
            headers,
        });
        const gameRawData = gameRawResponse.data["response"];
         
        const games: IGame[] = gameRawData.map((rawGame: any) => {
            return {
                _id: rawGame.id,
                startTime: new Date(rawGame.date.start),
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
                status: status,
                clock: rawGame.status.clock,
            };
        });
        console.log(games);
        return games;
    } catch (error) {
        console.error('Error fetching standings:', error);
        throw error;
    }
};

export { getGameData };