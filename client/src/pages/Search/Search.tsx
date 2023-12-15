import React, { useState, KeyboardEvent, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, DropdownButton, InputGroup } from "react-bootstrap";
import { ITeam } from "../../interfaces/team";
import { IPlayer } from "../../interfaces/player";
import { searchByTeamName } from "../../services/SearchServices";
import TeamCard from "../../components/teamCards/teamCard";


function Search() {
    const {searchType, searchText} = useParams();
    const navigate = useNavigate();
    const [searchInputText, setSearchInputText] = useState<string>(searchText ? searchText : "");
    const [searchInputType, setSearchInputType] = useState<string>(searchType ? searchType : "Team");
    const [teamSearchResults, setTeamSearchResults] = useState<ITeam[]>([]);
    // const [playerSearchResults, setPlayerSearchResults] = useState<IPlayer[]>([]);
    // const [likedPlayers, setLikedPlayers] = useState<Number[]>([]);

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handlePressSearch();
        }
    };

    const handlePressSearch = () => {
        try {
            navigate(`/search/${searchInputType}/${searchInputText}`);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                    const searchTeamResults = await searchByTeamName(searchInputText);
                    console.log(searchTeamResults);
                    setTeamSearchResults(searchTeamResults);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='page'>

            <div className='search-input-box-container'>
                <InputGroup>
                <input
                    type='text'
                    className='form-control'
                    value={searchInputText}
                    onChange={(event) => setSearchInputText(event.target.value)}
                    onKeyDown={(event) => handleKeyPress(event)}
                />
                <DropdownButton
                    title={searchInputType}
                    id='input-group-dropdown-2'
                    align='end'
                    variant='light'
                    onSelect={(eventKey) => {
                        setSearchInputType(eventKey || "Team");
                    }}
                >
                    <Dropdown.Item eventKey='Team'>Team</Dropdown.Item>
                    <Dropdown.Item eventKey='Player'>Player</Dropdown.Item>
                </DropdownButton>
                </InputGroup>
            </div>
            <div className='d-flex flex-row flex-wrap'>
                {teamSearchResults.map((team) => (
                    <TeamCard team={team} />
                ))}
            </div>
        </div>
    );
}

export default Search;
