
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Trophy, MapPin, Settings, Plus } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { useLeagueContext } from "@/contexts/LeagueContext";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { tournaments, players, matches } = useAppContext();
  const { clubs, fixtures } = useLeagueContext();

  // Quick stats
  const upcomingFixtures = fixtures.filter(fixture => fixture.date >= new Date().toISOString().split('T')[0] && fixture.status === "scheduled");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your badminton application</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tournaments</p>
                  <p className="text-3xl font-bold text-blue-600">{tournaments.length}</p>
                </div>
                <Calendar className="h-12 w-12 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Players</p>
                  <p className="text-3xl font-bold text-green-600">{players.length}</p>
                </div>
                <Users className="h-12 w-12 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Clubs</p>
                  <p className="text-3xl font-bold text-purple-600">{clubs.length}</p>
                </div>
                <Settings className="h-12 w-12 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Matches</p>
                  <p className="text-3xl font-bold text-red-600">{matches.length}</p>
                </div>
                <Trophy className="h-12 w-12 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Tournament Management */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur hover:shadow-xl transition-shadow cursor-pointer" onClick={() => navigate('/admin/tournaments')}>
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Tournaments
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{tournaments.length}</p>
                  <p className="text-sm text-gray-600">Total Tournaments</p>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Manage Tournaments
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Player Management */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur hover:shadow-xl transition-shadow cursor-pointer" onClick={() => navigate('/admin/players')}>
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Players
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{players.length}</p>
                  <p className="text-sm text-gray-600">Registered Players</p>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Manage Players
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Fixture Management */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur hover:shadow-xl transition-shadow cursor-pointer" onClick={() => navigate('/admin/fixtures')}>
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Fixtures
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{upcomingFixtures.length}</p>
                  <p className="text-sm text-gray-600">Upcoming Fixtures</p>
                </div>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Manage Fixtures
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Match Management */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur hover:shadow-xl transition-shadow cursor-pointer" onClick={() => navigate('/admin/matches')}>
            <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Matches
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{matches.length}</p>
                  <p className="text-sm text-gray-600">Match Results</p>
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Manage Matches
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
