
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockClubs, mockLeagueResults, mockPlayerClubRegistrations } from '@/data/leagueData';
import type { Club, LeagueResult, PlayerClubRegistration } from '@/data/leagueData';

interface LeagueContextType {
  clubs: Club[];
  leagueResults: LeagueResult[];
  playerClubRegistrations: PlayerClubRegistration[];
  addClub: (club: Omit<Club, 'id' | 'points' | 'gamesWon' | 'gamesLost' | 'matchesPlayed' | 'matchesWon' | 'matchesLost'>) => void;
  updateClub: (id: string, updates: Partial<Club>) => void;
  deleteClub: (id: string) => void;
  addLeagueResult: (result: Omit<LeagueResult, 'id'>) => void;
  addClubMatch: (match: any) => void;
  registerPlayerToClub: (playerId: string, clubId: string, playerName: string, clubName: string) => void;
  updateClubStats: (homeClub: string, awayClub: string, homeScore: number, awayScore: number) => void;
}

const LeagueContext = createContext<LeagueContextType | undefined>(undefined);

export const LeagueProvider = ({ children }: { children: ReactNode }) => {
  const [clubs, setClubs] = useState<Club[]>(mockClubs);
  const [leagueResults, setLeagueResults] = useState<LeagueResult[]>(mockLeagueResults);
  const [playerClubRegistrations, setPlayerClubRegistrations] = useState<PlayerClubRegistration[]>(mockPlayerClubRegistrations);

  const addClub = (clubData: Omit<Club, 'id' | 'points' | 'gamesWon' | 'gamesLost' | 'matchesPlayed' | 'matchesWon' | 'matchesLost'>) => {
    const newClub: Club = {
      ...clubData,
      id: Date.now().toString(),
      points: 0,
      gamesWon: 0,
      gamesLost: 0,
      matchesPlayed: 0,
      matchesWon: 0,
      matchesLost: 0
    };
    setClubs(prev => [...prev, newClub]);
  };

  const updateClub = (id: string, updates: Partial<Club>) => {
    setClubs(prev => prev.map(club => 
      club.id === id ? { ...club, ...updates } : club
    ));
  };

  const deleteClub = (id: string) => {
    setClubs(prev => prev.filter(club => club.id !== id));
  };

  const calculatePoints = (teamScore: number, opponentScore: number): number => {
    if (teamScore > opponentScore) {
      return opponentScore < 8 ? 3 : 2;
    } else if (teamScore === opponentScore) {
      return 2;
    } else {
      return teamScore > 8 ? 1 : 0;
    }
  };

  const updateClubStats = (homeClub: string, awayClub: string, homeScore: number, awayScore: number) => {
    setClubs(prev => prev.map(club => {
      if (club.name === homeClub) {
        const points = calculatePoints(homeScore, awayScore);
        const won = homeScore > awayScore ? 1 : 0;
        const lost = homeScore < awayScore ? 1 : 0;
        return {
          ...club,
          points: club.points + points,
          gamesWon: club.gamesWon + homeScore,
          gamesLost: club.gamesLost + awayScore,
          matchesPlayed: club.matchesPlayed + 1,
          matchesWon: club.matchesWon + won,
          matchesLost: club.matchesLost + lost
        };
      } else if (club.name === awayClub) {
        const points = calculatePoints(awayScore, homeScore);
        const won = awayScore > homeScore ? 1 : 0;
        const lost = awayScore < homeScore ? 1 : 0;
        return {
          ...club,
          points: club.points + points,
          gamesWon: club.gamesWon + awayScore,
          gamesLost: club.gamesLost + homeScore,
          matchesPlayed: club.matchesPlayed + 1,
          matchesWon: club.matchesWon + won,
          matchesLost: club.matchesLost + lost
        };
      }
      return club;
    }));
  };

  const addLeagueResult = (resultData: Omit<LeagueResult, 'id'>) => {
    const newResult: LeagueResult = {
      ...resultData,
      id: Date.now().toString()
    };
    setLeagueResults(prev => [...prev, newResult]);
    updateClubStats(resultData.homeClub, resultData.awayClub, resultData.homeScore, resultData.awayScore);
  };

  const addClubMatch = (match: any) => {
    addLeagueResult(match);
  };

  const registerPlayerToClub = (playerId: string, clubId: string, playerName: string, clubName: string) => {
    const newRegistration: PlayerClubRegistration = {
      playerId,
      clubId,
      playerName,
      clubName
    };
    setPlayerClubRegistrations(prev => [...prev, newRegistration]);
  };

  return (
    <LeagueContext.Provider value={{
      clubs,
      leagueResults,
      playerClubRegistrations,
      addClub,
      updateClub,
      deleteClub,
      addLeagueResult,
      addClubMatch,
      registerPlayerToClub,
      updateClubStats
    }}>
      {children}
    </LeagueContext.Provider>
  );
};

export const useLeagueContext = () => {
  const context = useContext(LeagueContext);
  if (!context) {
    throw new Error('useLeagueContext must be used within a LeagueProvider');
  }
  return context;
};
