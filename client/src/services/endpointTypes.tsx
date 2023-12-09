const league = 'standard';
const season = '2023';

const url = 'https://api-nba-v1.p.rapidapi.com';

const headers = {
    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
    'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
};

export {url, headers, league, season};

