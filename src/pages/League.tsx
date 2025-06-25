
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useLeagueContext } from "@/contexts/LeagueContext";
import type { Club } from "@/data/leagueData";

interface Team {
  id: string;
  name: string;
  clubId: string;
  clubName: string;
  division: "Division 1" | "Division 2";
  points: number;
  gamesWon: number;
  gamesLost: number;
  matchesPlayed: number;
  matchesWon: number;
  matchesLost: number;
}

const League = () => {
  const { clubs, leagueResults, playerClubRegistrations } = useLeagueContext();
  const [selectedDivision, setSelectedDivision] = useState<"Division 1" | "Division 2">("Division 1");

  // Convert clubs to teams
  const generateTeams = (): Team[] => {
    const teams: Team[] = [];
    clubs.forEach(club => {
      const clubTeams = club.teams || ['A Team'];
      clubTeams.forEach((teamName, index) => {
        const teamLetter = teamName.includes('Team') ? teamName.split(' ')[0] : 'A';
        teams.push({
          id: `${club.id}_${index}`,
          name: `${club.name} ${teamLetter}`,
          clubId: club.id,
          clubName: club.name,
          division: club.division,
          points: club.points,
          gamesWon: club.gamesWon,
          gamesLost: club.gamesLost,
          matchesPlayed: club.matchesPlayed,
          matchesWon: club.matchesWon,
          matchesLost: club.matchesLost
        });
      });
    });
    return teams;
  };

  const getTeamsByDivision = (division: "Division 1" | "Division 2"): Team[] => {
    return generateTeams()
      .filter(team => team.division === division)
      .sort((a, b) => {
        if (a.points !== b.points) return b.points - a.points;
        const aGD = a.gamesWon - a.gamesLost;
        const bGD = b.gamesWon - b.gamesLost;
        if (aGD !== bGD) return bGD - aGD;
        return b.gamesWon - a.gamesWon;
      });
  };

  const getClubPlayers = (clubId: string) => {
    return playerClubRegistrations.filter(reg => reg.clubId === clubId);
  };

  const getTeamResults = (teamName: string) => {
    return leagueResults.filter(result => 
      result.homeClub === teamName || result.awayClub === teamName
    );
  };

  const divisionTeams = getTeamsByDivision(selectedDivision);
  const divisionResults = leagueResults.filter(result => result.division === selectedDivision);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-slate-800 mb-4">League System</h1>
          
          <div className="mb-6">
            <Select value={selectedDivision} onValueChange={(value) => setSelectedDivision(value as "Division 1" | "Division 2")}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Division 1">Division 1</SelectItem>
                <SelectItem value="Division 2">Division 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="table" className="space-y-4 md:space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="table">League Table</TabsTrigger>
            <TabsTrigger value="fixtures">Fixtures & Results</TabsTrigger>
          </TabsList>

          <TabsContent value="table">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* League Table */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5" />
                      {selectedDivision} Table
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">Pos</TableHead>
                          <TableHead>Team</TableHead>
                          <TableHead className="text-center">P</TableHead>
                          <TableHead className="text-center">W</TableHead>
                          <TableHead className="text-center">L</TableHead>
                          <TableHead className="text-center">D</TableHead>
                          <TableHead className="text-center">Pts</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {divisionTeams.map((team, index) => (
                          <TableRow key={team.id} className="hover:bg-slate-50">
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>
                              <Link to={`/club/${team.clubId}`} className="hover:text-blue-600 font-medium">
                                {team.name}
                              </Link>
                            </TableCell>
                            <TableCell className="text-center">{team.matchesPlayed}</TableCell>
                            <TableCell className="text-center">{team.matchesWon}</TableCell>
                            <TableCell className="text-center">{team.matchesLost}</TableCell>
                            <TableCell className="text-center">{team.matchesPlayed - team.matchesWon - team.matchesLost}</TableCell>
                            <TableCell className="text-center font-bold">{team.points}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              {/* Team Details */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Team Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {divisionTeams.map((team) => {
                      const clubPlayers = getClubPlayers(team.clubId);
                      const teamResults = getTeamResults(team.name);
                      
                      return (
                        <div key={team.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <Link to={`/club/${team.clubId}`} className="hover:text-blue-600">
                              <h3 className="font-semibold text-lg">{team.name}</h3>
                            </Link>
                            <Badge variant="outline">{team.points} pts</Badge>
                          </div>
                          
                          <div className="space-y-2">
                            <div>
                              <h4 className="font-medium text-sm text-slate-600 mb-1">Club Players ({clubPlayers.length})</h4>
                              <div className="text-sm">
                                {clubPlayers.length > 0 ? (
                                  clubPlayers.slice(0, 3).map((reg, idx) => (
                                    <span key={reg.playerId}>
                                      {reg.playerName}
                                      {idx < Math.min(clubPlayers.length - 1, 2) && ", "}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-slate-500">No players registered</span>
                                )}
                                {clubPlayers.length > 3 && (
                                  <span className="text-slate-500"> +{clubPlayers.length - 3} more</span>
                                )}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-sm text-slate-600 mb-1">Recent Results</h4>
                              <div className="text-sm space-y-1">
                                {teamResults.length > 0 ? (
                                  teamResults.slice(-2).map((result) => (
                                    <div key={result.id} className="text-xs">
                                      {result.homeClub === team.name ? (
                                        <>vs {result.awayClub} {result.homeScore}-{result.awayScore}</>
                                      ) : (
                                        <>@ {result.homeClub} {result.awayScore}-{result.homeScore}</>
                                      )}
                                    </div>
                                  ))
                                ) : (
                                  <span className="text-slate-500 text-xs">No results yet</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="fixtures">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {selectedDivision} Fixtures & Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Home</TableHead>
                      <TableHead>Away</TableHead>
                      <TableHead className="text-center">Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {divisionResults.length > 0 ? (
                      divisionResults.map((result) => (
                        <TableRow key={result.id}>
                          <TableCell>{result.date}</TableCell>
                          <TableCell className="font-medium">{result.homeClub}</TableCell>
                          <TableCell className="font-medium">{result.awayClub}</TableCell>
                          <TableCell className="text-center font-mono">
                            {result.homeScore}-{result.awayScore}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-slate-500 py-8">
                          No fixtures or results available for {selectedDivision}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default League;
