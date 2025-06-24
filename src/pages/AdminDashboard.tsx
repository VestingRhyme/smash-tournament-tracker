
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash, Calendar, MapPin, Clock } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { useLeagueContext } from "@/contexts/LeagueContext";
import { useNavigate } from "react-router-dom";
import MatchForm from "@/components/MatchForm";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { tournaments, players, addTournament: createTournament, addPlayer: createPlayer, deleteTournament, deletePlayer, addMatch } = useAppContext();
  const { clubs, fixtures, addClub: createClub, deleteClub, addFixture } = useLeagueContext();
  const [newTournament, setNewTournament] = useState({ name: "", location: "", date: "" });
  const [newPlayer, setNewPlayer] = useState({ name: "", country: "", gender: "", age: "", height: "", club: "" });
  const [newClub, setNewClub] = useState({ name: "", division: "", country: "" });
  const [newFixture, setNewFixture] = useState({ homeClub: "", awayClub: "", date: "", location: "", division: "" });

  // Separate upcoming and past fixtures
  const today = new Date().toISOString().split('T')[0];
  const upcomingFixtures = fixtures.filter(fixture => fixture.date >= today && fixture.status === "scheduled");
  const pastFixtures = fixtures.filter(fixture => fixture.date < today || fixture.status === "completed");

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage tournaments, players, clubs, and fixtures</p>
        </div>

        {/* Main Management Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {/* Tournaments */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Tournaments
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="tournamentName" className="text-sm font-medium">Tournament Name</Label>
                  <Input
                    id="tournamentName"
                    value={newTournament.name}
                    onChange={(e) => setNewTournament({ ...newTournament, name: e.target.value })}
                    placeholder="Enter tournament name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="tournamentLocation" className="text-sm font-medium">Location</Label>
                  <Input
                    id="tournamentLocation"
                    value={newTournament.location}
                    onChange={(e) => setNewTournament({ ...newTournament, location: e.target.value })}
                    placeholder="Enter location"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="tournamentDate" className="text-sm font-medium">Date</Label>
                  <Input
                    type="date"
                    id="tournamentDate"
                    value={newTournament.date}
                    onChange={(e) => setNewTournament({ ...newTournament, date: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <Button onClick={handleAddTournament} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tournament
                </Button>
              </div>

              <div className="mt-6 pt-4 border-t">
                <h3 className="font-semibold mb-3 text-gray-700">Current Tournaments ({tournaments.length})</h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {tournaments.map((tournament) => (
                    <div key={tournament.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium text-sm">{tournament.name}</span>
                        <p className="text-xs text-gray-500">{tournament.location}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => navigate(`/admin/tournament/edit/${tournament.id}`)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => deleteTournament(tournament.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Players */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Players
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

              <div className="mt-6 pt-4 border-t">
                <h3 className="font-semibold mb-3 text-gray-700">Current Players ({players.length})</h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {players.map((player) => (
                    <div key={player.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium text-sm">{player.name}</span>
                        <p className="text-xs text-gray-500">{player.country}</p>
                      </div>
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
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Clubs */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                Clubs
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="clubName" className="text-sm font-medium">Club Name</Label>
                  <Input
                    id="clubName"
                    value={newClub.name}
                    onChange={(e) => setNewClub({ ...newClub, name: e.target.value })}
                    placeholder="Enter club name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="clubDivision" className="text-sm font-medium">Division</Label>
                  <Select value={newClub.division} onValueChange={(value) => setNewClub({ ...newClub, division: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select division" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Division 1">Division 1</SelectItem>
                      <SelectItem value="Division 2">Division 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="clubCountry" className="text-sm font-medium">Country</Label>
                  <Input
                    id="clubCountry"
                    value={newClub.country}
                    onChange={(e) => setNewClub({ ...newClub, country: e.target.value })}
                    placeholder="Enter country"
                    className="mt-1"
                  />
                </div>
                <Button onClick={handleAddClub} className="w-full bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Club
                </Button>
              </div>

              <div className="mt-6 pt-4 border-t">
                <h3 className="font-semibold mb-3 text-gray-700">Current Clubs ({clubs.length})</h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {clubs.map((club) => (
                    <div key={club.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium text-sm">{club.name}</span>
                        <p className="text-xs text-gray-500">{club.division}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => deleteClub(club.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fixtures Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          {/* Schedule New Fixture */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Schedule Fixture
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="homeClub" className="text-sm font-medium">Home Club</Label>
                    <Select value={newFixture.homeClub} onValueChange={(value) => setNewFixture({ ...newFixture, homeClub: value })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Home club" />
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
                    <Label htmlFor="awayClub" className="text-sm font-medium">Away Club</Label>
                    <Select value={newFixture.awayClub} onValueChange={(value) => setNewFixture({ ...newFixture, awayClub: value })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Away club" />
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
                  <Label htmlFor="fixtureLocation" className="text-sm font-medium">Match Location</Label>
                  <Input
                    id="fixtureLocation"
                    value={newFixture.location}
                    onChange={(e) => setNewFixture({ ...newFixture, location: e.target.value })}
                    placeholder="Enter match location"
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fixtureDivision" className="text-sm font-medium">Division</Label>
                    <Select value={newFixture.division} onValueChange={(value) => setNewFixture({ ...newFixture, division: value })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Division" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Division 1">Division 1</SelectItem>
                        <SelectItem value="Division 2">Division 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="fixtureDate" className="text-sm font-medium">Match Date</Label>
                    <Input
                      type="date"
                      id="fixtureDate"
                      value={newFixture.date}
                      onChange={(e) => setNewFixture({ ...newFixture, date: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
                <Button onClick={handleAddFixture} className="w-full bg-orange-600 hover:bg-orange-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Fixture
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Add Match Results */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add Match Results
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <MatchForm onAddMatch={addMatch} />
            </CardContent>
          </Card>
        </div>

        {/* Fixtures Tables */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Upcoming Fixtures */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Upcoming Fixtures ({upcomingFixtures.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-4">Match</TableHead>
                    <TableHead className="px-4">Date</TableHead>
                    <TableHead className="px-4">Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingFixtures.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-6 text-gray-500">
                        No upcoming fixtures scheduled
                      </TableCell>
                    </TableRow>
                  ) : (
                    upcomingFixtures.map((fixture) => (
                      <TableRow key={fixture.id} className="hover:bg-gray-50">
                        <TableCell className="px-4 py-3">
                          <div className="font-medium text-sm">
                            {fixture.homeClub} vs {fixture.awayClub}
                          </div>
                          <div className="text-xs text-gray-500">{fixture.division}</div>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-sm">
                          {new Date(fixture.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            {fixture.location}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Past Fixtures */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Past Fixtures ({pastFixtures.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-4">Match</TableHead>
                    <TableHead className="px-4">Date</TableHead>
                    <TableHead className="px-4">Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pastFixtures.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-6 text-gray-500">
                        No past fixtures
                      </TableCell>
                    </TableRow>
                  ) : (
                    pastFixtures.map((fixture) => (
                      <TableRow key={fixture.id} className="hover:bg-gray-50">
                        <TableCell className="px-4 py-3">
                          <div className="font-medium text-sm">
                            {fixture.homeClub} vs {fixture.awayClub}
                          </div>
                          <div className="text-xs text-gray-500">{fixture.division}</div>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-sm">
                          {new Date(fixture.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-sm">
                          {fixture.homeScore !== undefined && fixture.awayScore !== undefined 
                            ? `${fixture.homeScore} - ${fixture.awayScore}`
                            : fixture.status === "completed" ? "Completed" : "Scheduled"
                          }
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

export default AdminDashboard;
