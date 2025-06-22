
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, Users, Plus, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useLeagueContext } from "@/contexts/LeagueContext";
import { useAppContext } from "@/contexts/AppContext";

const League = () => {
  const { clubs, leagueResults, playerClubRegistrations, addClub, addLeagueResult, registerPlayerToClub } = useLeagueContext();
  const { players } = useAppContext();

  const [newClub, setNewClub] = useState({ name: "", division: "Division 1" as const });
  const [newResult, setNewResult] = useState({
    homeClub: "",
    awayClub: "",
    homeScore: 0,
    awayScore: 0,
    date: "",
    division: "Division 1" as const
  });
  const [playerRegistration, setPlayerRegistration] = useState({
    playerId: "",
    clubId: ""
  });

  const getDivisionClubs = (division: string) => {
    return clubs
      .filter(club => club.division === division)
      .sort((a, b) => b.points - a.points);
  };

  const handleAddClub = () => {
    if (!newClub.name) return;
    addClub(newClub);
    setNewClub({ name: "", division: "Division 1" });
  };

  const handleAddResult = () => {
    if (!newResult.homeClub || !newResult.awayClub || !newResult.date) return;
    addLeagueResult(newResult);
    setNewResult({
      homeClub: "",
      awayClub: "",
      homeScore: 0,
      awayScore: 0,
      date: "",
      division: "Division 1"
    });
  };

  const handleRegisterPlayer = () => {
    if (!playerRegistration.playerId || !playerRegistration.clubId) return;
    const player = players.find(p => p.id === playerRegistration.playerId);
    const club = clubs.find(c => c.id === playerRegistration.clubId);
    if (player && club) {
      registerPlayerToClub(playerRegistration.playerId, playerRegistration.clubId, player.name, club.name);
      setPlayerRegistration({ playerId: "", clubId: "" });
    }
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tables">League Tables</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="clubs">Manage Clubs</TabsTrigger>
            <TabsTrigger value="players">Player Registration</TabsTrigger>
          </TabsList>

          <TabsContent value="tables">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-yellow-600" />
                    Division 1
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Pos</TableHead>
                        <TableHead>Club</TableHead>
                        <TableHead>P</TableHead>
                        <TableHead>Pts</TableHead>
                        <TableHead>GF</TableHead>
                        <TableHead>GA</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getDivisionClubs("Division 1").map((club, index) => (
                        <TableRow key={club.id}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>{club.name}</TableCell>
                          <TableCell>{club.matchesPlayed}</TableCell>
                          <TableCell className="font-bold">{club.points}</TableCell>
                          <TableCell>{club.gamesWon}</TableCell>
                          <TableCell>{club.gamesLost}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-blue-600" />
                    Division 2
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Pos</TableHead>
                        <TableHead>Club</TableHead>
                        <TableHead>P</TableHead>
                        <TableHead>Pts</TableHead>
                        <TableHead>GF</TableHead>
                        <TableHead>GA</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getDivisionClubs("Division 2").map((club, index) => (
                        <TableRow key={club.id}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>{club.name}</TableCell>
                          <TableCell>{club.matchesPlayed}</TableCell>
                          <TableCell className="font-bold">{club.points}</TableCell>
                          <TableCell>{club.gamesWon}</TableCell>
                          <TableCell>{club.gamesLost}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="results">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add Match Result
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Home Club</Label>
                      <Select value={newResult.homeClub} onValueChange={(value) => setNewResult({...newResult, homeClub: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select home club" />
                        </SelectTrigger>
                        <SelectContent>
                          {clubs.map(club => (
                            <SelectItem key={club.id} value={club.name}>{club.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Away Club</Label>
                      <Select value={newResult.awayClub} onValueChange={(value) => setNewResult({...newResult, awayClub: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select away club" />
                        </SelectTrigger>
                        <SelectContent>
                          {clubs.map(club => (
                            <SelectItem key={club.id} value={club.name}>{club.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Home Score</Label>
                      <Input 
                        type="number" 
                        min="0" 
                        max="24"
                        value={newResult.homeScore}
                        onChange={(e) => setNewResult({...newResult, homeScore: parseInt(e.target.value) || 0})}
                      />
                    </div>
                    <div>
                      <Label>Away Score</Label>
                      <Input 
                        type="number" 
                        min="0" 
                        max="24"
                        value={newResult.awayScore}
                        onChange={(e) => setNewResult({...newResult, awayScore: parseInt(e.target.value) || 0})}
                      />
                    </div>
                    <div>
                      <Label>Date</Label>
                      <Input 
                        type="date"
                        value={newResult.date}
                        onChange={(e) => setNewResult({...newResult, date: e.target.value})}
                      />
                    </div>
                  </div>

                  <Button onClick={handleAddResult} className="w-full">
                    Add Result
                  </Button>
                </CardContent>
              </Card>

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
            </div>
          </TabsContent>

          <TabsContent value="clubs">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Add New Club
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Club Name</Label>
                    <Input 
                      value={newClub.name}
                      onChange={(e) => setNewClub({...newClub, name: e.target.value})}
                      placeholder="Enter club name"
                    />
                  </div>
                  <div>
                    <Label>Division</Label>
                    <Select value={newClub.division} onValueChange={(value: "Division 1" | "Division 2") => setNewClub({...newClub, division: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Division 1">Division 1</SelectItem>
                        <SelectItem value="Division 2">Division 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleAddClub} className="w-full">
                  Add Club
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="players">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Register Player to Club
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Player</Label>
                    <Select value={playerRegistration.playerId} onValueChange={(value) => setPlayerRegistration({...playerRegistration, playerId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select player" />
                      </SelectTrigger>
                      <SelectContent>
                        {players.map(player => (
                          <SelectItem key={player.id} value={player.id}>{player.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Club</Label>
                    <Select value={playerRegistration.clubId} onValueChange={(value) => setPlayerRegistration({...playerRegistration, clubId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select club" />
                      </SelectTrigger>
                      <SelectContent>
                        {clubs.map(club => (
                          <SelectItem key={club.id} value={club.id}>{club.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleRegisterPlayer} className="w-full">
                  Register Player
                </Button>

                <div className="mt-6">
                  <h3 className="font-semibold mb-4">Current Registrations</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Player</TableHead>
                        <TableHead>Club</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {playerClubRegistrations.map((reg, index) => (
                        <TableRow key={index}>
                          <TableCell>{reg.playerName}</TableCell>
                          <TableCell>{reg.clubName}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default League;
