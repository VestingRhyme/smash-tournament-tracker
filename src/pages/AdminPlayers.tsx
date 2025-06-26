
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/contexts/AppContext";
import { useLeagueContext } from "@/contexts/LeagueContext";

const AdminPlayers = () => {
  const { players, addPlayer, deletePlayer } = useAppContext();
  const { clubs } = useLeagueContext();
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    gender: "",
    club: "",
    team: ""
  });

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayer.name || !newPlayer.gender) {
      alert("Please fill in required fields");
      return;
    }
    
    addPlayer({
      ...newPlayer,
      club: newPlayer.team || newPlayer.club // Use team if selected, otherwise use club
    });
    setNewPlayer({ name: "", gender: "", club: "", team: "" });
  };

  // Get teams for selected club
  const selectedClub = clubs.find(club => club.name === newPlayer.club);
  const availableTeams = selectedClub?.teams || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Player Management</h1>
          <p className="text-lg text-slate-600">Add, edit, and manage player profiles</p>
        </div>

        {/* Add Player Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Player</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddPlayer} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Player Name"
                value={newPlayer.name}
                onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                required
              />
              <Select value={newPlayer.gender} onValueChange={(value) => setNewPlayer({ ...newPlayer, gender: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="boy">Male</SelectItem>
                  <SelectItem value="girl">Female</SelectItem>
                </SelectContent>
              </Select>
              <Select 
                value={newPlayer.club} 
                onValueChange={(value) => setNewPlayer({ ...newPlayer, club: value, team: "" })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Club" />
                </SelectTrigger>
                <SelectContent>
                  {clubs.map((club) => (
                    <SelectItem key={club.id} value={club.name}>{club.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select 
                value={newPlayer.team} 
                onValueChange={(value) => setNewPlayer({ ...newPlayer, team: value })}
                disabled={!newPlayer.club}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Team" />
                </SelectTrigger>
                <SelectContent>
                  {availableTeams.map((team) => (
                    <SelectItem key={team.id} value={team.name}>{team.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="md:col-span-2">
                <Button type="submit" className="w-full">Add Player</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Players List */}
        <Card>
          <CardHeader>
            <CardTitle>Current Players</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Categories</TableHead>
                  <TableHead>Club/Team</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {players.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell className="font-medium">{player.name}</TableCell>
                    <TableCell>{player.gender}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {(player.categories || []).map((cat, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{player.club || "No club"}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link to={`/admin/player/edit/${player.id}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => deletePlayer(player.id)}
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
    </div>
  );
};

export default AdminPlayers;
