
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Calendar, Users, Target } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useLeagueContext } from "@/contexts/LeagueContext";

const League = () => {
  const { clubs, fixtures, results } = useLeagueContext();

  // Generate league table data with individual teams
  const generateLeagueTable = (division: "Division 1" | "Division 2") => {
    const teamsInDivision: any[] = [];
    
    clubs.forEach(club => {
      if (club.teams && club.teams.length > 0) {
        club.teams.forEach(team => {
          if (team.division === division) {
            const teamName = club.teams!.length > 1 ? 
              `${club.name} ${team.name.split(' ')[0]}` : 
              club.name;
            
            teamsInDivision.push({
              id: `${club.id}-${team.name}`,
              name: teamName,
              clubId: club.id,
              division: team.division,
              points: club.points || 0,
              wins: club.wins || 0,
              losses: club.losses || 0,
              matchesPlayed: club.matchesPlayed || 0,
              gamesWon: club.gamesWon || 0,
              gamesLost: club.gamesLost || 0
            });
          }
        });
      } else {
        // For clubs without explicit teams, treat as single team
        if (club.division === division) {
          teamsInDivision.push({
            id: club.id,
            name: club.name,
            clubId: club.id,
            division: club.division,
            points: club.points || 0,
            wins: club.wins || 0,
            losses: club.losses || 0,
            matchesPlayed: club.matchesPlayed || 0,
            gamesWon: club.gamesWon || 0,
            gamesLost: club.gamesLost || 0
          });
        }
      }
    });

    return teamsInDivision.sort((a, b) => b.points - a.points);
  };

  const division1Teams = generateLeagueTable("Division 1");
  const division2Teams = generateLeagueTable("Division 2");

  const upcomingFixtures = fixtures.filter(f => f.status === "scheduled").slice(0, 10);
  const recentResults = results.slice(-10).reverse();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">League</h1>
          <p className="text-lg text-slate-600">League standings and fixtures</p>
        </div>

        <Tabs defaultValue="tables" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tables">League Tables</TabsTrigger>
            <TabsTrigger value="fixtures">Fixtures & Results</TabsTrigger>
          </TabsList>

          <TabsContent value="tables" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Division 1 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    Division 1
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">Pos</TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead className="text-center">MP</TableHead>
                        <TableHead className="text-center">W</TableHead>
                        <TableHead className="text-center">L</TableHead>
                        <TableHead className="text-center">Pts</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {division1Teams.map((team, index) => (
                        <TableRow key={team.id}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>
                            <Link to={`/club/${team.clubId}`} className="text-blue-600 hover:underline font-medium">
                              {team.name}
                            </Link>
                          </TableCell>
                          <TableCell className="text-center">{team.matchesPlayed}</TableCell>
                          <TableCell className="text-center">{team.wins}</TableCell>
                          <TableCell className="text-center">{team.losses}</TableCell>
                          <TableCell className="text-center font-bold">{team.points}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Division 2 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-gray-600" />
                    Division 2
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">Pos</TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead className="text-center">MP</TableHead>
                        <TableHead className="text-center">W</TableHead>
                        <TableHead className="text-center">L</TableHead>
                        <TableHead className="text-center">Pts</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {division2Teams.map((team, index) => (
                        <TableRow key={team.id}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>
                            <Link to={`/club/${team.clubId}`} className="text-blue-600 hover:underline font-medium">
                              {team.name}
                            </Link>
                          </TableCell>
                          <TableCell className="text-center">{team.matchesPlayed}</TableCell>
                          <TableCell className="text-center">{team.wins}</TableCell>
                          <TableCell className="text-center">{team.losses}</TableCell>
                          <TableCell className="text-center font-bold">{team.points}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* League Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  League Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{division1Teams.length + division2Teams.length}</div>
                    <div className="text-sm text-slate-600">Total Teams</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{division1Teams.length}</div>
                    <div className="text-sm text-slate-600">Division 1</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">{division2Teams.length}</div>
                    <div className="text-sm text-slate-600">Division 2</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{results.length}</div>
                    <div className="text-sm text-slate-600">Matches Played</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fixtures" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upcoming Fixtures */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Fixtures
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingFixtures.map((fixture) => (
                      <div key={fixture.id} className="p-4 border rounded-lg">
                        <div className="font-medium">
                          {fixture.homeClub} vs {fixture.awayClub}
                        </div>
                        <div className="text-sm text-slate-600 mt-1">
                          {fixture.date} • {fixture.location}
                        </div>
                        <Badge variant="outline" className="mt-2">
                          {fixture.division}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Recent Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentResults.map((result) => (
                      <div key={result.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{result.homeClub}</div>
                            <div className="text-slate-600">{result.awayClub}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">
                              {result.homeScore}-{result.awayScore}
                            </div>
                            <div className="text-xs text-slate-600">{result.date}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="mt-2">
                          {result.division}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default League;
