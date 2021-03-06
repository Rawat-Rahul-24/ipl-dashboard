package com.project.ipldashboard.controller;

import java.time.LocalDate;
import java.util.List;

import com.project.ipldashboard.model.Match;
import com.project.ipldashboard.model.Team;
import com.project.ipldashboard.repository.MatchRepository;
import com.project.ipldashboard.repository.TeamRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class TeamController {
    

    private TeamRepository teamRepo;
    private MatchRepository matchRepo;

    public TeamController(TeamRepository teamRepo, MatchRepository matchRepo) {
        this.teamRepo = teamRepo;
        this.matchRepo = matchRepo;
    }

    @GetMapping("/team")
    public Iterable<Team> getTeamslist(){
        return teamRepo.findAll();
     }

    @GetMapping("/team/{teamName}")
    public Team getTeam(@PathVariable String teamName){
       Team team = this.teamRepo.findByTeamName(teamName);
        team.setMatches(this.matchRepo.findLatestMatches(teamName, 4));
       return team;
    }

    @GetMapping("/team/{teamName}/matches")
    public List<Match> getMatchesForTeam(@PathVariable String teamName, @RequestParam int year){
        
        LocalDate startDate = LocalDate.of(year, 1, 1);
        LocalDate endDate = LocalDate.of(year + 1, 1, 1);

        return this.matchRepo.getMatchesByTeamBetweenDates(
            teamName, startDate, endDate);
    }


   


    

}
