
import { useParams } from "react-router-dom";
import { Trophy, TrendingUp, Target, Globe, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Navbar from "@/components/Navbar";
import { mockPlayers, mockMatches } from "@/data/mockData";

const PlayerProfile = () => {
  const { id } = useParams();
  const player = mockPlayers.find(p => p.id === id);
  
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

  // Get matches for this player
  const playerMatches = mockMatches.filter(match => 
    match.player1 === player.name || match.player2 === player.name
  );

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
                    <div className="font-semibold">Country</div>
                    <div className="text-sm text-slate-600">{player.country}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-semibold">Category</div>
                    <div className="text-sm text-slate-600">{player.category}</div>
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
                  {player.recentForm.map((result, index) => (
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
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {playerMatches.map((match) => {
                        const opponent = match.player1 === player.name ? match.player2 : match.player1;
                        return (
                          <TableRow key={match.id}>
                            <TableCell className="font-medium">{opponent}</TableCell>
                            <TableCell>{match.tournament}</TableCell>
                            <TableCell>{match.score || "TBD"}</TableCell>
                            <TableCell>
                              <Badge className={
                                match.status === 'live' ? 'bg-red-500' :
                                match.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                              }>
                                {match.status}
                              </Badge>
                            </TableCell>
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
