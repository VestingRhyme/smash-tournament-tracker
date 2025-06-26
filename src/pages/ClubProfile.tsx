
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Users, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useLeagueContext } from "@/contexts/LeagueContext";
import { useAppContext } from "@/contexts/AppContext";

const ClubProfile = () => {
  const { id } = useParams();
  const { clubs, leagueResults, playerClubRegistrations } = useLeagueContext();
  const { players } = useAppContext();
  
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

  const clubPlayers = playerClubRegistrations?.filter(reg => reg.clubId === club.id) || [];
  const clubResults = leagueResults?.filter(result => 
    result.homeClub === club.name || result.awayClub === club.name
  ) || [];

  // Get players who are members of this club
  const clubPlayerDetails = players?.filter(player => player.club === club.name) || [];

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
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  <div>
                    <div className="font-semibold">Points</div>
                    <div className="text-sm text-slate-600">{club.points || 0}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-semibold">Players</div>
                    <div className="text-sm text-slate-600">{clubPlayerDetails.length}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-semibold">Matches Played</div>
                    <div className="text-sm text-slate-600">{club.matchesPlayed || 0}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="players">Players</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Club Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Club Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                {club.description ? (
                  <p className="text-slate-700 leading-relaxed">{club.description}</p>
                ) : (
                  <p className="text-slate-500 italic">No overview available for this club.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Match Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {clubResults.length > 0 ? (
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
                ) : (
                  <p className="text-center text-slate-500 py-8">
                    No match results recorded yet
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teams" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Club Teams
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(club.teams || []).map((team, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">{team.name}</h4>
                      <p className="text-sm text-slate-600">Division: {team.division}</p>
                      <p className="text-sm text-slate-600">Players: {Math.ceil(clubPlayerDetails.length / (club.teams?.length || 1))}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="players" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Club Players
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {clubPlayerDetails.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Wins</TableHead>
                          <TableHead>Losses</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {clubPlayerDetails.map((player) => (
                          <TableRow key={player.id}>
                            <TableCell className="font-medium">
                              <Link to={`/player/${player.id}`} className="text-blue-600 hover:underline">
                                {player.name}
                              </Link>
                            </TableCell>
                            <TableCell>{player.matchesWon || 0}</TableCell>
                            <TableCell>{player.matchesLost || 0}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-center text-slate-500 py-8">
                      No players registered to this club yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClubProfile;
