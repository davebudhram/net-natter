import axios from "axios";
import { league, season, url, headers } from "./endpointTypes";
import { ITeam } from "../interfaces/team";

// Get All NBA Team Data
const getTeamsData = async () => {
    const params = { "league": league, "season": season}
    try {
        const teamRawResponse = await axios.get(`${url}/standings`, {
            params,
            headers,
        });
        const teamRawData = teamRawResponse.data["response"];
         
        const teams: ITeam[] = teamRawData.map((rawTeam: any) => {
            return {
                _id: rawTeam.team.id,
                name: rawTeam.team.name,
                code: rawTeam.team.code,
                conference: rawTeam.conference.name,
                logo: rawTeam.team.logo,
                rank: rawTeam.conference.rank,
                wins: rawTeam.conference.win,
                losses: rawTeam.conference.loss,
            };
        });
        return teams;
    } catch (error) {
        console.error('Error fetching standings:', error);
        throw error;
    }
};

export { getTeamsData };