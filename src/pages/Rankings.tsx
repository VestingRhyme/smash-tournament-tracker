
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, TrendingUp, Medal } from "lucide-react";
import Navbar from "@/components/Navbar";
import { mockPlayers } from "@/data/mockData";

const Rankings = () => {
  // Sort players by ranking
  const sortedPlayers = [...mockPlayers].sort((a, b) => a.ranking - b.ranking);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Player Rankings</h1>
          <p className="text-lg text-slate-600">Current world rankings across all categories</p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Men's Singles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">128</div>
              <div className="text-sm text-slate-600">Ranked Players</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Medal className="h-5 w-5 text-purple-500" />
                Women's Singles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">95</div>
              <div className="text-sm text-slate-600">Ranked Players</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Doubles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">64</div>
              <div className="text-sm text-slate-600">Ranked Pairs</div>
            </CardContent>
          </Card>
        </div>

        {/* Rankings Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Top Players
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Win Rate</TableHead>
                  <TableHead>Recent Form</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedPlayers.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell>
                      <Badge 
                        variant={player.ranking === 1 ? "default" : "secondary"}
                        className={player.ranking === 1 ? "bg-yellow-500 text-white" : ""}
                      >
                        #{player.ranking}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{player.name}</TableCell>
                    <TableCell>{player.country}</TableCell>
                    <TableCell>{player.category}</TableCell>
                    <TableCell>
                      <span className="font-semibold text-green-600">{player.winRate}%</span>
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Rankings;
