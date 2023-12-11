import axios from "axios";
import { season, url, headers } from "./endpointTypes";
import { IPlayer } from "../interfaces/player";

// Get all players data based on Team ID
const getPlayersData = async (teamId: number, teamCode: string): Promise<IPlayer[]> => {
    const params = { "team": teamId, "season": season}
    try {
        const teamRawResponse = await axios.get(`${url}/players`, {
            params,
            headers,
        });
        const teamRawData = teamRawResponse.data["response"];

        const headShotURL = `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${teamCode}/roster`;

        const headShotData = (await axios.get(`${headShotURL}`)).data;
        const headShotAthletesData = headShotData["athletes"];
        console.log(headShotAthletesData);

        const players: IPlayer[] = teamRawData.map((rawPlayer: any) => {
            const espnPlayer = headShotAthletesData.find((headShotPlayer: any) => 
                rawPlayer.firstname + " " + rawPlayer.lastname === headShotPlayer["fullName"]
            );
            if (espnPlayer !== undefined) {
                return {
                    _id: rawPlayer.id,
                    firstName: rawPlayer.firstname,
                    lastName: rawPlayer.lastname,
                    jerseyNumber: rawPlayer.leagues.standard.jersey ? rawPlayer.leagues.standard.jersey : parseInt(espnPlayer["jersey"]),
                    position: rawPlayer.leagues.standard.pos,
                    teamId: teamId,
                    dob: rawPlayer.birth.date,
                    country: rawPlayer.birth.country,
                    height: rawPlayer.height.feets + "'" + rawPlayer.height.inches,
                    college: rawPlayer.college,
                    headShot: espnPlayer["headshot"]["href"],
                };
            }
        });
        const realPlayers = players.filter((player: IPlayer) => player !== undefined);
        console.log(realPlayers);
        return realPlayers;
    } catch (error) {
        console.error('Error fetching standings:', error);
        throw error;
    }
};

export { getPlayersData };