
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useLeagueContext } from "@/contexts/LeagueContext";

const AdminClubs = () => {
  const { clubs, addClub, deleteClub } = useLeagueContext();
  const [newClub, setNewClub] = useState({
    name: "",
    division: "Division 1" as "Division 1" | "Division 2",
    country: "",
    location: "",
    founded: "",
    description: "",
    teams: ["A Team"]
  });
  const [editingClub, setEditingClub] = useState<any>(null);

  const handleAddClub = (e: React.FormEvent) => {
    e.preventDefault();
    addClub({
      ...newClub,
      points: 0,
      gamesWon: 0,
      gamesLost: 0,
      matchesPlayed: 0,
      matchesWon: 0,
      matchesLost: 0
    });
    setNewClub({
      name: "",
      division: "Division 1",
      country: "",
      location: "",
      founded: "",
      description: "",
      teams: ["A Team"]
    });
  };

  const addTeam = () => {
    const teamLetter = String.fromCharCode(65 + newClub.teams.length); // A, B, C, etc.
    setNewClub({
      ...newClub,
      teams: [...newClub.teams, `${teamLetter} Team`]
    });
  };

  const removeTeam = (index: number) => {
    if (newClub.teams.length > 1) {
      setNewClub({
        ...newClub,
        teams: newClub.teams.filter((_, i) => i !== index)
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Club Management</h1>
          <p className="text-lg text-slate-600">Add, edit, and manage club profiles</p>
        </div>

        {/* Add Club Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Club</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddClub} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Club Name"
                  value={newClub.name}
                  onChange={(e) => setNewClub({ ...newClub, name: e.target.value })}
                  required
                />
                <Select value={newClub.division} onValueChange={(value: "Division 1" | "Division 2") => setNewClub({ ...newClub, division: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Division" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Division 1">Division 1</SelectItem>
                    <SelectItem value="Division 2">Division 2</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Country"
                  value={newClub.country}
                  onChange={(e) => setNewClub({ ...newClub, country: e.target.value })}
                  required
                />
                <Input
                  placeholder="Location"
                  value={newClub.location}
                  onChange={(e) => setNewClub({ ...newClub, location: e.target.value })}
                />
                <Input
                  placeholder="Founded Year"
                  value={newClub.founded}
                  onChange={(e) => setNewClub({ ...newClub, founded: e.target.value })}
                />
              </div>
              
              <Textarea
                placeholder="Club Description"
                value={newClub.description}
                onChange={(e) => setNewClub({ ...newClub, description: e.target.value })}
                rows={3}
              />

              {/* Teams Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Teams</h4>
                  <Button type="button" onClick={addTeam} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Team
                  </Button>
                </div>
                <div className="space-y-2">
                  {newClub.teams.map((team, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={team}
                        onChange={(e) => {
                          const updatedTeams = [...newClub.teams];
                          updatedTeams[index] = e.target.value;
                          setNewClub({ ...newClub, teams: updatedTeams });
                        }}
                        placeholder="Team Name"
                      />
                      {newClub.teams.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeTeam(index)}
                          size="sm"
                          variant="destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full">Add Club</Button>
            </form>
          </CardContent>
        </Card>

        {/* Clubs List */}
        <Card>
          <CardHeader>
            <CardTitle>Current Clubs</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Division</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clubs.map((club) => (
                  <TableRow key={club.id}>
                    <TableCell className="font-medium">
                      <Link to={`/club/${club.id}`} className="text-blue-600 hover:underline">
                        {club.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{club.division}</Badge>
                    </TableCell>
                    <TableCell>{club.country}</TableCell>
                    <TableCell>{club.points}</TableCell>
                    <TableCell>{club.location || "Not specified"}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => deleteClub(club.id)}
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

export default AdminClubs;
