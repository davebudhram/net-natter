import axios from "axios";
import { league, season, url, headers } from "./endpointTypes";
import { ITeam } from "../interfaces/team";

// Get every NBA team's stats 
const getTeamsData = async (): Promise<ITeam[]> => {
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
        console.log(teams);
        return teams;
    } catch (error) {
        console.error('Error fetching standings:', error);
        throw error;
    }
};

export { getTeamsData };