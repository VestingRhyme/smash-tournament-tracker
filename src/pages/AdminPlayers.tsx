
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash, Users, ArrowLeft } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { useLeagueContext } from "@/contexts/LeagueContext";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const AdminPlayers = () => {
  const navigate = useNavigate();
  const { players, addPlayer: createPlayer, deletePlayer } = useAppContext();
  const { clubs } = useLeagueContext();
  const [newPlayer, setNewPlayer] = useState({ name: "", country: "", gender: "", age: "", height: "", club: "" });

  const handleAddPlayer = () => {
    if (!newPlayer.name || !newPlayer.country || !newPlayer.gender) {
      alert("Please fill in all required fields");
      return;
    }

    const playerData = {
      name: newPlayer.name,
      country: newPlayer.country,
      gender: newPlayer.gender,
      age: newPlayer.age,
      height: newPlayer.height,
      club: newPlayer.club
    };

    createPlayer(playerData);
    setNewPlayer({ name: "", country: "", gender: "", age: "", height: "", club: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <Button onClick={() => navigate("/admin")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin Dashboard
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Player Management</h1>
          <p className="text-gray-600">Add and manage players</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add Player Form */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Player
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="playerName" className="text-sm font-medium">Player Name</Label>
                  <Input
                    id="playerName"
                    value={newPlayer.name}
                    onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                    placeholder="Enter player name"
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="playerCountry" className="text-sm font-medium">Country</Label>
                    <Input
                      id="playerCountry"
                      value={newPlayer.country}
                      onChange={(e) => setNewPlayer({ ...newPlayer, country: e.target.value })}
                      placeholder="Country"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="playerGender" className="text-sm font-medium">Gender</Label>
                    <Select value={newPlayer.gender} onValueChange={(value) => setNewPlayer({ ...newPlayer, gender: value })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="boy">Boy</SelectItem>
                        <SelectItem value="girl">Girl</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="playerAge" className="text-sm font-medium">Age</Label>
                    <Input
                      type="number"
                      id="playerAge"
                      value={newPlayer.age}
                      onChange={(e) => setNewPlayer({ ...newPlayer, age: e.target.value })}
                      placeholder="Age"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="playerHeight" className="text-sm font-medium">Height</Label>
                    <Input
                      id="playerHeight"
                      value={newPlayer.height}
                      onChange={(e) => setNewPlayer({ ...newPlayer, height: e.target.value })}
                      placeholder="Height"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="playerClub" className="text-sm font-medium">Club</Label>
                  <Select value={newPlayer.club} onValueChange={(value) => setNewPlayer({ ...newPlayer, club: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select club" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-club">No Club</SelectItem>
                      {clubs.map((club) => (
                        <SelectItem key={club.id} value={club.name}>
                          {club.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddPlayer} className="w-full bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Player
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Players List */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                All Players ({players.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-4">Name</TableHead>
                    <TableHead className="px-4">Country</TableHead>
                    <TableHead className="px-4">Category</TableHead>
                    <TableHead className="px-4">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {players.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                        No players found
                      </TableCell>
                    </TableRow>
                  ) : (
                    players.map((player) => (
                      <TableRow key={player.id} className="hover:bg-gray-50">
                        <TableCell className="px-4 py-3">
                          <div className="font-medium text-sm">{player.name}</div>
                          <div className="text-xs text-gray-500">{player.club || "No Club"}</div>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-sm">{player.country}</TableCell>
                        <TableCell className="px-4 py-3 text-sm">{player.category}</TableCell>
                        <TableCell className="px-4 py-3">
                          <div className="flex gap-1">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => navigate(`/admin/player/edit/${player.id}`)}
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              onClick={() => deletePlayer(player.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Trash className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPlayers;
