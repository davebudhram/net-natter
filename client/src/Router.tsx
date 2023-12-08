import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Home from "./pages/Home";
import Signinup from "./pages/Signinup";
import Account from "./pages/Account";
import Game from "./pages/Game";
import Player from "./pages/Player";
import Team from "./pages/Team";
import Article from "./pages/Article";
import Search from "./pages/Search";

function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={<Signinup />} />
        <Route path='/signin' element={<Signinup />} />
        <Route path='/account/:accountId' element={<Account />} />
        <Route path='/game/:gameId' element={<Game />} />
        <Route path='/player/:playerId' element={<Player />} />
        <Route path='/team/:teamId' element={<Team />} />
        <Route path='/article/:articleId' element={<Article />} />
        <Route path='/search/:searchType/:searchText' element={<Search />} />

        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
