
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus, Users, Trophy, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/contexts/AppContext";
import { useLeagueContext } from "@/contexts/LeagueContext";

const AdminDashboard = () => {
  const { tournaments, players, matches, addTournament, addPlayer, addMatch, deleteTournament, deletePlayer } = useAppContext();
  const { clubs, addClub, updateClub, addLeagueResult } = useLeagueContext();
  
  const [newTournament, setNewTournament] = useState({ name: "", location: "", date: "", prize: "" });
  const [newPlayer, setNewPlayer] = useState({ 
    name: "", 
    country: "", 
    gender: "boy", 
    age: "", 
    height: "", 
    clubId: "" 
  });
  const [newMatch, setNewMatch] = useState({ player1: "", player2: "", tournament: "", category: "", score: "", date: "" });
  const [newClub, setNewClub] = useState({ name: "", division: "Division 1" as "Division 1" | "Division 2" });
  const [newLeagueResult, setNewLeagueResult] = useState({
    homeClub: "",
    awayClub: "",
    homeScore: "",
    awayScore: "",
    date: "",
    division: "Division 1" as "Division 1" | "Division 2"
  });
  const [editingClub, setEditingClub] = useState<any>(null);
  const [isEditClubOpen, setIsEditClubOpen] = useState(false);

  const handleAddTournament = () => {
    if (newTournament.name && newTournament.location && newTournament.date) {
      addTournament(newTournament);
      setNewTournament({ name: "", location: "", date: "", prize: "" });
      console.log("Tournament added successfully");
    }
  };

  const handleAddPlayer = () => {
    if (newPlayer.name && newPlayer.country && newPlayer.gender) {
      const categories = newPlayer.gender === "boy" 
        ? ["Men's Doubles", "Mixed Doubles"]
        : ["Women's Doubles", "Mixed Doubles"];
      
      // Add player for each category
      categories.forEach(category => {
        const playerData = {
          ...newPlayer,
          category,
          age: parseInt(newPlayer.age) || 25,
          country: newPlayer.clubId ? clubs.find(c => c.id === newPlayer.clubId)?.name || newPlayer.country : newPlayer.country
        };
        addPlayer(playerData);
      });
      
      setNewPlayer({ name: "", country: "", gender: "boy", age: "", height: "", clubId: "" });
      console.log("Player added successfully");
    }
  };

  const handleAddMatch = () => {
    if (newMatch.player1 && newMatch.player2 && newMatch.tournament && newMatch.category) {
      addMatch(newMatch);
      setNewMatch({ player1: "", player2: "", tournament: "", category: "", score: "", date: "" });
      console.log("Match added successfully");
    }
  };

  const handleAddClub = () => {
    if (newClub.name && newClub.division) {
      addClub(newClub);
      setNewClub({ name: "", division: "Division 1" });
      console.log("Club added successfully");
    }
  };

  const handleAddLeagueResult = () => {
    if (newLeagueResult.homeClub && newLeagueResult.awayClub && newLeagueResult.homeScore && newLeagueResult.awayScore) {
      addLeagueResult({
        ...newLeagueResult,
        homeScore: parseInt(newLeagueResult.homeScore),
        awayScore: parseInt(newLeagueResult.awayScore)
      });
      setNewLeagueResult({
        homeClub: "",
        awayClub: "",
        homeScore: "",
        awayScore: "",
        date: "",
        division: "Division 1"
      });
      console.log("League result added successfully");
    }
  };

  const handleEditClub = (club: any) => {
    setEditingClub({ ...club });
    setIsEditClubOpen(true);
  };

  const handleSaveClub = () => {
    if (editingClub) {
      updateClub(editingClub.id, editingClub);
      setIsEditClubOpen(false);
      setEditingClub(null);
      console.log("Club updated successfully");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">Admin Dashboard</h1>
        
        <Tabs defaultValue="tournaments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
            <TabsTrigger value="players">Players</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="clubs">Clubs</TabsTrigger>
            <TabsTrigger value="league-results">League Results</TabsTrigger>
          </TabsList>

          {/* Tournaments Tab */}
          <TabsContent value="tournaments">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add New Tournament
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="tournament-name">Tournament Name</Label>
                    <Input 
                      id="tournament-name"
                      value={newTournament.name}
                      onChange={(e) => setNewTournament({...newTournament, name: e.target.value})}
                      placeholder="e.g., BWF World Championships"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tournament-location">Location</Label>
                    <Input 
                      id="tournament-location"
                      value={newTournament.location}
                      onChange={(e) => setNewTournament({...newTournament, location: e.target.value})}
                      placeholder="e.g., Tokyo, Japan"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tournament-date">Date</Label>
                    <Input 
                      id="tournament-date"
                      type="date"
                      value={newTournament.date}
                      onChange={(e) => setNewTournament({...newTournament, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tournament-prize">Prize Pool</Label>
                    <Input 
                      id="tournament-prize"
                      value={newTournament.prize}
                      onChange={(e) => setNewTournament({...newTournament, prize: e.target.value})}
                      placeholder="e.g., $500,000"
                    />
                  </div>
                  <Button onClick={handleAddTournament} className="w-full">
                    Add Tournament
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Existing Tournaments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {tournaments.map((tournament) => (
                      <div key={tournament.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <h4 className="font-medium">{tournament.name}</h4>
                          <p className="text-sm text-slate-600">{tournament.location} • {tournament.date}</p>
                        </div>
                        <div className="flex gap-2">
                          <Link to={`/admin/tournament/edit/${tournament.id}`}>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => deleteTournament(tournament.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Players Tab */}
          <TabsContent value="players">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add New Player
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="player-name">Player Name</Label>
                    <Input 
                      id="player-name"
                      value={newPlayer.name}
                      onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
                      placeholder="e.g., Viktor Axelsen"
                    />
                  </div>
                  <div>
                    <Label htmlFor="player-country">Country</Label>
                    <Input 
                      id="player-country"
                      value={newPlayer.country}
                      onChange={(e) => setNewPlayer({...newPlayer, country: e.target.value})}
                      placeholder="e.g., Denmark"
                    />
                  </div>
                  <div>
                    <Label htmlFor="player-gender">Gender</Label>
                    <Select value={newPlayer.gender} onValueChange={(value) => setNewPlayer({...newPlayer, gender: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="boy">Boy</SelectItem>
                        <SelectItem value="girl">Girl</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="player-club">Club (Optional)</Label>
                    <Select value={newPlayer.clubId} onValueChange={(value) => setNewPlayer({...newPlayer, clubId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a club (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No Club</SelectItem>
                        {clubs.map((club) => (
                          <SelectItem key={club.id} value={club.id}>{club.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="player-age">Age</Label>
                      <Input 
                        id="player-age"
                        type="number"
                        value={newPlayer.age}
                        onChange={(e) => setNewPlayer({...newPlayer, age: e.target.value})}
                        placeholder="25"
                      />
                    </div>
                    <div>
                      <Label htmlFor="player-height">Height</Label>
                      <Input 
                        id="player-height"
                        value={newPlayer.height}
                        onChange={(e) => setNewPlayer({...newPlayer, height: e.target.value})}
                        placeholder="175cm"
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddPlayer} className="w-full">
                    Add Player
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Existing Players
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {players.map((player) => (
                      <div key={player.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <h4 className="font-medium">{player.name}</h4>
                          <p className="text-sm text-slate-600">{player.country} • {player.category}</p>
                        </div>
                        <div className="flex gap-2">
                          <Link to={`/admin/player/edit/${player.id}`}>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => deletePlayer(player.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Matches Tab */}
          <TabsContent value="matches">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add New Match
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="match-player1">Player 1</Label>
                    <Input 
                      id="match-player1"
                      value={newMatch.player1}
                      onChange={(e) => setNewMatch({...newMatch, player1: e.target.value})}
                      placeholder="e.g., Viktor Axelsen"
                    />
                  </div>
                  <div>
                    <Label htmlFor="match-player2">Player 2</Label>
                    <Input 
                      id="match-player2"
                      value={newMatch.player2}
                      onChange={(e) => setNewMatch({...newMatch, player2: e.target.value})}
                      placeholder="e.g., Kento Momota"
                    />
                  </div>
                  <div>
                    <Label htmlFor="match-tournament">Tournament</Label>
                    <Select value={newMatch.tournament} onValueChange={(value) => setNewMatch({...newMatch, tournament: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tournament" />
                      </SelectTrigger>
                      <SelectContent>
                        {tournaments.map((tournament) => (
                          <SelectItem key={tournament.id} value={tournament.name}>{tournament.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="match-category">Category</Label>
                    <Select value={newMatch.category} onValueChange={(value) => setNewMatch({...newMatch, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Men's Doubles">Men's Doubles</SelectItem>
                        <SelectItem value="Women's Doubles">Women's Doubles</SelectItem>
                        <SelectItem value="Mixed Doubles">Mixed Doubles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="match-score">Score</Label>
                    <Input 
                      id="match-score"
                      value={newMatch.score}
                      onChange={(e) => setNewMatch({...newMatch, score: e.target.value})}
                      placeholder="e.g., 21-15, 21-18"
                    />
                  </div>
                  <div>
                    <Label htmlFor="match-date">Date</Label>
                    <Input 
                      id="match-date"
                      type="date"
                      value={newMatch.date}
                      onChange={(e) => setNewMatch({...newMatch, date: e.target.value})}
                    />
                  </div>
                  <Button onClick={handleAddMatch} className="w-full">
                    Add Match
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Matches</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {matches.slice(-10).map((match) => (
                      <div key={match.id} className="p-3 border rounded">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{match.player1} vs {match.player2}</p>
                            <p className="text-sm text-slate-600">{match.tournament}</p>
                            <Badge variant="outline" className="mt-1">{match.category}</Badge>
                          </div>
                          <div className="text-right">
                            <p className="font-mono text-sm">{match.score || "TBD"}</p>
                            <p className="text-xs text-slate-500">{match.date || "Not set"}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Clubs Tab */}
          <TabsContent value="clubs">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add New Club
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="club-name">Club Name</Label>
                    <Input 
                      id="club-name"
                      value={newClub.name}
                      onChange={(e) => setNewClub({...newClub, name: e.target.value})}
                      placeholder="e.g., Badminton Elite"
                    />
                  </div>
                  <div>
                    <Label htmlFor="club-division">Division</Label>
                    <Select value={newClub.division} onValueChange={(value) => setNewClub({...newClub, division: value as "Division 1" | "Division 2"})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Division 1">Division 1</SelectItem>
                        <SelectItem value="Division 2">Division 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddClub} className="w-full">
                    Add Club
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Existing Clubs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {clubs.map((club) => (
                      <div key={club.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <h4 className="font-medium">{club.name}</h4>
                          <p className="text-sm text-slate-600">{club.division}</p>
                          <Badge variant="outline" className="mt-1">{club.points} points</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditClub(club)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* League Results Tab */}
          <TabsContent value="league-results">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Add League Result
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="home-club">Home Club</Label>
                    <Select value={newLeagueResult.homeClub} onValueChange={(value) => setNewLeagueResult({...newLeagueResult, homeClub: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select home club" />
                      </SelectTrigger>
                      <SelectContent>
                        {clubs.map((club) => (
                          <SelectItem key={club.id} value={club.name}>{club.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="away-club">Away Club</Label>
                    <Select value={newLeagueResult.awayClub} onValueChange={(value) => setNewLeagueResult({...newLeagueResult, awayClub: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select away club" />
                      </SelectTrigger>
                      <SelectContent>
                        {clubs.map((club) => (
                          <SelectItem key={club.id} value={club.name}>{club.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="home-score">Home Score</Label>
                    <Input 
                      id="home-score"
                      type="number"
                      value={newLeagueResult.homeScore}
                      onChange={(e) => setNewLeagueResult({...newLeagueResult, homeScore: e.target.value})}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="away-score">Away Score</Label>
                    <Input 
                      id="away-score"
                      type="number"
                      value={newLeagueResult.awayScore}
                      onChange={(e) => setNewLeagueResult({...newLeagueResult, awayScore: e.target.value})}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="result-division">Division</Label>
                    <Select value={newLeagueResult.division} onValueChange={(value) => setNewLeagueResult({...newLeagueResult, division: value as "Division 1" | "Division 2"})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Division 1">Division 1</SelectItem>
                        <SelectItem value="Division 2">Division 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="result-date">Date</Label>
                    <Input 
                      id="result-date"
                      type="date"
                      value={newLeagueResult.date}
                      onChange={(e) => setNewLeagueResult({...newLeagueResult, date: e.target.value})}
                    />
                  </div>
                </div>
                <Button onClick={handleAddLeagueResult} className="w-full">
                  Add League Result
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Club Dialog */}
        <Dialog open={isEditClubOpen} onOpenChange={setIsEditClubOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Club</DialogTitle>
            </DialogHeader>
            {editingClub && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-club-name">Club Name</Label>
                  <Input 
                    id="edit-club-name"
                    value={editingClub.name}
                    onChange={(e) => setEditingClub({...editingClub, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-club-division">Division</Label>
                  <Select value={editingClub.division} onValueChange={(value) => setEditingClub({...editingClub, division: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Division 1">Division 1</SelectItem>
                      <SelectItem value="Division 2">Division 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-club-location">Location</Label>
                  <Input 
                    id="edit-club-location"
                    value={editingClub.location || ""}
                    onChange={(e) => setEditingClub({...editingClub, location: e.target.value})}
                    placeholder="e.g., London, UK"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-club-founded">Founded</Label>
                  <Input 
                    id="edit-club-founded"
                    value={editingClub.founded || ""}
                    onChange={(e) => setEditingClub({...editingClub, founded: e.target.value})}
                    placeholder="e.g., 1990"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-club-description">Description</Label>
                  <Input 
                    id="edit-club-description"
                    value={editingClub.description || ""}
                    onChange={(e) => setEditingClub({...editingClub, description: e.target.value})}
                    placeholder="Club description..."
                  />
                </div>
                <Button onClick={handleSaveClub} className="w-full">
                  Save Changes
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;
