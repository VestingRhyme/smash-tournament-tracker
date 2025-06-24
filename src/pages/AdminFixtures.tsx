
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Calendar, Clock, MapPin, ArrowLeft } from "lucide-react";
import { useLeagueContext } from "@/contexts/LeagueContext";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const AdminFixtures = () => {
  const navigate = useNavigate();
  const { clubs, fixtures, addFixture } = useLeagueContext();
  const [newFixture, setNewFixture] = useState({ homeClub: "", awayClub: "", date: "", location: "", division: "" });

  // Separate upcoming and past fixtures
  const today = new Date().toISOString().split('T')[0];
  const upcomingFixtures = fixtures.filter(fixture => fixture.date >= today && fixture.status === "scheduled");
  const pastFixtures = fixtures.filter(fixture => fixture.date < today || fixture.status === "completed");

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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Fixture Management</h1>
          <p className="text-gray-600">Schedule and manage fixtures</p>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8">
          {/* Schedule New Fixture */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur max-w-2xl mx-auto">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Schedule New Fixture
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

export default AdminFixtures;
