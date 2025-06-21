
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockTournaments, mockPlayers, mockMatches } from '@/data/mockData';

interface AppContextType {
  tournaments: typeof mockTournaments;
  players: typeof mockPlayers;
  matches: typeof mockMatches;
  updateTournament: (id: string, tournament: any) => void;
  updatePlayer: (id: string, player: any) => void;
  addTournament: (tournament: any) => void;
  addPlayer: (player: any) => void;
  addMatch: (match: any) => void;
  deleteTournament: (id: string) => void;
  deletePlayer: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [tournaments, setTournaments] = useState(mockTournaments);
  const [players, setPlayers] = useState(mockPlayers);
  const [matches, setMatches] = useState(mockMatches);

  const updateTournament = (id: string, updatedTournament: any) => {
    setTournaments(prev => prev.map(t => t.id === id ? updatedTournament : t));
  };

  const updatePlayer = (id: string, updatedPlayer: any) => {
    setPlayers(prev => prev.map(p => p.id === id ? updatedPlayer : p));
  };

  const addTournament = (tournament: any) => {
    const newTournament = {
      ...tournament,
      id: Date.now().toString(),
      status: "upcoming" as const,
      participants: 0,
      events: 5,
      organizer: "BWF"
    };
    setTournaments(prev => [...prev, newTournament]);
  };

  const addPlayer = (player: any) => {
    const newPlayer = {
      ...player,
      id: Date.now().toString(),
      age: parseInt(player.age) || 25,
      ranking: players.filter(p => p.category === player.category).length + 1,
      achievements: [],
      matchesWon: 0,
      matchesLost: 0,
      winRate: 0,
      recentForm: ["W", "L", "W", "W", "L"]
    };
    setPlayers(prev => [...prev, newPlayer]);
  };

  const addMatch = (match: any) => {
    setMatches(prev => [...prev, match]);
  };

  const deleteTournament = (id: string) => {
    setTournaments(prev => prev.filter(t => t.id !== id));
  };

  const deletePlayer = (id: string) => {
    setPlayers(prev => prev.filter(p => p.id !== id));
  };

  return (
    <AppContext.Provider value={{
      tournaments,
      players,
      matches,
      updateTournament,
      updatePlayer,
      addTournament,
      addPlayer,
      addMatch,
      deleteTournament,
      deletePlayer
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
