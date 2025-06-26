
export interface Team {
  name: string;
  division: "Division 1" | "Division 2";
}

export interface Club {
  id: string;
  name: string;
  division: "Division 1" | "Division 2";
  points: number;
  gamesWon: number;
  gamesLost: number;
  matchesPlayed: number;
  matchesWon: number;
  matchesLost: number;
  description?: string;
  wins?: number;
  losses?: number;
  teams?: Team[];
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
    points: 15,
    gamesWon: 48,
    gamesLost: 24,
    matchesPlayed: 3,
    matchesWon: 3,
    matchesLost: 0,
    wins: 3,
    losses: 0,
    teams: [
      { name: "A Team", division: "Division 1" },
      { name: "B Team", division: "Division 2" }
    ]
  },
  {
    id: "2",
    name: "Shuttlecock Masters",
    division: "Division 1",
    points: 12,
    gamesWon: 44,
    gamesLost: 28,
    matchesPlayed: 3,
    matchesWon: 2,
    matchesLost: 1,
    wins: 2,
    losses: 1,
    teams: [
      { name: "A Team", division: "Division 1" }
    ]
  },
  {
    id: "3",
    name: "Racket Warriors",
    division: "Division 2",
    points: 9,
    gamesWon: 38,
    gamesLost: 34,
    matchesPlayed: 3,
    matchesWon: 1,
    matchesLost: 2,
    wins: 1,
    losses: 2,
    teams: [
      { name: "A Team", division: "Division 1" },
      { name: "B Team", division: "Division 2" }
    ]
  }
];

export const mockLeagueResults: LeagueResult[] = [
  {
    id: "1",
    homeClub: "Badminton Elite A",
    awayClub: "Shuttlecock Masters A",
    homeScore: 16,
    awayScore: 8,
    date: "2024-03-15",
    division: "Division 1"
  }
];

export const mockFixtures: Fixture[] = [
  {
    id: "1",
    homeClub: "Badminton Elite A",
    awayClub: "Racket Warriors A",
    date: "2024-04-15",
    location: "Community Sports Centre",
    division: "Division 1",
    status: "scheduled"
  },
  {
    id: "2",
    homeClub: "Shuttlecock Masters A",
    awayClub: "Racket Warriors B",
    date: "2024-04-22",
    location: "Municipal Sports Hall",
    division: "Division 1",
    status: "scheduled"
  }
];

export const mockResults = mockLeagueResults;

export const mockPlayerClubRegistrations: PlayerClubRegistration[] = [
  {
    playerId: "3",
    clubId: "1",
    playerName: "Mohammad Ahsan",
    clubName: "Badminton Elite"
  }
];
