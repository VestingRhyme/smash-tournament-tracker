import { useState } from "react";
import { Plus, Users, Trophy, Calendar, Settings, BarChart3, Edit, Eye, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MatchForm from "@/components/MatchForm";
import { useAppContext } from "@/contexts/AppContext";
import { useLeagueContext } from "@/contexts/LeagueContext";

const AdminDashboard = () => {
  const { 
    tournaments, 
    players, 
    matches, 
    addTournament, 
    addPlayer, 
    addMatch, 
    deleteTournament, 
    deletePlayer 
  } = useAppContext();
  
  const { clubs, addClub, updateClub, addLeagueResult, registerPlayerToClub } = useLeagueContext();
  
  const [newTournament, setNewTournament] = useState({
    name: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    prizePool: "",
    format: "knockout"
  });

  const [newPlayer, setNewPlayer] = useState({
    name: "",
    country: "",
    category: "",
    age: "",
    height: "",
    clubId: ""
  });

  const [newClub, setNewClub] = useState({
    name: "",
    division: "Division 1" as "Division 1" | "Division 2",
    location: "",
    founded: "",
    description: ""
  });

  const [newResult, setNewResult] = useState({
    homeClub: "",
    awayClub: "",
    homeScore: 0,
    awayScore: 0,
    date: "",
    division: "Division 1" as "Division 1" | "Division 2"
  });

  const [editingClub, setEditingClub] = useState<any>(null);

  const handleCreateTournament = () => {
    if (!newTournament.name || !newTournament.location) {
      alert("Please fill in required fields");
      return;
    }

    addTournament(newTournament);
    console.log("Created tournament:", newTournament);
    
    // Reset form
    setNewTournament({
      name: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      prizePool: "",
      format: "knockout"
    });
  };

  const handleAddPlayer = () => {
    if (!newPlayer.name || !newPlayer.country || !newPlayer.category) {
      alert("Please fill in required fields");
      return;
    }

    const addedPlayer = addPlayer(newPlayer);
    console.log("Added player:", newPlayer);
    
    // If a club is selected, register the player to the club
    if (newPlayer.clubId && addedPlayer) {
      const selectedClub = clubs.find(c => c.id === newPlayer.clubId);
      if (selectedClub) {
        registerPlayerToClub(addedPlayer.id, newPlayer.clubId, newPlayer.name, selectedClub.name);
      }
    }
    
    // Reset form
    setNewPlayer({
      name: "",
      country: "",
      category: "",
      age: "",
      height: "",
      clubId: ""
    });
  };

  const handleAddMatch = (match: any) => {
    addMatch(match);
    console.log("Added match:", match);
  };

  const handleDeleteTournament = (id: string) => {
    if (confirm("Are you sure you want to delete this tournament?")) {
      deleteTournament(id);
    }
  };

  const handleDeletePlayer = (id: string) => {
    if (confirm("Are you sure you want to delete this player?")) {
      deletePlayer(id);
    }
  };

  const handleAddClub = () => {
    if (!newClub.name) {
      alert("Please fill in required fields");
      return;
    }

    addClub(newClub);
    console.log("Created club:", newClub);
    
    setNewClub({
      name: "",
      division: "Division 1",
      location: "",
      founded: "",
      description: ""
    });
  };

  const handleEditClub = (club: any) => {
    setEditingClub(club);
  };

  const handleUpdateClub = () => {
    if (!editingClub) return;
    
    updateClub(editingClub.id, editingClub);
    setEditingClub(null);
  };

  const handleAddResult = () => {
    if (!newResult.homeClub || !newResult.awayClub || !newResult.date) {
      alert("Please fill in required fields");
      return;
    }

    addLeagueResult(newResult);
    console.log("Added result:", newResult);
    
    setNewResult({
      homeClub: "",
      awayClub: "",
      homeScore: 0,
      awayScore: 0,
      date: "",
      division: "Division 1"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Admin Dashboard</h1>
          <p className="text-lg text-slate-600">Manage tournaments, players, and events</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Tournaments</p>
                  <p className="text-3xl font-bold text-blue-600">{tournaments.length}</p>
                </div>
                <Trophy className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Players</p>
                  <p className="text-3xl font-bold text-green-600">{players.length}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Matches</p>
                  <p className="text-3xl font-bold text-purple-600">{matches.length}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Clubs</p>
                  <p className="text-3xl font-bold text-red-600">{clubs.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tournaments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
            <TabsTrigger value="players">Players</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="league">League</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="tournaments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Create Tournament Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Create New Tournament
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Tournament Name *</Label>
                    <Input 
                      id="name"
                      value={newTournament.name}
                      onChange={(e) => setNewTournament({...newTournament, name: e.target.value})}
                      placeholder="Enter tournament name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input 
                      id="location"
                      value={newTournament.location}
                      onChange={(e) => setNewTournament({...newTournament, location: e.target.value})}
                      placeholder="Enter venue location"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input 
                        id="startDate"
                        type="date"
                        value={newTournament.startDate}
                        onChange={(e) => setNewTournament({...newTournament, startDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input 
                        id="endDate"
                        type="date"
                        value={newTournament.endDate}
                        onChange={(e) => setNewTournament({...newTournament, endDate: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="format">Tournament Format</Label>
                    <Select value={newTournament.format} onValueChange={(value) => setNewTournament({...newTournament, format: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="knockout">Knockout</SelectItem>
                        <SelectItem value="round-robin">Round Robin</SelectItem>
                        <SelectItem value="swiss">Swiss System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="prizePool">Prize Pool</Label>
                    <Input 
                      id="prizePool"
                      value={newTournament.prizePool}
                      onChange={(e) => setNewTournament({...newTournament, prizePool: e.target.value})}
                      placeholder="e.g., $100,000"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description"
                      value={newTournament.description}
                      onChange={(e) => setNewTournament({...newTournament, description: e.target.value})}
                      placeholder="Tournament description"
                      rows={3}
                    />
                  </div>
                  
                  <Button onClick={handleCreateTournament} className="w-full">
                    Create Tournament
                  </Button>
                </CardContent>
              </Card>

              {/* Existing Tournaments */}
              <Card>
                <CardHeader>
                  <CardTitle>Manage Tournaments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tournaments.map((tournament) => (
                      <div key={tournament.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{tournament.name}</h4>
                          <p className="text-sm text-slate-600">{tournament.location}</p>
                          <Badge className={
                            tournament.status === 'live' ? 'bg-red-500' :
                            tournament.status === 'upcoming' ? 'bg-blue-500' : 'bg-gray-500'
                          }>
                            {tournament.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Link to={`/admin/tournament/edit/${tournament.id}`}>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link to={`/tournament/${tournament.id}`}>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleDeleteTournament(tournament.id)}
                            className="text-red-600 hover:text-red-700"
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

          <TabsContent value="players" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Add Player Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add New Player
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="playerName">Player Name *</Label>
                    <Input 
                      id="playerName"
                      value={newPlayer.name}
                      onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
                      placeholder="Enter player name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="playerCountry">Country *</Label>
                    <Input 
                      id="playerCountry"
                      value={newPlayer.country}
                      onChange={(e) => setNewPlayer({...newPlayer, country: e.target.value})}
                      placeholder="Enter country"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="playerCategory">Category *</Label>
                    <Select value={newPlayer.category} onValueChange={(value) => setNewPlayer({...newPlayer, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Men's Singles">Men's Singles</SelectItem>
                        <SelectItem value="Women's Singles">Women's Singles</SelectItem>
                        <SelectItem value="Men's Doubles">Men's Doubles</SelectItem>
                        <SelectItem value="Women's Doubles">Women's Doubles</SelectItem>
                        <SelectItem value="Mixed Doubles">Mixed Doubles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="playerClub">Club (Optional)</Label>
                    <Select value={newPlayer.clubId} onValueChange={(value) => setNewPlayer({...newPlayer, clubId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select club" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No club</SelectItem>
                        {clubs.map(club => (
                          <SelectItem key={club.id} value={club.id}>{club.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="playerAge">Age</Label>
                      <Input 
                        id="playerAge"
                        type="number"
                        value={newPlayer.age}
                        onChange={(e) => setNewPlayer({...newPlayer, age: e.target.value})}
                        placeholder="Age"
                      />
                    </div>
                    <div>
                      <Label htmlFor="playerHeight">Height</Label>
                      <Input 
                        id="playerHeight"
                        value={newPlayer.height}
                        onChange={(e) => setNewPlayer({...newPlayer, height: e.target.value})}
                        placeholder="e.g., 1.75m"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleAddPlayer} className="w-full">
                    Add Player
                  </Button>
                </CardContent>
              </Card>

              {/* Existing Players */}
              <Card>
                <CardHeader>
                  <CardTitle>Manage Players</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Player</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {players.slice(0, 6).map((player) => (
                        <TableRow key={player.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{player.name}</div>
                              <div className="text-sm text-slate-600">{player.country}</div>
                            </div>
                          </TableCell>
                          <TableCell>{player.category}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Link to={`/admin/player/edit/${player.id}`}>
                                <Button size="sm" variant="outline">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Link to={`/player/${player.id}`}>
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleDeletePlayer(player.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="matches" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <MatchForm onAddMatch={handleAddMatch} />

              {/* Existing Matches */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Matches</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Match</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {matches.map((match) => (
                        <TableRow key={match.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{match.player1} vs {match.player2}</div>
                              <div className="text-sm text-slate-600">{match.tournament}</div>
                            </div>
                          </TableCell>
                          <TableCell>{match.category}</TableCell>
                          <TableCell>
                            <Badge className={
                              match.status === 'live' ? 'bg-red-500' :
                              match.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                            }>
                              {match.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="league" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Add/Edit Club Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    {editingClub ? 'Edit Club' : 'Add New Club'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Club Name *</Label>
                    <Input 
                      value={editingClub ? editingClub.name : newClub.name}
                      onChange={(e) => editingClub ? 
                        setEditingClub({...editingClub, name: e.target.value}) :
                        setNewClub({...newClub, name: e.target.value})
                      }
                      placeholder="Enter club name"
                    />
                  </div>
                  
                  <div>
                    <Label>Division</Label>
                    <Select 
                      value={editingClub ? editingClub.division : newClub.division} 
                      onValueChange={(value: "Division 1" | "Division 2") => editingClub ?
                        setEditingClub({...editingClub, division: value}) :
                        setNewClub({...newClub, division: value})
                      }
                    >
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
                    <Label>Location</Label>
                    <Input 
                      value={editingClub ? editingClub.location || '' : newClub.location}
                      onChange={(e) => editingClub ?
                        setEditingClub({...editingClub, location: e.target.value}) :
                        setNewClub({...newClub, location: e.target.value})
                      }
                      placeholder="Club location"
                    />
                  </div>

                  <div>
                    <Label>Founded</Label>
                    <Input 
                      value={editingClub ? editingClub.founded || '' : newClub.founded}
                      onChange={(e) => editingClub ?
                        setEditingClub({...editingClub, founded: e.target.value}) :
                        setNewClub({...newClub, founded: e.target.value})
                      }
                      placeholder="Year founded"
                    />
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea 
                      value={editingClub ? editingClub.description || '' : newClub.description}
                      onChange={(e) => editingClub ?
                        setEditingClub({...editingClub, description: e.target.value}) :
                        setNewClub({...newClub, description: e.target.value})
                      }
                      placeholder="Club description"
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={editingClub ? handleUpdateClub : handleAddClub} className="flex-1">
                      {editingClub ? 'Update Club' : 'Add Club'}
                    </Button>
                    {editingClub && (
                      <Button variant="outline" onClick={() => setEditingClub(null)}>
                        Cancel
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Manage Clubs */}
              <Card>
                <CardHeader>
                  <CardTitle>Manage Clubs</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Club</TableHead>
                        <TableHead>Division</TableHead>
                        <TableHead>Points</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clubs.map((club) => (
                        <TableRow key={club.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{club.name}</div>
                              <div className="text-sm text-slate-600">{club.location}</div>
                            </div>
                          </TableCell>
                          <TableCell>{club.division}</TableCell>
                          <TableCell className="font-bold">{club.points}</TableCell>
                          <TableCell>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditClub(club)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Add Match Result */}
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
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-500">
                  <Settings className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>System configuration and preferences</p>
                  <p className="text-sm">Manage system settings and preferences</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
