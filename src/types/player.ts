
export interface Player {
  id: string;
  name: string;
  age: number;
  country: string;
  category: string;
  categories?: string[];
  ranking: number;
  height: string;
  achievements: string[];
  matchesWon: number;
  matchesLost: number;
  winRate: number;
  recentForm: string[];
  rankingPoints?: number;
  club?: string;
  gender?: "boy" | "girl";
}
