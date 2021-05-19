import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import {PieChart} from 'react-minimal-pie-chart'
import { Link } from 'react-router-dom'

import './HomePage.scss';
import { TeamTile } from '../components/TeamTile';

export const HomePage = () => {

    const [teams, setTeams] = useState([]);
    const { teamName } = useParams();
    
    useEffect(
        () => {
            const fetchTeams = async () => {
                const respone = await fetch(`http://localhost:8080/team`);
                const data = await respone.json();
                setTeams(data);
            };

            fetchTeams();
        }, []
        
    )

    return (
        <div className="HomePage">
        
        <div className="header-section">
            <h1 className="app-name">IPL Dashboard</h1>
        </div>
       <div className="team-grid">
            {teams.map(team => <TeamTile teamName={team.teamName} />)}   
        </div>
        </div>
    );
    }

