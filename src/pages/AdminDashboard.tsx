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
    height: ""
  });

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

    addPlayer(newPlayer);
    console.log("Added player:", newPlayer);
    
    // Reset form
    setNewPlayer({
      name: "",
      country: "",
      category: "",
      age: "",
      height: ""
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
                  <p className="text-sm font-medium text-slate-600">Live Events</p>
                  <p className="text-3xl font-bold text-red-600">{tournaments.filter(t => t.status === 'live').length}</p>
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

          <TabsContent value="league" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>League Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-lg mb-4">Manage league clubs, divisions, and competitions</p>
                  <Link to="/league">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Go to League Management
                    </Button>
                  </Link>
                </div>
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
