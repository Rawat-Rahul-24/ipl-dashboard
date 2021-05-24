import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import {PieChart} from 'react-minimal-pie-chart'
import { Link } from 'react-router-dom'

import './TeamPage.scss';

export const TeamPage = () => {

    const [team, setTeam] = useState({matches: []});
    const { teamName } = useParams();
    
    useEffect(
        () => {
            const fetchMatches = async () => {
                const respone = await fetch(`/team/${teamName}`);
                const data = await respone.json();
                setTeam(data);
            };

            fetchMatches();
        }, [teamName]
        
    )

    if(!team || !team.teamName){
        return <h1> Team not found </h1>
    }
    return (
        <div className="TeamPage">
        
        <div className="team-name-section">
            <h1 className="team-name">{team.teamName}</h1>
        </div>
        <div className="win-loss-section">
            Wins /Losses
            <PieChart animate
                data={[
                    { title: 'Wins', value: team.totalWins, color: '#59B65A' },
                    { title: 'Losses', value: team.totalMatches - team.totalWins, color: '#B63131' }
                ]}
                />
        </div>
        <div className="match-detail">
            <h3>Latest Matches</h3> 
            <MatchDetailCard teamName = {team.teamName} match = {team.matches[0]}/>
        </div>
        
        {team.matches.slice(1).map(match => <MatchSmallCard key={match.id} match={match} teamName = {team.teamName}/>)}
        
        <div className="more-link">
        <Link to={`/team/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}>More</Link> 
           
        </div>
        </div>
    );
    }

