import React, { useEffect, useState } from "react";
import { IGame } from "../../interfaces/game";
import { getDateGameData, getLiveGameData, getUpcomingGameData } from "../../services/gameData";
import LiveGameCard from "../../components/gameCards/liveGameCard";
import "./Home.css";
import { IAnalystArticle } from "../../interfaces/analystArticle";
import { getAllAnalystArticles } from "../../services/AnalystArticlesService";
import AnalystArticleCard from "../../components/analystArticleCard/analystArticleCard";

function Home() {
  const [liveGames, setLiveGames] = useState<IGame[]>([]);
  const [upcomingGames, setUpcomingGames] = useState<IGame[]>([]);
  const [pastGames, setPastGames] = useState<IGame[]>([]);
  const [displayedUpcomingGames, setDisplayedUpcomingGames] = useState<number>(0);
  const [analystArticles, setAnalystArticles] = useState<IAnalystArticle[]>([]);

  useEffect(() => {
    const fetchLiveGames = async () => {
      try {
        const liveGames = await getLiveGameData();
        console.log(liveGames);
        setLiveGames(liveGames);
      } catch (error) {
        console.log("Error fetching live games:", error);
      }
    };

    const fetchUpcomingGames = async () => {
      try {
        const upcomingGames = await getUpcomingGameData();
        setUpcomingGames(upcomingGames);
      } catch (error) {
        console.log("Error fetching upcoming games:", error);
      }
    };

    const fetchPastDateGames = async () => {
      try {
        const todayPastGames = await getDateGameData();
        console.log(todayPastGames);
        const filteredPastGames = todayPastGames.filter((game) => 
          !liveGames.some((liveGame) => liveGame._id === game._id)
        );
        const reversePastGames = filteredPastGames.slice().reverse();
        setPastGames(reversePastGames);
      } catch (error) {
        console.log("Error fetching todays games:", error);
      }
    };

    const fetchAnalystArticles = async () => {
      try {
        const analystArticles = await getAllAnalystArticles();
        const reversedArticles = analystArticles.slice().reverse();

        setAnalystArticles(reversedArticles);
      } catch (error) {
        console.log("Error fetching analyst articles:", error);
      }
    };

    fetchLiveGames();
    fetchPastDateGames();
    fetchUpcomingGames();
    fetchAnalystArticles();
    setDisplayedUpcomingGames((prev) => prev + (4 + ((liveGames.length + pastGames.length) % 3)));
    const intervalId = setInterval(fetchLiveGames, 15000);
    return () => clearInterval(intervalId);
  }, []);

  const handleShowMore = () => {
    const unevenGames = (liveGames.length + pastGames.length) % 3;
    if (unevenGames === 1 && displayedUpcomingGames % 3 === 0 ){
      setDisplayedUpcomingGames((prev) => prev + 5);
    } else if (unevenGames === 2 && displayedUpcomingGames % 3 === 0 ) {
      setDisplayedUpcomingGames((prev) => prev + 4);
    } else {
      setDisplayedUpcomingGames((prev) => prev + 6);
    }
  };

  return (
    <div className='page'>
      <div className="py-4">
        <div className='youtube-video'>
          <iframe
            width="91%"
            height="700"
            src="https://www.youtube.com/embed/uICX-7Y0jqY"
            title="YouTube video player"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <h1> Games </h1>
      <div className='d-flex flex-row flex-wrap'>
        {liveGames.map((game) => (
          <LiveGameCard key={game._id} game={game} />
        ))}
        {pastGames.map((game) => (
          <LiveGameCard key={game._id} game={game} />
        ))}
        {upcomingGames.slice(0, displayedUpcomingGames).map((game) => (
          <LiveGameCard key={game._id} game={game} />
        ))}
      </div>
      {upcomingGames.length > displayedUpcomingGames && (
        <div className='d-flex justify-content-center pb-4'>
          {displayedUpcomingGames < upcomingGames.length && (
              <button
              className='btn btn-primary home-button'
              onClick={handleShowMore}
            >
              Show More
            </button>
          )}
        </div>
      )}
      <h1> Articles </h1>
      <div className='d-flex flex-row flex-wrap'>
        {analystArticles.map((article) => (
          <AnalystArticleCard article={article} />
        ))}
      </div>
    </div>
  );
}

export default Home;