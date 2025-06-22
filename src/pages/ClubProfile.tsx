
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Users, Calendar, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useLeagueContext } from "@/contexts/LeagueContext";

const ClubProfile = () => {
  const { id } = useParams();
  const { clubs, leagueResults, playerClubRegistrations } = useLeagueContext();
  
  const club = clubs.find(c => c.id === id);
  
  if (!club) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Club Not Found</h1>
            <p className="text-lg text-slate-600">The requested club profile could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  const clubPlayers = playerClubRegistrations.filter(reg => reg.clubId === club.id);
  const clubResults = leagueResults.filter(result => 
    result.homeClub === club.name || result.awayClub === club.name
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Club Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="w-32 h-32 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {club.name.split(' ').map(n => n[0]).join('')}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl font-bold text-slate-800">{club.name}</h1>
                <Badge className="bg-blue-500 text-white">
                  {club.division}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  <div>
                    <div className="font-semibold">Points</div>
                    <div className="text-sm text-slate-600">{club.points}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-semibold">Players</div>
                    <div className="text-sm text-slate-600">{clubPlayers.length}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-semibold">Matches Played</div>
                    <div className="text-sm text-slate-600">{club.matchesPlayed}</div>
                  </div>
                </div>
                
                {club.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-red-600" />
                    <div>
                      <div className="font-semibold">Location</div>
                      <div className="text-sm text-slate-600">{club.location}</div>
                    </div>
                  </div>
                )}
              </div>

              {club.founded && (
                <div className="mt-4 flex items-center gap-3">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-semibold">Founded</div>
                    <div className="text-sm text-slate-600">{club.founded}</div>
                  </div>
                </div>
              )}

              {club.description && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-slate-600">{club.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Club Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Club Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{club.matchesWon}</div>
                  <div className="text-sm text-slate-600">Matches Won</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">{club.matchesLost}</div>
                  <div className="text-sm text-slate-600">Matches Lost</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{club.gamesWon}</div>
                  <div className="text-sm text-slate-600">Games Won</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">{club.gamesLost}</div>
                  <div className="text-sm text-slate-600">Games Lost</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Club Players */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Club Players
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {clubPlayers.length > 0 ? (
                  clubPlayers.map((registration) => (
                    <div key={registration.playerId} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{registration.playerName}</h4>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-slate-500 py-8">
                    No players registered to this club yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Match Results */}
        {clubResults.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Match Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Home</TableHead>
                    <TableHead>Away</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clubResults.map((result) => {
                    const isHome = result.homeClub === club.name;
                    const won = isHome ? result.homeScore > result.awayScore : result.awayScore > result.homeScore;
                    const draw = result.homeScore === result.awayScore;
                    
                    return (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium">{result.homeClub}</TableCell>
                        <TableCell>{result.awayClub}</TableCell>
                        <TableCell className="font-mono">{result.homeScore}-{result.awayScore}</TableCell>
                        <TableCell>{result.date}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={won ? "default" : draw ? "secondary" : "destructive"}
                            className={won ? "bg-green-500" : draw ? "bg-gray-500" : "bg-red-500"}
                          >
                            {won ? "W" : draw ? "D" : "L"}
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
    </div>
  );
};

export default ClubProfile;
