import React from "react";
import { useParams } from "react-router-dom";

function Team() {
    const { teamId } = useParams();
    return (
        <div>
            <h1>Team</h1>
            <p>This is the team page for team id {teamId}</p>
        </div>
    );
}
export default Team;