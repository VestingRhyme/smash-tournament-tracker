import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Trophy, TrendingUp, Target, Globe, Calendar, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/contexts/AppContext";
import { useLeagueContext } from "@/contexts/LeagueContext";

const PlayerProfile = () => {
  const { id } = useParams();
  const { players, matches } = useAppContext();
  const { playerClubRegistrations } = useLeagueContext();
  const [selectedOpponent, setSelectedOpponent] = useState<string>("");

  const player = players.find(p => p.id === id);

  if (!player) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Player Not Found</h1>
            <p className="text-lg text-slate-600">The requested player profile could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  // Get player's club
  const playerClub = playerClubRegistrations.find(reg => reg.playerId === player.id);

  // Get all players with same name (for different categories)
  const allPlayerVersions = players.filter(p => p.name === player.name);

  // Get matches for this player (including doubles matches)
  const playerMatches = matches.filter(match => 
    match.player1.includes(player.name) || match.player2.includes(player.name)
  );

  // Get opponents this player has played against
  const getOpponents = () => {
    const opponentNames = new Set<string>();
    playerMatches.forEach(match => {
      if (match.score && match.score !== "TBD") {
        const opponent = match.player1.includes(player.name) ? match.player2 : match.player1;
        // Extract individual names from doubles teams
        if (opponent.includes(' / ')) {
          opponent.split(' / ').forEach(name => opponentNames.add(name.trim()));
        } else {
          opponentNames.add(opponent.trim());
        }
      }
    });
    return Array.from(opponentNames).filter(name => name !== player.name);
  };

  const formatPlayerNames = (playerString: string) => {
    if (playerString.includes(' / ')) {
      const players = playerString.split(' / ');
      return (
        <div>
          <div>{players[0]}</div>
          <div className="text-sm text-gray-500">{players[1]}</div>
        </div>
      );
    }
    return playerString;
  };

  const getHeadToHeadStats = (player1Name: string, player2Name: string) => {
    const h2hMatches = matches.filter(match => {
      const player1InMatch = match.player1.includes(player1Name) || match.player2.includes(player1Name);
      const player2InMatch = match.player1.includes(player2Name) || match.player2.includes(player2Name);
      return player1InMatch && player2InMatch && match.score && match.score !== "TBD";
    });

    let player1Wins = 0;
    let player2Wins = 0;

    h2hMatches.forEach(match => {
      const parseScore = (score: string) => {
        const sets = score.split(',').map(s => s.trim());
        let p1Total = 0;
        let p2Total = 0;
        
        sets.forEach(set => {
          const [p1, p2] = set.split('-').map(s => parseInt(s.trim()) || 0);
          p1Total += p1;
          p2Total += p2;
        });
        
        return { p1Total, p2Total };
      };

      const { p1Total, p2Total } = parseScore(match.score);
      const player1IsPlayer1 = match.player1.includes(player1Name);
      
      if (player1IsPlayer1) {
        if (p1Total > p2Total) player1Wins++;
        else player2Wins++;
      } else {
        if (p2Total > p1Total) player1Wins++;
        else player2Wins++;
      }
    });

    return { player1Wins, player2Wins, totalMatches: h2hMatches.length, matches: h2hMatches };
  };

  const opponents = getOpponents();
  const selectedH2H = selectedOpponent ? getHeadToHeadStats(player.name, selectedOpponent) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Player Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {player.name.split(' ').map(n => n[0]).join('')}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl font-bold text-slate-800">{player.name}</h1>
                <Badge className="bg-yellow-500 text-white">
                  Rank #{player.ranking}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-semibold">Club</div>
                    <div className="text-sm text-slate-600">
                      {playerClub ? playerClub.clubName : player.country}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-semibold">Categories</div>
                    <div className="text-sm text-slate-600">
                      {(player.categories || [player.category]).join(", ")}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-semibold">Age</div>
                    <div className="text-sm text-slate-600">{player.age} years</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-red-600" />
                  <div>
                    <div className="font-semibold">Height</div>
                    <div className="text-sm text-slate-600">{player.height}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* All Rankings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Current Rankings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(player.categories || [player.category]).map((category, index) => {
                    const categoryRanking = allPlayerVersions.find(p => 
                      (p.categories?.includes(category) || p.category === category)
                    );
                    return (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{category}</h4>
                            <p className="text-sm text-slate-600">Rank #{categoryRanking?.ranking || player.ranking}</p>
                            {player.rankingPoints && (
                              <p className="text-sm text-blue-600 font-medium">{player.rankingPoints} ranking points</p>
                            )}
                          </div>
                          <Badge variant="outline">
                            {player.winRate}% WR
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">{player.matchesWon}</div>
                    <div className="text-sm text-slate-600">Matches Won</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">{player.matchesLost}</div>
                    <div className="text-sm text-slate-600">Matches Lost</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{player.winRate}%</div>
                    <div className="text-sm text-slate-600">Win Rate</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Win Rate</span>
                    <span className="text-sm text-slate-600">{player.winRate}%</span>
                  </div>
                  <Progress value={player.winRate} className="h-3" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Form</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  {(player.recentForm || []).slice(0, 5).map((result, index) => (
                    <div
                      key={index}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                        result === 'W' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      {result}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-600 mt-3">
                  Last 5 matches (most recent first)
                </p>
              </CardContent>
            </Card>

            {/* Interactive Head-to-Head Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Head-to-Head Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Select Opponent</label>
                  <Select value={selectedOpponent} onValueChange={setSelectedOpponent}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose an opponent to view head-to-head record" />
                    </SelectTrigger>
                    <SelectContent>
                      {opponents.map((opponent) => (
                        <SelectItem key={opponent} value={opponent}>
                          {opponent}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedH2H && (
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-slate-50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">
                          {player.name} vs {selectedOpponent}
                        </h4>
                        <div className="text-right">
                          <div className="font-bold text-lg">
                            <span className={selectedH2H.player1Wins > selectedH2H.player2Wins ? "text-green-600" : "text-red-600"}>
                              {selectedH2H.player1Wins}
                            </span>
                            <span className="text-slate-400 mx-1">-</span>
                            <span className={selectedH2H.player2Wins > selectedH2H.player1Wins ? "text-green-600" : "text-red-600"}>
                              {selectedH2H.player2Wins}
                            </span>
                          </div>
                          <div className="text-sm text-slate-600">
                            {selectedH2H.totalMatches} matches played
                          </div>
                        </div>
                      </div>
                    </div>

                    {selectedH2H.matches.length > 0 && (
                      <div>
                        <h5 className="font-medium mb-2">Match History</h5>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Discipline</TableHead>
                              <TableHead>Score</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Result</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedH2H.matches.map((match) => {
                              const parseScore = (score: string) => {
                                const sets = score.split(',').map(s => s.trim());
                                let p1Total = 0;
                                let p2Total = 0;
                                
                                sets.forEach(set => {
                                  const [p1, p2] = set.split('-').map(s => parseInt(s.trim()) || 0);
                                  p1Total += p1;
                                  p2Total += p2;
                                });
                                
                                return { p1Total, p2Total };
                              };

                              const { p1Total, p2Total } = parseScore(match.score);
                              const playerIsPlayer1 = match.player1.includes(player.name);
                              const won = playerIsPlayer1 ? p1Total > p2Total : p2Total > p1Total;

                              return (
                                <TableRow key={match.id}>
                                  <TableCell>{match.category}</TableCell>
                                  <TableCell className="font-mono">{match.score}</TableCell>
                                  <TableCell>{match.date || "Not set"}</TableCell>
                                  <TableCell>
                                    <Badge variant={won ? "default" : "destructive"}>
                                      {won ? "W" : "L"}
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </div>
                )}

                {opponents.length === 0 && (
                  <p className="text-center text-slate-500 py-8">
                    No opponents found. This player hasn't played any matches with recorded scores yet.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Recent Matches */}
            {playerMatches.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Matches</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Opponent</TableHead>
                        <TableHead>Tournament</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {playerMatches.map((match) => {
                        const opponent = match.player1.includes(player.name) ? match.player2 : match.player1;
                        return (
                          <TableRow key={match.id}>
                            <TableCell className="font-medium">{formatPlayerNames(opponent)}</TableCell>
                            <TableCell>{match.tournament}</TableCell>
                            <TableCell>{match.score || "TBD"}</TableCell>
                            <TableCell>{match.date || "Not set"}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Achievements */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Major Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {player.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Trophy className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
