import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';

export const MatchPage = () => {

    const [matches, setMatches] = useState([]);
    const { teamName, year } = useParams();

    useEffect(
        () => {
            const fetchMatches = async () => {
                const respone = await fetch(`http://localhost:8080/team/${teamName}/matches?year=${year}`);
                const data = await respone.json();
                setMatches(data);
            };

            fetchMatches();
        }, [teamName]
    )
   
    return (
        <div className="TeamPage">
        <h1>Match Page</h1>
        {matches.map(match => <MatchDetailCard match={match} teamName = {teamName}/>)}
        </div>
    );
    }

