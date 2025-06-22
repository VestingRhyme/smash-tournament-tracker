
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useLeagueContext } from "@/contexts/LeagueContext";
import type { Club } from "@/data/leagueData";

const League = () => {
  const { clubs, leagueResults, playerClubRegistrations } = useLeagueContext();
  const [selectedDivision, setSelectedDivision] = useState<"Division 1" | "Division 2">("Division 1");

  const getClubsByDivision = (division: "Division 1" | "Division 2"): Club[] => {
    return clubs
      .filter(club => club.division === division)
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

  const getClubResults = (clubName: string) => {
    return leagueResults.filter(result => 
      result.homeClub === clubName || result.awayClub === clubName
    );
  };

  const divisionClubs = getClubsByDivision(selectedDivision);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">League System</h1>
          
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
                      <TableHead>Club</TableHead>
                      <TableHead className="text-center">P</TableHead>
                      <TableHead className="text-center">W</TableHead>
                      <TableHead className="text-center">L</TableHead>
                      <TableHead className="text-center">D</TableHead>
                      <TableHead className="text-center">Pts</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {divisionClubs.map((club, index) => (
                      <TableRow key={club.id} className="hover:bg-slate-50">
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>
                          <Link to={`/club/${club.id}`} className="hover:text-blue-600 font-medium">
                            {club.name}
                          </Link>
                        </TableCell>
                        <TableCell className="text-center">{club.matchesPlayed}</TableCell>
                        <TableCell className="text-center">{club.matchesWon}</TableCell>
                        <TableCell className="text-center">{club.matchesLost}</TableCell>
                        <TableCell className="text-center">{club.matchesPlayed - club.matchesWon - club.matchesLost}</TableCell>
                        <TableCell className="text-center font-bold">{club.points}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Club Details */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Club Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {divisionClubs.map((club) => {
                  const clubPlayers = getClubPlayers(club.id);
                  const clubResults = getClubResults(club.name);
                  
                  return (
                    <div key={club.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <Link to={`/club/${club.id}`} className="hover:text-blue-600">
                          <h3 className="font-semibold text-lg">{club.name}</h3>
                        </Link>
                        <Badge variant="outline">{club.points} pts</Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <h4 className="font-medium text-sm text-slate-600 mb-1">Players ({clubPlayers.length})</h4>
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
                            {clubResults.length > 0 ? (
                              clubResults.slice(-2).map((result) => (
                                <div key={result.id} className="text-xs">
                                  {result.homeClub === club.name ? (
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
      </div>
    </div>
  );
};

export default League;
