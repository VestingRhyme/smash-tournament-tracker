
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
}

export interface LeagueResult {
  id: string;
  homeClub: string;
  awayClub: string;
  homeScore: number;
  awayScore: number;
  date: string;
  division: "Division 1" | "Division 2";
}

export interface PlayerClubRegistration {
  playerId: string;
  clubId: string;
  playerName: string;
  clubName: string;
}

export const mockClubs: Club[] = [
  {
    id: "1",
    name: "Badminton Elite",
    division: "Division 1",
    country: "England",
    points: 15,
    gamesWon: 48,
    gamesLost: 24,
    matchesPlayed: 3,
    matchesWon: 3,
    matchesLost: 0
  },
  {
    id: "2",
    name: "Shuttlecock Masters",
    division: "Division 1",
    country: "England",
    points: 12,
    gamesWon: 44,
    gamesLost: 28,
    matchesPlayed: 3,
    matchesWon: 2,
    matchesLost: 1
  },
  {
    id: "3",
    name: "Racket Warriors",
    division: "Division 2",
    country: "England",
    points: 9,
    gamesWon: 38,
    gamesLost: 34,
    matchesPlayed: 3,
    matchesWon: 1,
    matchesLost: 2
  }
];

export const mockLeagueResults: LeagueResult[] = [
  {
    id: "1",
    homeClub: "Badminton Elite",
    awayClub: "Shuttlecock Masters",
    homeScore: 16,
    awayScore: 8,
    date: "2024-03-15",
    division: "Division 1"
  }
];

export const mockPlayerClubRegistrations: PlayerClubRegistration[] = [
  {
    playerId: "3",
    clubId: "1",
    playerName: "Mohammad Ahsan",
    clubName: "Badminton Elite"
  }
];
