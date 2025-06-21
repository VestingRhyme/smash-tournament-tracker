
import { ArrowRight, Trophy, Users, Calendar, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { useAppContext } from "@/contexts/AppContext";

const Index = () => {
  const { tournaments, players, matches } = useAppContext();

  // Get top players (one from each category)
  const getTopPlayersByCategory = () => {
    const categories = ["Men's Singles", "Women's Singles", "Men's Doubles", "Women's Doubles", "Mixed Doubles"];
    return categories.map(category => 
      players.find(player => player.category === category && player.ranking === 1)
    ).filter(Boolean).slice(0, 4);
  };

  const topPlayers = getTopPlayersByCategory();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <HeroSection />
      
      <div className="container mx-auto px-4 py-16">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardContent className="p-8">
              <Trophy className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-slate-800 mb-2">{tournaments.length}</h3>
              <p className="text-lg text-slate-600">Active Tournaments</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-8">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-slate-800 mb-2">{players.length}</h3>
              <p className="text-lg text-slate-600">World-Class Players</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-8">
              <Calendar className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-slate-800 mb-2">{matches.length}</h3>
              <p className="text-lg text-slate-600">Matches Played</p>
            </CardContent>
          </Card>
        </div>

        {/* Top Players Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">World Champions</h2>
            <p className="text-lg text-slate-600">Meet the current #1 ranked players in each category</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topPlayers.map((player) => (
              <Link key={player.id} to={`/player/${player.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-yellow-500 text-white">#1</Badge>
                      <Trophy className="h-5 w-5 text-yellow-500" />
                    </div>
                    <CardTitle className="text-xl">{player.name}</CardTitle>
                    <p className="text-slate-600">{player.country}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Badge variant="outline">{player.category}</Badge>
                      <p className="text-sm text-slate-600">Win Rate: {player.winRate}%</p>
                      <div className="flex gap-1">
                        {player.recentForm.slice(0, 3).map((result, index) => (
                          <span
                            key={index}
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                              result === 'W' ? 'bg-green-500' : 'bg-red-500'
                            }`}
                          >
                            {result}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/players">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                View All Players
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Live Tournaments */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Live Tournaments</h2>
            <p className="text-lg text-slate-600">Follow the action in real-time</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.filter(t => t.status === 'live').slice(0, 3).map((tournament) => (
              <Link key={tournament.id} to={`/tournament/${tournament.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-red-500 text-white flex items-center gap-1">
                        <Play className="h-3 w-3" />
                        LIVE
                      </Badge>
                      <span className="text-sm text-slate-600">{tournament.participants} players</span>
                    </div>
                    <CardTitle>{tournament.name}</CardTitle>
                    <p className="text-slate-600">{tournament.location}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm"><strong>Prize Pool:</strong> {tournament.prizePool}</p>
                      <p className="text-sm"><strong>Format:</strong> {tournament.format}</p>
                      <p className="text-sm text-slate-600">{tournament.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/admin">
              <Button variant="outline" size="lg">
                View All Tournaments
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
