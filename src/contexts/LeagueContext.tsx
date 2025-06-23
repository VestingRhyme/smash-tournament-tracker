import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockClubs, mockFixtures, mockResults, mockPlayerClubRegistrations } from '@/data/leagueData';

export interface Club {
  id: string;
  name: string;
  division: "Division 1" | "Division 2";
  country: string;
  points: number;
  gamesWon: number;
  gamesLost: number;
  matchesPlayed: number;
  matchesWon: number;
  matchesLost: number;
  location?: string;
  founded?: string;
  description?: string;
  wins?: number;
  losses?: number;
}

export interface Fixture {
  id: string;
  homeClub: string;
  awayClub: string;
  date: string;
  location: string;
  division: "Division 1" | "Division 2";
  status: "scheduled" | "completed";
  homeScore?: number;
  awayScore?: number;
}

export interface Result {
  id: string;
  homeClub: string;
  awayClub: string;
  homeScore: number;
  awayScore: number;
  date: string;
  division: "Division 1" | "Division 2";
}

interface LeagueContextType {
  clubs: Club[];
  fixtures: Fixture[];
  results: Result[];
  leagueResults: Result[];
  playerClubRegistrations: any[];
  addClub: (club: Omit<Club, 'id'>) => void;
  deleteClub: (id: string) => void;
  addFixture: (fixture: Omit<Fixture, 'id' | 'status'>) => void;
  updateFixture: (id: string, fixture: Partial<Fixture>) => void;
  addResult: (result: Omit<Result, 'id'>) => void;
}

const LeagueContext = createContext<LeagueContextType | undefined>(undefined);

export const LeagueProvider = ({ children }: { children: ReactNode }) => {
  const [clubs, setClubs] = useState<Club[]>(mockClubs);
  const [fixtures, setFixtures] = useState<Fixture[]>(mockFixtures);
  const [results, setResults] = useState<Result[]>(mockResults);
  const [playerClubRegistrations, setPlayerClubRegistrations] = useState(mockPlayerClubRegistrations);

  const addClub = (club: Omit<Club, 'id'>) => {
    const newClub: Club = {
      ...club,
      id: Date.now().toString(),
      wins: 0,
      losses: 0,
      points: 0
    };
    setClubs(prev => [...prev, newClub]);
  };

  const deleteClub = (id: string) => {
    setClubs(prev => prev.filter(club => club.id !== id));
  };

  const addFixture = (fixture: Omit<Fixture, 'id' | 'status'>) => {
    const newFixture: Fixture = {
      ...fixture,
      id: Date.now().toString(),
      status: "scheduled"
    };
    setFixtures(prev => [...prev, newFixture]);
  };

  const updateFixture = (id: string, updatedFixture: Partial<Fixture>) => {
    setFixtures(prev => prev.map(fixture => 
      fixture.id === id ? { ...fixture, ...updatedFixture } : fixture
    ));
  };

  const addResult = (result: Omit<Result, 'id'>) => {
    const newResult: Result = {
      ...result,
      id: Date.now().toString()
    };
    setResults(prev => [...prev, newResult]);
    
    // Update club standings
    setClubs(prev => prev.map(club => {
      if (club.name === result.homeClub) {
        const won = result.homeScore > result.awayScore;
        return {
          ...club,
          wins: (club.wins || 0) + (won ? 1 : 0),
          losses: (club.losses || 0) + (won ? 0 : 1),
          points: (club.points || 0) + (won ? 3 : 0)
        };
      }
      if (club.name === result.awayClub) {
        const won = result.awayScore > result.homeScore;
        return {
          ...club,
          wins: (club.wins || 0) + (won ? 1 : 0),
          losses: (club.losses || 0) + (won ? 0 : 1),
          points: (club.points || 0) + (won ? 3 : 0)
        };
      }
      return club;
    }));
  };

  return (
    <LeagueContext.Provider value={{
      clubs,
      fixtures,
      results,
      leagueResults: results,
      playerClubRegistrations,
      addClub,
      deleteClub,
      addFixture,
      updateFixture,
      addResult
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
