
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockTournaments, mockPlayers, mockMatches, type Player } from '@/data/mockData';

interface AppContextType {
  tournaments: typeof mockTournaments;
  players: Player[];
  matches: typeof mockMatches;
  updateTournament: (id: string, tournament: any) => void;
  updatePlayer: (id: string, player: any) => void;
  addTournament: (tournament: any) => void;
  addPlayer: (player: any) => void;
  addMatch: (match: any) => void;
  deleteTournament: (id: string) => void;
  deletePlayer: (id: string) => void;
  calculatePlayerRankingPoints: (playerId: string, category: string, won: boolean, division: "Division 1" | "Division 2") => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [tournaments, setTournaments] = useState(mockTournaments);
  const [players, setPlayers] = useState<Player[]>(mockPlayers);
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
      ranking: players.length + 1,
      achievements: [],
      matchesWon: 0,
      matchesLost: 0,
      winRate: 0,
      recentForm: ["W", "L", "W", "W", "L"],
      rankingPoints: 0,
      club: player.club || "",
      categories: player.gender === "boy" 
        ? ["Men's Doubles", "Men's Mixed"] 
        : ["Women's Doubles", "Women's Mixed"]
    };

    setPlayers(prev => [...prev, newPlayer]);
  };

  const calculatePlayerRankingPoints = (playerId: string, category: string, won: boolean, division: "Division 1" | "Division 2") => {
    if (!won) return;

    const basePoints = division === "Division 1" ? 20 : 10;
    
    setPlayers(prev => prev.map(player => {
      if (player.id === playerId && player.categories?.includes(category)) {
        return {
          ...player,
          rankingPoints: (player.rankingPoints || 0) + basePoints
        };
      }
      return player;
    }));
  };

  const parseScore = (score: string): { team1Won: boolean, player1Score: number, player2Score: number } => {
    if (!score || score === "TBD") return { team1Won: false, player1Score: 0, player2Score: 0 };
    
    const sets = score.split(',').map(s => s.trim());
    let team1SetsWon = 0;
    let team2SetsWon = 0;
    let player1Total = 0;
    let player2Total = 0;
    
    sets.forEach(set => {
      const [p1, p2] = set.split('-').map(s => parseInt(s.trim()) || 0);
      player1Total += p1;
      player2Total += p2;
      
      if (p1 > p2) {
        team1SetsWon++;
      } else if (p2 > p1) {
        team2SetsWon++;
      }
    });
    
    const team1Won = team1SetsWon > team2SetsWon;
    
    return { team1Won, player1Score: player1Total, player2Score: player2Total };
  };

  const updatePlayerStats = (match: any) => {
    if (!match.score || match.score === "TBD") return;
    
    const { team1Won } = parseScore(match.score);
    
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
      
      if ((isPlayer1Team || isPlayer2Team) && player.categories?.includes(match.category)) {
        const won = (isPlayer1Team && team1Won) || (isPlayer2Team && !team1Won);
        
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
      deletePlayer,
      calculatePlayerRankingPoints
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
