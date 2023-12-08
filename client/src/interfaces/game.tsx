export interface IGame {
    _id: number,
    startTime: Date,
    arena: string,
    homeTeamId: number,
    awayTeamId: number,
    homeTeamName: string,
    awayTeamName: string,
    homeTeamScore: number,
    awayTeamScore: number,
    homeTeamCode: string,
    awayTeamCode: string,
    homeLogo: string,
    awayLogo: string,
    quarter: number, 
    status: 'Not Started' | 'live' | 'Finished';
    duration: string,
}