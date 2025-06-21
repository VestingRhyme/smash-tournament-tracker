
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/contexts/AppContext";

const Players = () => {
  const { players } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || player.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Player Directory</h1>
          <p className="text-lg text-slate-600">Discover and explore badminton players from around the world</p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search players by name or country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Men's Singles">Men's Singles</SelectItem>
                  <SelectItem value="Women's Singles">Women's Singles</SelectItem>
                  <SelectItem value="Men's Doubles">Men's Doubles</SelectItem>
                  <SelectItem value="Women's Doubles">Women's Doubles</SelectItem>
                  <SelectItem value="Mixed Doubles">Mixed Doubles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6 flex items-center gap-2 text-slate-600">
          <Users className="h-5 w-5" />
          <span>Showing {filteredPlayers.length} of {players.length} players</span>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.map((player) => (
            <Link key={player.id} to={`/player/${player.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{player.name}</CardTitle>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Trophy className="h-3 w-3" />
                      #{player.ranking}
                    </Badge>
                  </div>
                  <p className="text-slate-600">{player.country}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <Badge className="mb-2">{player.category}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600">Age:</span>
                        <p className="font-semibold">{player.age}</p>
                      </div>
                      <div>
                        <span className="text-slate-600">Height:</span>
                        <p className="font-semibold">{player.height}</p>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <span className="text-slate-600">Win Rate:</span>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${player.winRate}%` }}
                          />
                        </div>
                        <span className="font-semibold">{player.winRate}%</span>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <span className="text-slate-600">Recent Form:</span>
                      <div className="flex gap-1 mt-1">
                        {player.recentForm.map((result, index) => (
                          <span
                            key={index}
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                              result === 'W' ? 'bg-green-500' : 'bg-red-500'
                            }`}
                          >
                            {result}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredPlayers.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="h-16 w-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No players found</h3>
              <p className="text-slate-500">Try adjusting your search terms or filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Players;
