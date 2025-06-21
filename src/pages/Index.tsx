
import { useState } from "react";
import { Search, Calendar, MapPin, Trophy, Users, Clock, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { mockTournaments, mockPlayers } from "@/data/mockData";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredTournaments = mockTournaments.filter(tournament => 
    tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedFilter === "all" || tournament.status === selectedFilter)
  );

  // Get top 3 players from each category
  const topPlayers = mockPlayers
    .filter(player => player.ranking === 1)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <HeroSection />
      
      <div className="container mx-auto px-4 py-12">
        {/* Top Players Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">World #1 Players</h2>
            <p className="text-lg text-slate-600">Current world leaders in each category</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {topPlayers.map((player) => (
              <Link key={player.id} to={`/player/${player.id}`}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-gradient-to-br from-white to-blue-50">
                  <CardHeader className="text-center pb-2">
                    <div className="flex justify-center mb-2">
                      <div className="bg-yellow-100 p-3 rounded-full">
                        <Trophy className="h-8 w-8 text-yellow-600" />
                      </div>
                    </div>
                    <CardTitle className="text-lg font-bold text-slate-800">
                      {player.name}
                    </CardTitle>
                    <Badge className="bg-yellow-500 text-white">
                      #{player.ranking} {player.category}
                    </Badge>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                        <span className="font-semibold">{player.country}</span>
                      </div>
                      <div className="flex items-center justify-center gap-4 text-xs">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                          {player.winRate}% Win Rate
                        </span>
                      </div>
                      <div className="flex justify-center gap-1 mt-2">
                        {player.recentForm.slice(0, 3).map((result, index) => (
                          <div
                            key={index}
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                              result === 'W' ? 'bg-green-500' : 'bg-red-500'
                            }`}
                          >
                            {result}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tournaments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {["all", "upcoming", "live", "completed"].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  onClick={() => setSelectedFilter(filter)}
                  className="capitalize"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Tournament Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map((tournament) => (
            <Link key={tournament.id} to={`/tournament/${tournament.id}`}>
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg font-bold text-slate-800 line-clamp-2">
                      {tournament.name}
                    </CardTitle>
                    <Badge 
                      variant={tournament.status === 'live' ? 'destructive' : 
                              tournament.status === 'upcoming' ? 'default' : 'secondary'}
                      className="ml-2"
                    >
                      {tournament.status}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{tournament.startDate} - {tournament.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{tournament.location}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="flex flex-col items-center">
                      <Users className="h-5 w-5 text-blue-600 mb-1" />
                      <span className="text-sm font-semibold">{tournament.participants}</span>
                      <span className="text-xs text-slate-500">Players</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Trophy className="h-5 w-5 text-yellow-600 mb-1" />
                      <span className="text-sm font-semibold">{tournament.events}</span>
                      <span className="text-xs text-slate-500">Events</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Clock className="h-5 w-5 text-green-600 mb-1" />
                      <span className="text-sm font-semibold">{tournament.format}</span>
                      <span className="text-xs text-slate-500">Format</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
