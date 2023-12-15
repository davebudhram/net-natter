import axios from 'axios';
import { league, season, url, headers } from "./endpointTypes";
import { ITeam } from '../interfaces/team';
import { IPlayer } from '../interfaces/player';
import { getSingleTeamData } from './teamData';

const searchByTeamName = async (teamName: string): Promise<ITeam[]> => {
    const params = { "search": teamName };
    try {
        const teamRawResponse = await axios.get(`${url}/teams`, {
            params,
            headers,
        });
        const teamRawData = teamRawResponse.data["response"];
         
        const fetchTeamData = async (rawTeam: any): Promise<ITeam | null> => {
            if (rawTeam.nbaFranchise) {
                const singleTeamRawResponse = await getSingleTeamData(rawTeam.id);
        
                return {
                    _id: rawTeam.id,
                    name: singleTeamRawResponse.name,
                    code: singleTeamRawResponse.code,
                    conference: singleTeamRawResponse.conference,
                    logo: singleTeamRawResponse.logo,
                    rank: singleTeamRawResponse.rank,
                    wins: singleTeamRawResponse.wins,
                    losses: singleTeamRawResponse.losses,
                };
            }
        
            return null;
        };
        
        const teams: (ITeam | null)[] = await Promise.all(teamRawData.map(fetchTeamData));
        const filteredTeams: ITeam[] = teams.filter(Boolean) as ITeam[];
        
        console.log(filteredTeams);
        return filteredTeams;
    } catch (error) {
        console.error('Error fetching teams:', error);
        throw error;
    }
};

const searchByPlayerLastName = async(playerLastName: string): Promise<IPlayer[]> => {
    const params = { "search": playerLastName }
    try {
        return [];
    }  catch (error) {
        console.error('Error fetching players:', error);
        throw error;
    }
};

export { searchByTeamName, searchByPlayerLastName };