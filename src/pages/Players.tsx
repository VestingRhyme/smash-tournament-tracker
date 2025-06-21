
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, MapPin, Trophy, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import { mockPlayers } from "@/data/mockData";

const Players = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Player Directory</h1>
          <p className="text-lg text-slate-600">Discover and follow your favorite badminton players</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <User className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-slate-800">1,247</div>
                  <div className="text-sm text-slate-600">Total Players</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-8 w-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-slate-800">45</div>
                  <div className="text-sm text-slate-600">Countries</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Trophy className="h-8 w-8 text-yellow-600" />
                <div>
                  <div className="text-2xl font-bold text-slate-800">156</div>
                  <div className="text-sm text-slate-600">Champions</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-slate-800">892</div>
                  <div className="text-sm text-slate-600">Active Players</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Player Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPlayers.map((player) => (
            <Card key={player.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {player.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <Badge className="bg-yellow-500 text-white">
                    #{player.ranking}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{player.name}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="h-4 w-4" />
                  {player.country}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-slate-700">Category</div>
                    <div className="text-sm text-slate-600">{player.category}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-slate-700">Win Rate</div>
                      <div className="text-lg font-bold text-green-600">{player.winRate}%</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-700">Matches</div>
                      <div className="text-lg font-bold text-blue-600">{player.matchesWon + player.matchesLost}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-slate-700 mb-2">Recent Form</div>
                    <div className="flex gap-1">
                      {player.recentForm.map((result, index) => (
                        <div
                          key={index}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                            result === 'W' ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        >
                          {result}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link to={`/player/${player.id}`}>
                    <Button className="w-full mt-4">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Players;
