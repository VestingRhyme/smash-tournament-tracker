import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/contexts/AppContext";
import { useLeagueContext } from "@/contexts/LeagueContext";

const AdminDashboard = () => {
  const { tournaments, players, matches, deleteTournament, deletePlayer } = useAppContext();
  const { clubs, addClub, updateClub, deleteClub, addClubMatch } = useLeagueContext();
  const [activeTab, setActiveTab] = useState("tournaments");
  const [isAddingTournament, setIsAddingTournament] = useState(false);
  const [isAddingPlayer, setIsAddingPlayer] = useState(false);
  const [isAddingClub, setIsAddingClub] = useState(false);
  const [isAddingClubMatch, setIsAddingClubMatch] = useState(false);
  const [newTournament, setNewTournament] = useState({
    name: "",
    location: "",
    startDate: "",
    endDate: "",
    prizePool: "",
    description: ""
  });
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    country: "",
    gender: "",
    age: "",
    height: "",
    club: ""
  });
  const [newClub, setNewClub] = useState({
    name: "",
    division: "Premier",
    country: ""
  });
  const [newClubMatch, setNewClubMatch] = useState({
    homeClub: "",
    awayClub: "",
    homeScore: "",
    awayScore: "",
    matchDate: "",
    division: "Premier"
  });

  const handleAddTournament = () => {
    if (newTournament.name && newTournament.location && newTournament.startDate && newTournament.endDate && newTournament.prizePool && newTournament.description) {
      // Basic validation - can be expanded
      useAppContext().addTournament(newTournament);
      setNewTournament({
        name: "",
        location: "",
        startDate: "",
        endDate: "",
        prizePool: "",
        description: ""
      });
      setIsAddingTournament(false);
      alert("Tournament added successfully!");
    }
  };

  const handleAddPlayer = () => {
    if (newPlayer.name && newPlayer.country && newPlayer.age && newPlayer.height) {
      useAppContext().addPlayer(newPlayer);
      setNewPlayer({
        name: "",
        country: "",
        gender: "",
        age: "",
        height: "",
        club: ""
      });
      setIsAddingPlayer(false);
      alert("Player added successfully!");
    }
  };

  const handleAddClub = () => {
    if (newClub.name && newClub.division && newClub.country) {
      useLeagueContext().addClub(newClub);
      setNewClub({
        name: "",
        division: "Premier",
        country: ""
      });
      setIsAddingClub(false);
      alert("Club added successfully!");
    }
  };

  const handleAddClubMatch = () => {
    if (newClubMatch.homeClub && newClubMatch.awayClub && newClubMatch.homeScore && newClubMatch.awayScore) {
      addClubMatch({
        ...newClubMatch,
        homeScore: parseInt(newClubMatch.homeScore),
        awayScore: parseInt(newClubMatch.awayScore),
        startDate: newClubMatch.matchDate // Fix: use matchDate instead of date
      });
      setNewClubMatch({
        homeClub: "",
        awayClub: "",
        homeScore: "",
        awayScore: "",
        matchDate: "",
        division: "Premier"
      });
      setIsAddingClubMatch(false);
      alert("Club match added successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Admin Dashboard</h1>

        <div className="mb-6">
          <Button variant="outline" onClick={() => setActiveTab("tournaments")} className={activeTab === "tournaments" ? "bg-blue-50 text-blue-700" : ""}>
            Tournaments
          </Button>
          <Button variant="outline" onClick={() => setActiveTab("players")} className={activeTab === "players" ? "bg-blue-50 text-blue-700" : ""}>
            Players
          </Button>
          <Button variant="outline" onClick={() => setActiveTab("clubs")} className={activeTab === "clubs" ? "bg-blue-50 text-blue-700" : ""}>
            Clubs
          </Button>
          <Button variant="outline" onClick={() => setActiveTab("clubMatches")} className={activeTab === "clubMatches" ? "bg-blue-50 text-blue-700" : ""}>
            Club Matches
          </Button>
        </div>

        {activeTab === "tournaments" && (
          <Card>
            <CardHeader>
              <CardTitle>Tournaments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tournaments.map((tournament) => (
                    <TableRow key={tournament.id}>
                      <TableCell>{tournament.name}</TableCell>
                      <TableCell>{tournament.location}</TableCell>
                      <TableCell>{tournament.startDate}</TableCell>
                      <TableCell>{tournament.endDate}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="secondary" asChild>
                            <a href={`/admin/tournament/edit/${tournament.id}`} className="flex items-center gap-2">
                              <Edit className="h-4 w-4" />
                              Edit
                            </a>
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => deleteTournament(tournament.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button onClick={() => setIsAddingTournament(true)} className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Tournament
              </Button>

              {isAddingTournament && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">Add New Tournament</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value={newTournament.name} onChange={(e) => setNewTournament({ ...newTournament, name: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" value={newTournament.location} onChange={(e) => setNewTournament({ ...newTournament, location: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input id="startDate" value={newTournament.startDate} onChange={(e) => setNewTournament({ ...newTournament, startDate: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input id="endDate" value={newTournament.endDate} onChange={(e) => setNewTournament({ ...newTournament, endDate: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="prizePool">Prize Pool</Label>
                      <Input id="prizePool" value={newTournament.prizePool} onChange={(e) => setNewTournament({ ...newTournament, prizePool: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" value={newTournament.description} onChange={(e) => setNewTournament({ ...newTournament, description: e.target.value })} />
                    </div>
                  </div>
                  <Button onClick={handleAddTournament} className="mt-4">
                    Add Tournament
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === "players" && (
          <Card>
            <CardHeader>
              <CardTitle>Players</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {players.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell>{player.name}</TableCell>
                      <TableCell>{player.country}</TableCell>
                      <TableCell>{player.category}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="secondary" asChild>
                            <a href={`/admin/player/edit/${player.id}`} className="flex items-center gap-2">
                              <Edit className="h-4 w-4" />
                              Edit
                            </a>
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => deletePlayer(player.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button onClick={() => setIsAddingPlayer(true)} className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Player
              </Button>

              {isAddingPlayer && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">Add New Player</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value={newPlayer.name} onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" value={newPlayer.country} onChange={(e) => setNewPlayer({ ...newPlayer, country: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input id="age" value={newPlayer.age} onChange={(e) => setNewPlayer({ ...newPlayer, age: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="height">Height</Label>
                      <Input id="height" value={newPlayer.height} onChange={(e) => setNewPlayer({ ...newPlayer, height: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select onValueChange={(value) => setNewPlayer({ ...newPlayer, gender: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select onValueChange={(value) => setNewPlayer({ ...newPlayer, category: value })}>
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
                  </div>
                  <Button onClick={handleAddPlayer} className="mt-4">
                    Add Player
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === "clubs" && (
          <Card>
            <CardHeader>
              <CardTitle>Clubs</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Division</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clubs.map((club) => (
                    <TableRow key={club.id}>
                      <TableCell>{club.name}</TableCell>
                      <TableCell>{club.division}</TableCell>
                      <TableCell>{club.country}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="secondary">
                            <Edit className="h-4 w-4" />
                            Edit
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => deleteClub(club.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button onClick={() => setIsAddingClub(true)} className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Club
              </Button>

              {isAddingClub && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">Add New Club</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value={newClub.name} onChange={(e) => setNewClub({ ...newClub, name: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="division">Division</Label>
                      <Select onValueChange={(value) => setNewClub({ ...newClub, division: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select division" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Premier">Premier</SelectItem>
                          <SelectItem value="Division 1">Division 1</SelectItem>
                          <SelectItem value="Division 2">Division 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" value={newClub.country} onChange={(e) => setNewClub({ ...newClub, country: e.target.value })} />
                    </div>
                  </div>
                  <Button onClick={handleAddClub} className="mt-4">
                    Add Club
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === "clubMatches" && (
          <Card>
            <CardHeader>
              <CardTitle>Club Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Home Club</TableHead>
                    <TableHead>Away Club</TableHead>
                    <TableHead>Home Score</TableHead>
                    <TableHead>Away Score</TableHead>
                    <TableHead>Match Date</TableHead>
                    <TableHead>Division</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Placeholder data - replace with actual club match data */}
                  <TableRow>
                    <TableCell>Club A</TableCell>
                    <TableCell>Club B</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>2024-08-15</TableCell>
                    <TableCell>Premier</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary">
                          <Edit className="h-4 w-4" />
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Button onClick={() => setIsAddingClubMatch(true)} className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Club Match
              </Button>

              {isAddingClubMatch && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">Add New Club Match</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="homeClub">Home Club</Label>
                      <Input id="homeClub" value={newClubMatch.homeClub} onChange={(e) => setNewClubMatch({ ...newClubMatch, homeClub: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="awayClub">Away Club</Label>
                      <Input id="awayClub" value={newClubMatch.awayClub} onChange={(e) => setNewClubMatch({ ...newClubMatch, awayClub: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="homeScore">Home Score</Label>
                      <Input id="homeScore" type="number" value={newClubMatch.homeScore} onChange={(e) => setNewClubMatch({ ...newClubMatch, homeScore: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="awayScore">Away Score</Label>
                      <Input id="awayScore" type="number" value={newClubMatch.awayScore} onChange={(e) => setNewClubMatch({ ...newClubMatch, awayScore: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="matchDate">Match Date</Label>
                      <Input id="matchDate" type="date" value={newClubMatch.matchDate} onChange={(e) => setNewClubMatch({ ...newClubMatch, matchDate: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="division">Division</Label>
                      <Select onValueChange={(value) => setNewClubMatch({ ...newClubMatch, division: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select division" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Premier">Premier</SelectItem>
                          <SelectItem value="Division 1">Division 1</SelectItem>
                          <SelectItem value="Division 2">Division 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={handleAddClubMatch} className="mt-4">
                    Add Club Match
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
