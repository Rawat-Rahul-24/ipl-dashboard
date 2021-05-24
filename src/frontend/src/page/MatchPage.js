import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { YearSelector } from '../components/YearSelector';
import './MatchPage.scss'

export const MatchPage = () => {

    const [matches, setMatches] = useState([]);
    const { teamName, year } = useParams();

    useEffect(
        () => {
            const fetchMatches = async () => {
                const respone = await fetch(`/team/${teamName}/matches?year=${year}`);
                const data = await respone.json();
                setMatches(data);
            };

            fetchMatches();
        }, [teamName, year]
    )
   
    return (
        <div className="MatchPage">
        
        <div className="year-selector">
            <h3>Select year</h3>
            <YearSelector teamName={teamName}/>
        </div>
        <div className="match-details">
            <h1 className="page-heading">{teamName} matches in {year}</h1>
            {matches.map(match => <MatchDetailCard key={match.id} match={match} teamName = {teamName}/>)}
        </div>
        
        </div>
    );
    }

