
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash, Calendar, MapPin, ArrowLeft } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const AdminTournaments = () => {
  const navigate = useNavigate();
  const { tournaments, addTournament: createTournament, deleteTournament } = useAppContext();
  const [newTournament, setNewTournament] = useState({ name: "", location: "", date: "" });

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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Tournament Management</h1>
          <p className="text-gray-600">Create and manage tournaments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add Tournament Form */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Add New Tournament
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
            </CardContent>
          </Card>

          {/* Tournaments List */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                All Tournaments ({tournaments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-4">Tournament</TableHead>
                    <TableHead className="px-4">Location</TableHead>
                    <TableHead className="px-4">Date</TableHead>
                    <TableHead className="px-4">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tournaments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                        No tournaments found
                      </TableCell>
                    </TableRow>
                  ) : (
                    tournaments.map((tournament) => (
                      <TableRow key={tournament.id} className="hover:bg-gray-50">
                        <TableCell className="px-4 py-3">
                          <div className="font-medium text-sm">{tournament.name}</div>
                          <div className="text-xs text-gray-500">{tournament.status}</div>
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            {tournament.location}
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-sm">
                          {new Date(tournament.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="px-4 py-3">
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

export default AdminTournaments;
