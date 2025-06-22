
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useLeagueContext } from "@/contexts/LeagueContext";

const League = () => {
  const { clubs, leagueResults, playerClubRegistrations } = useLeagueContext();
  const [selectedDivision, setSelectedDivision] = useState<"Division 1" | "Division 2">("Division 1");

  const getDivisionClubs = (division: string) => {
    return clubs
      .filter(club => club.division === division)
      .sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        const aGD = a.gamesWon - a.gamesLost;
        const bGD = b.gamesWon - b.gamesLost;
        if (bGD !== aGD) return bGD - aGD;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Badminton League</h1>
          <p className="text-lg text-slate-600">Club competitions and league tables</p>
        </div>

        <Tabs defaultValue="tables" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tables">League Tables</TabsTrigger>
            <TabsTrigger value="clubs">Club Details</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>

          <TabsContent value="tables">
            <div className="mb-6">
              <Select value={selectedDivision} onValueChange={(value: "Division 1" | "Division 2") => setSelectedDivision(value)}>
                <SelectTrigger className="w-64 mx-auto">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Division 1">Division 1</SelectItem>
                  <SelectItem value="Division 2">Division 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-yellow-600" />
                  {selectedDivision}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pos</TableHead>
                      <TableHead>Club</TableHead>
                      <TableHead>P</TableHead>
                      <TableHead>W</TableHead>
                      <TableHead>L</TableHead>
                      <TableHead>Pts</TableHead>
                      <TableHead>GF</TableHead>
                      <TableHead>GA</TableHead>
                      <TableHead>GD</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getDivisionClubs(selectedDivision).map((club, index) => (
                      <TableRow key={club.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{club.name}</TableCell>
                        <TableCell>{club.matchesPlayed}</TableCell>
                        <TableCell>{club.matchesWon}</TableCell>
                        <TableCell>{club.matchesLost}</TableCell>
                        <TableCell className="font-bold">{club.points}</TableCell>
                        <TableCell>{club.gamesWon}</TableCell>
                        <TableCell>{club.gamesLost}</TableCell>
                        <TableCell>{club.gamesWon - club.gamesLost}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clubs">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {clubs.map((club) => (
                <Card key={club.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      {club.name}
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {club.division}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Players</h4>
                      <div className="space-y-1">
                        {getClubPlayers(club.id).map((reg, index) => (
                          <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                            {reg.playerName}
                          </div>
                        ))}
                        {getClubPlayers(club.id).length === 0 && (
                          <p className="text-sm text-gray-500">No players registered</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Recent Results</h4>
                      <div className="space-y-1">
                        {getClubResults(club.name).slice(0, 3).map((result) => (
                          <div key={result.id} className="text-sm bg-gray-50 p-2 rounded">
                            <div className="flex justify-between">
                              <span>{result.homeClub} vs {result.awayClub}</span>
                              <span className="font-bold">{result.homeScore}-{result.awayScore}</span>
                            </div>
                            <div className="text-xs text-gray-500">{result.date}</div>
                          </div>
                        ))}
                        {getClubResults(club.name).length === 0 && (
                          <p className="text-sm text-gray-500">No results yet</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="font-bold text-lg">{club.points}</div>
                        <div className="text-xs text-gray-500">Points</div>
                      </div>
                      <div>
                        <div className="font-bold text-lg">{club.matchesWon}</div>
                        <div className="text-xs text-gray-500">Won</div>
                      </div>
                      <div>
                        <div className="font-bold text-lg">{club.matchesPlayed}</div>
                        <div className="text-xs text-gray-500">Played</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="results">
            <Card>
              <CardHeader>
                <CardTitle>Recent Results</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Home</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Away</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leagueResults.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell>{result.date}</TableCell>
                        <TableCell className="font-medium">{result.homeClub}</TableCell>
                        <TableCell className="text-center font-bold">
                          {result.homeScore} - {result.awayScore}
                        </TableCell>
                        <TableCell className="font-medium">{result.awayClub}</TableCell>
                      </TableRow>
                    ))}
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
