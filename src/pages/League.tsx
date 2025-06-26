
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, Users, Target } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useLeagueContext } from "@/contexts/LeagueContext";

const League = () => {
  const { clubs, fixtures, results } = useLeagueContext();
  const [selectedDivision, setSelectedDivision] = useState<"Division 1" | "Division 2">("Division 1");

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

  const upcomingFixtures = fixtures.filter(f => f.status === "scheduled").slice(0, 5);
  const recentResults = results.slice(-5).reverse();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">League Tables</h1>
          <p className="text-lg text-slate-600">Current standings and upcoming fixtures</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main League Tables */}
          <div className="lg:col-span-2 space-y-8">
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
                      <TableHead className="text-center">GW</TableHead>
                      <TableHead className="text-center">GL</TableHead>
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
                        <TableCell className="text-center">{team.gamesWon}</TableCell>
                        <TableCell className="text-center">{team.gamesLost}</TableCell>
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
                      <TableHead className="text-center">GW</TableHead>
                      <TableHead className="text-center">GL</TableHead>
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
                        <TableCell className="text-center">{team.gamesWon}</TableCell>
                        <TableCell className="text-center">{team.gamesLost}</TableCell>
                        <TableCell className="text-center font-bold">{team.points}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
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
                    <div key={fixture.id} className="p-3 border rounded-lg">
                      <div className="font-medium text-sm">
                        {fixture.homeClub} vs {fixture.awayClub}
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        {fixture.date} • {fixture.location}
                      </div>
                      <Badge variant="outline" className="mt-2 text-xs">
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
                    <div key={result.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
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
                      <Badge variant="outline" className="mt-2 text-xs">
                        {result.division}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* League Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  League Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Total Teams</span>
                    <span className="font-medium">{division1Teams.length + division2Teams.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Division 1 Teams</span>
                    <span className="font-medium">{division1Teams.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Division 2 Teams</span>
                    <span className="font-medium">{division2Teams.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Matches Played</span>
                    <span className="font-medium">{results.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default League;
