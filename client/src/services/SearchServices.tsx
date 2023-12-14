import axios from 'axios';
import { league, season, url, headers } from "./endpointTypes";
import { ITeam } from '../interfaces/team';
import { IPlayer } from '../interfaces/player';

const searchByTeamName = async (teamName: string): Promise<ITeam[]> => {
    const params = { "search": teamName };
    try {
        const teamRawResponse = await axios.get(`${url}/teams`, {
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
        console.log(teams)
        return teams;
    } catch (error) {
        console.error('Error fetching teams:', error);
        throw error;
    }
};

const searchByPlayerLastName = async(playerLastName: string): Promise<IPlayer[]> => {
    const params = { "search": playerLastName }
    try {
        return getAllPlayersData(0, "", params);
    }  catch (error) {
        console.error('Error fetching players:', error);
        throw error;
    }
};

export { searchByTeamName, searchByPlayerLastName };