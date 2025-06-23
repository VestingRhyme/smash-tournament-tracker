export interface Player {
  id: string;
  name: string;
  country: string;
  ranking: number;
  category: string;
  age: number;
  height: string;
  achievements: string[];
  matchesWon: number;
  matchesLost: number;
  winRate: number;
  recentForm: string[];
  rankingPoints?: number;
  club?: string;
}

export const mockPlayers: Player[] = [
  {
    id: "1",
    name: "Viktor Axelsen",
    country: "Denmark",
    ranking: 1,
    category: "Men's Doubles",
    age: 30,
    height: "194 cm",
    achievements: ["World Champion 2021", "Olympic Gold 2021"],
    matchesWon: 45,
    matchesLost: 8,
    winRate: 85,
    recentForm: ["W", "W", "L", "W", "W"],
    rankingPoints: 95,
    club: "Badminton Elite"
  },
  {
    id: "2",
    name: "Akane Yamaguchi", 
    country: "Japan",
    ranking: 1,
    category: "Women's Doubles",
    age: 27,
    height: "156 cm",
    achievements: ["World Champion 2022", "Asian Games Gold"],
    matchesWon: 42,
    matchesLost: 6,
    winRate: 88,
    recentForm: ["W", "W", "W", "L", "W"],
    rankingPoints: 92,
    club: "Shuttlecock Masters"
  },
  {
    id: "3",
    name: "Mohammad Ahsan",
    country: "Indonesia", 
    ranking: 2,
    category: "Men's Doubles",
    age: 37,
    height: "175 cm",
    achievements: ["Olympic Silver 2016", "World Champion 2019"],
    matchesWon: 38,
    matchesLost: 12,
    winRate: 76,
    recentForm: ["L", "W", "W", "W", "L"],
    rankingPoints: 78,
    club: "Badminton Elite"
  },
  {
    id: "4",
    name: "Chen Qingchen",
    country: "China",
    ranking: 2,
    category: "Women's Doubles", 
    age: 27,
    height: "164 cm",
    achievements: ["Olympic Gold 2021", "World Champion 2018"],
    matchesWon: 40,
    matchesLost: 10,
    winRate: 80,
    recentForm: ["W", "L", "W", "W", "W"],
    rankingPoints: 85,
    club: "Racket Warriors"
  },
  {
    id: "5",
    name: "Marcus Gideon",
    country: "Indonesia",
    ranking: 1,
    category: "Men's Mixed",
    age: 32,
    height: "178 cm", 
    achievements: ["World Champion 2017", "Asian Games Gold"],
    matchesWon: 35,
    matchesLost: 15,
    winRate: 70,
    recentForm: ["W", "W", "L", "W", "L"],
    rankingPoints: 72,
    club: "Badminton Elite"
  },
  {
    id: "6",
    name: "Apriyani Rahayu",
    country: "Indonesia",
    ranking: 1,
    category: "Women's Mixed",
    age: 25,
    height: "160 cm",
    achievements: ["Olympic Gold 2021", "World Champion 2021"],
    matchesWon: 37,
    matchesLost: 8,
    winRate: 82,
    recentForm: ["W", "W", "W", "L", "W"],
    rankingPoints: 88,
    club: "Shuttlecock Masters"
  }
];

export const mockTournaments = [
  {
    id: "1",
    name: "All England Championships 2024",
    location: "Birmingham, England",
    date: "2024-03-13",
    status: "upcoming" as const,
    participants: 128,
    events: 5,
    organizer: "BWF"
  },
  {
    id: "2", 
    name: "Indonesia Open 2024",
    location: "Jakarta, Indonesia",
    date: "2024-06-11",
    status: "live" as const,
    participants: 96,
    events: 5,
    organizer: "BWF"
  },
  {
    id: "3",
    name: "World Championships 2024", 
    location: "Paris, France",
    date: "2024-08-26",
    status: "completed" as const,
    participants: 150,
    events: 5,
    organizer: "BWF"
  }
];

export const mockMatches = [
  {
    id: "1",
    tournamentId: "1",
    player1: "Viktor Axelsen",
    player2: "Chen Long", 
    score: "21-15, 21-18",
    round: "Final",
    category: "Men's Singles",
    date: "2024-03-17"
  },
  {
    id: "2",
    tournamentId: "2",
    player1: "Mohammad Ahsan / Kevin Sanjaya",
    player2: "Marcus Gideon / Kevin Sukamuljo",
    score: "21-19, 18-21, 21-16", 
    round: "Semifinal",
    category: "Men's Doubles",
    date: "2024-06-15"
  },
  {
    id: "3",
    tournamentId: "3",
    player1: "Akane Yamaguchi",
    player2: "Carolina Marin",
    score: "TBD",
    round: "Quarterfinal", 
    category: "Women's Singles",
    date: "2024-08-29"
  }
];
