import axios from "axios";
import { season, url, headers } from "./endpointTypes";
import { IPlayer } from "../interfaces/player";

// Get all players data based on Team ID
const getPlayersData = async (teamId: number) => {
    const params = { "team": teamId, "season": season}
    try {
        const teamRawResponse = await axios.get(`${url}/players`, {
            params,
            headers,
        });
        const teamRawData = teamRawResponse.data["response"];
         
        const players: IPlayer[] = teamRawData.map((rawPlayer: any) => {
            return {
                _id: rawPlayer.id,
                firstName: rawPlayer.firstname,
                lastName: rawPlayer.lastname,
                jerseyNumber: rawPlayer.leagues.standard.jersey,
                position: rawPlayer.leagues.standard.pos,
                teamId: rawPlayer.team.logo,
                dob: rawPlayer.conference.rank,
                country: rawPlayer.birth.country,
                height: rawPlayer.height.feets + "'" + rawPlayer.height.inches,
                college: rawPlayer.college,
            };
        });
        return players;
    } catch (error) {
        console.error('Error fetching standings:', error);
        throw error;
    }
};

export { getPlayersData };