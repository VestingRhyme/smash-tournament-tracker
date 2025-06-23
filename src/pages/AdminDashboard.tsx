
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { useLeagueContext } from "@/contexts/LeagueContext";
import { useNavigate } from "react-router-dom";
import MatchForm from "@/components/MatchForm";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { tournaments, players, addTournament: createTournament, addPlayer: createPlayer, deleteTournament, deletePlayer, addMatch } = useAppContext();
  const { clubs, addClub: createClub, deleteClub, addFixture } = useLeagueContext();
  const [newTournament, setNewTournament] = useState({ name: "", location: "", date: "" });
  const [newPlayer, setNewPlayer] = useState({ name: "", country: "", gender: "", age: "", height: "", club: "" });
  const [newClub, setNewClub] = useState({ name: "", division: "", country: "" });
  const [newFixture, setNewFixture] = useState({ homeClub: "", awayClub: "", date: "", location: "", division: "" });

  const handleAddClub = () => {
    if (!newClub.name || !newClub.division || !newClub.country) {
      alert("Please fill in all fields");
      return;
    }

    createClub({
      name: newClub.name,
      division: newClub.division as "Division 1" | "Division 2",
      country: newClub.country,
      points: 0,
      gamesWon: 0,
      gamesLost: 0,
      matchesPlayed: 0,
      matchesWon: 0,
      matchesLost: 0,
      wins: 0,
      losses: 0
    });

    setNewClub({ name: "", division: "", country: "" });
  };

  const handleAddTournament = () => {
    if (!newTournament.name || !newTournament.location || !newTournament.date) {
      alert("Please fill in all fields");
      return;
    }

    createTournament({
      name: newTournament.name,
      location: newTournament.location,
      date: newTournament.date
    });

    setNewTournament({ name: "", location: "", date: "" });
  };

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

  const handleAddFixture = () => {
    if (!newFixture.homeClub || !newFixture.awayClub || !newFixture.date || !newFixture.location || !newFixture.division) {
      alert("Please fill in all fields");
      return;
    }

    addFixture({
      homeClub: newFixture.homeClub,
      awayClub: newFixture.awayClub,
      date: newFixture.date,
      location: newFixture.location,
      division: newFixture.division as "Division 1" | "Division 2"
    });

    setNewFixture({ homeClub: "", awayClub: "", date: "", location: "", division: "" });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tournaments Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Manage Tournaments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="tournamentName">Tournament Name</Label>
                <Input
                  id="tournamentName"
                  value={newTournament.name}
                  onChange={(e) => setNewTournament({ ...newTournament, name: e.target.value })}
                  placeholder="Enter tournament name"
                />
              </div>
              <div>
                <Label htmlFor="tournamentLocation">Location</Label>
                <Input
                  id="tournamentLocation"
                  value={newTournament.location}
                  onChange={(e) => setNewTournament({ ...newTournament, location: e.target.value })}
                  placeholder="Enter location"
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
              <Button onClick={handleAddTournament} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Tournament
              </Button>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Current Tournaments</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {tournaments.map((tournament) => (
                  <div key={tournament.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">{tournament.name}</span>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => navigate(`/admin/tournament/edit/${tournament.id}`)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteTournament(tournament.id)}>
                        <Trash className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
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
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="playerName">Player Name</Label>
                <Input
                  id="playerName"
                  value={newPlayer.name}
                  onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                  placeholder="Enter player name"
                />
              </div>
              <div>
                <Label htmlFor="playerCountry">Country</Label>
                <Input
                  id="playerCountry"
                  value={newPlayer.country}
                  onChange={(e) => setNewPlayer({ ...newPlayer, country: e.target.value })}
                  placeholder="Enter country"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
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
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                  <Select value={newPlayer.club} onValueChange={(value) => setNewPlayer({ ...newPlayer, club: value })}>
                    <SelectTrigger>
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
              </div>
              <Button onClick={handleAddPlayer} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Player
              </Button>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Current Players</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {players.map((player) => (
                  <div key={player.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">{player.name}</span>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => navigate(`/admin/player/edit/${player.id}`)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deletePlayer(player.id)}>
                        <Trash className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
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
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="clubName">Club Name</Label>
                <Input
                  id="clubName"
                  value={newClub.name}
                  onChange={(e) => setNewClub({ ...newClub, name: e.target.value })}
                  placeholder="Enter club name"
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
                  placeholder="Enter country"
                />
              </div>
              <Button onClick={handleAddClub} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Club
              </Button>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Current Clubs</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {clubs.map((club) => (
                  <div key={club.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">{club.name}</span>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteClub(club.id)}>
                        <Trash className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fixtures Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Schedule Fixtures
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="homeClub">Home Club</Label>
                  <Select value={newFixture.homeClub} onValueChange={(value) => setNewFixture({ ...newFixture, homeClub: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select home club" />
                    </SelectTrigger>
                    <SelectContent>
                      {clubs.map((club) => (
                        <SelectItem key={club.id} value={club.name}>
                          {club.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="awayClub">Away Club</Label>
                  <Select value={newFixture.awayClub} onValueChange={(value) => setNewFixture({ ...newFixture, awayClub: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select away club" />
                    </SelectTrigger>
                    <SelectContent>
                      {clubs.map((club) => (
                        <SelectItem key={club.id} value={club.name}>
                          {club.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="fixtureLocation">Match Location</Label>
                <Input
                  id="fixtureLocation"
                  value={newFixture.location}
                  onChange={(e) => setNewFixture({ ...newFixture, location: e.target.value })}
                  placeholder="Enter match location"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fixtureDivision">Division</Label>
                  <Select value={newFixture.division} onValueChange={(value) => setNewFixture({ ...newFixture, division: value })}>
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
                  <Label htmlFor="fixtureDate">Match Date</Label>
                  <Input
                    type="date"
                    id="fixtureDate"
                    value={newFixture.date}
                    onChange={(e) => setNewFixture({ ...newFixture, date: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleAddFixture} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Fixture
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Matches Section - Full Width */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Match Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MatchForm onAddMatch={addMatch} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
