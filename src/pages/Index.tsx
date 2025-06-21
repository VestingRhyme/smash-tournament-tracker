
import { useState } from "react";
import { Search, Calendar, MapPin, Trophy, Users, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { mockTournaments } from "@/data/mockData";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredTournaments = mockTournaments.filter(tournament => 
    tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedFilter === "all" || tournament.status === selectedFilter)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <HeroSection />
      
      <div className="container mx-auto px-4 py-12">
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
