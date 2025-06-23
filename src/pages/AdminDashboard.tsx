import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { useLeagueContext } from "@/contexts/LeagueContext";

const AdminDashboard = () => {
  const { tournaments, players, addTournament, addPlayer, deleteTournament, deletePlayer } = useAppContext();
  const { clubs, addClub, deleteClub } = useLeagueContext();
  const [newTournament, setNewTournament] = useState({ name: "", location: "", date: "" });
  const [newPlayer, setNewPlayer] = useState({ name: "", country: "", gender: "", age: "", height: "", club: "" });
  const [newClub, setNewClub] = useState({ name: "", division: "", country: "" });

  const addClub = () => {
    if (!newClub.name || !newClub.division || !newClub.country) {
      alert("Please fill in all fields");
      return;
    }

    addClub({
      name: newClub.name,
      division: newClub.division as "Division 1" | "Division 2",
      country: newClub.country
    });

    setNewClub({ name: "", division: "", country: "" });
  };

  const addTournament = () => {
    if (!newTournament.name || !newTournament.location || !newTournament.date) {
      alert("Please fill in all fields");
      return;
    }

    addTournament({
      name: newTournament.name,
      location: newTournament.location,
      date: newTournament.date
    });

    setNewTournament({ name: "", location: "", date: "" });
  };

  const addPlayer = () => {
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

    addPlayer(playerData);

    setNewPlayer({ name: "", country: "", gender: "", age: "", height: "", club: "" });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tournaments Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Manage Tournaments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-2">Add Tournament</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tournamentName">Name</Label>
                  <Input
                    id="tournamentName"
                    value={newTournament.name}
                    onChange={(e) => setNewTournament({ ...newTournament, name: e.target.value })}
                    placeholder="Tournament Name"
                  />
                </div>
                <div>
                  <Label htmlFor="tournamentLocation">Location</Label>
                  <Input
                    id="tournamentLocation"
                    value={newTournament.location}
                    onChange={(e) => setNewTournament({ ...newTournament, location: e.target.value })}
                    placeholder="Location"
                  />
                </div>
                <div>
                  <Label htmlFor="tournamentDate">Date</Label>
                  <Input
                    type="date"
                    id="tournamentDate"
                    value={newTournament.date}
                    onChange={(e) => setNewTournament({ ...newTournament, date: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={addTournament} className="w-full">
                Add Tournament
              </Button>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Tournaments List</h3>
              <ul>
                {tournaments.map((tournament) => (
                  <li key={tournament.id} className="flex justify-between items-center py-2 border-b">
                    <span>{tournament.name}</span>
                    <div className="space-x-2">
                      <Button size="sm" variant="secondary">
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteTournament(tournament.id)}>
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Players Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Manage Players
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-2">Add Player</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="playerName">Name</Label>
                  <Input
                    id="playerName"
                    value={newPlayer.name}
                    onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                    placeholder="Player Name"
                  />
                </div>
                <div>
                  <Label htmlFor="playerCountry">Country</Label>
                  <Input
                    id="playerCountry"
                    value={newPlayer.country}
                    onChange={(e) => setNewPlayer({ ...newPlayer, country: e.target.value })}
                    placeholder="Country"
                  />
                </div>
                <div>
                  <Label htmlFor="playerGender">Gender</Label>
                  <Select value={newPlayer.gender} onValueChange={(value) => setNewPlayer({ ...newPlayer, gender: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="boy">Boy</SelectItem>
                      <SelectItem value="girl">Girl</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="playerAge">Age</Label>
                  <Input
                    type="number"
                    id="playerAge"
                    value={newPlayer.age}
                    onChange={(e) => setNewPlayer({ ...newPlayer, age: e.target.value })}
                    placeholder="Age"
                  />
                </div>
                <div>
                  <Label htmlFor="playerHeight">Height</Label>
                  <Input
                    id="playerHeight"
                    value={newPlayer.height}
                    onChange={(e) => setNewPlayer({ ...newPlayer, height: e.target.value })}
                    placeholder="Height"
                  />
                </div>
                <div>
                  <Label htmlFor="playerClub">Club</Label>
                  <Input
                    id="playerClub"
                    value={newPlayer.club}
                    onChange={(e) => setNewPlayer({ ...newPlayer, club: e.target.value })}
                    placeholder="Club"
                  />
                </div>
              </div>
              <Button onClick={addPlayer} className="w-full">
                Add Player
              </Button>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Players List</h3>
              <ul>
                {players.map((player) => (
                  <li key={player.id} className="flex justify-between items-center py-2 border-b">
                    <span>{player.name}</span>
                    <div className="space-x-2">
                      <Button size="sm" variant="secondary">
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deletePlayer(player.id)}>
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Clubs Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Manage Clubs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-2">Add Club</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clubName">Name</Label>
                  <Input
                    id="clubName"
                    value={newClub.name}
                    onChange={(e) => setNewClub({ ...newClub, name: e.target.value })}
                    placeholder="Club Name"
                  />
                </div>
                <div>
                  <Label htmlFor="clubDivision">Division</Label>
                  <Select value={newClub.division} onValueChange={(value) => setNewClub({ ...newClub, division: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select division" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Division 1">Division 1</SelectItem>
                      <SelectItem value="Division 2">Division 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="clubCountry">Country</Label>
                  <Input
                    id="clubCountry"
                    value={newClub.country}
                    onChange={(e) => setNewClub({ ...newClub, country: e.target.value })}
                    placeholder="Country"
                  />
                </div>
              </div>
              <Button onClick={addClub} className="w-full">
                Add Club
              </Button>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Clubs List</h3>
              <ul>
                {clubs.map((club) => (
                  <li key={club.id} className="flex justify-between items-center py-2 border-b">
                    <span>{club.name}</span>
                    <div className="space-x-2">
                      <Button size="sm" variant="secondary">
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteClub(club.id)}>
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
