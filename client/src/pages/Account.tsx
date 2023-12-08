import React from 'react';
import { useParams } from 'react-router-dom';
function Account() {
    const { accountId } = useParams();
    return (
        <div>
            <h1>Account</h1>
            <p>This is the account page for account id {accountId}</p>
        </div>
    ) 
}

export default Account;