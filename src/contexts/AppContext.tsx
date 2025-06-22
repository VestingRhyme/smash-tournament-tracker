
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

  const parseScore = (score: string): { player1Score: number, player2Score: number } => {
    if (!score || score === "TBD") return { player1Score: 0, player2Score: 0 };
    
    // Handle scores like "21-15, 21-18" or "21-15"
    const sets = score.split(',').map(s => s.trim());
    let player1Total = 0;
    let player2Total = 0;
    
    sets.forEach(set => {
      const [p1, p2] = set.split('-').map(s => parseInt(s.trim()) || 0);
      player1Total += p1;
      player2Total += p2;
    });
    
    return { player1Score: player1Total, player2Score: player2Total };
  };

  const updatePlayerStats = (match: any) => {
    if (!match.score || match.score === "TBD") return;
    
    const { player1Score, player2Score } = parseScore(match.score);
    const player1Won = player1Score > player2Score;
    
    // Extract individual player names from team names (for doubles)
    const getPlayerNames = (playerString: string): string[] => {
      if (playerString.includes(' / ')) {
        return playerString.split(' / ').map(name => name.trim());
      }
      return [playerString.trim()];
    };
    
    const player1Names = getPlayerNames(match.player1);
    const player2Names = getPlayerNames(match.player2);
    
    setPlayers(prev => prev.map(player => {
      const isPlayer1Team = player1Names.includes(player.name);
      const isPlayer2Team = player2Names.includes(player.name);
      
      if (isPlayer1Team || isPlayer2Team) {
        const won = (isPlayer1Team && player1Won) || (isPlayer2Team && !player1Won);
        
        return {
          ...player,
          matchesWon: won ? player.matchesWon + 1 : player.matchesWon,
          matchesLost: !won ? player.matchesLost + 1 : player.matchesLost,
          winRate: Math.round(((won ? player.matchesWon + 1 : player.matchesWon) / ((player.matchesWon + player.matchesLost + 1) || 1)) * 100),
          recentForm: [won ? 'W' : 'L', ...player.recentForm.slice(0, 4)]
        };
      }
      
      return player;
    }));
  };

  const addMatch = (match: any) => {
    const newMatch = {
      ...match,
      id: Date.now().toString()
    };
    
    setMatches(prev => [...prev, newMatch]);
    
    // Update player stats if match has a score
    if (newMatch.score && newMatch.score !== "TBD") {
      updatePlayerStats(newMatch);
    }
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
