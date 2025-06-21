
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, TrendingUp, Medal } from "lucide-react";
import Navbar from "@/components/Navbar";
import { mockPlayers } from "@/data/mockData";

const Rankings = () => {
  const categories = [
    "Men's Singles",
    "Women's Singles", 
    "Men's Doubles",
    "Women's Doubles",
    "Mixed Doubles"
  ];

  const getPlayersByCategory = (category: string) => {
    return mockPlayers
      .filter(player => player.category === category)
      .sort((a, b) => a.ranking - b.ranking);
  };

  const getCategoryStats = (category: string) => {
    return getPlayersByCategory(category).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Player Rankings</h1>
          <p className="text-lg text-slate-600">Current world rankings across all categories</p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Trophy className="h-4 w-4 text-blue-500" />
                Men's Singles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-blue-600">{getCategoryStats("Men's Singles")}</div>
              <div className="text-xs text-slate-600">Ranked Players</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Medal className="h-4 w-4 text-purple-500" />
                Women's Singles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-purple-600">{getCategoryStats("Women's Singles")}</div>
              <div className="text-xs text-slate-600">Ranked Players</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500" />
                Men's Doubles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">{getCategoryStats("Men's Doubles")}</div>
              <div className="text-xs text-slate-600">Ranked Players</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Trophy className="h-4 w-4 text-pink-500" />
                Women's Doubles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-pink-600">{getCategoryStats("Women's Doubles")}</div>
              <div className="text-xs text-slate-600">Ranked Players</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Medal className="h-4 w-4 text-orange-500" />
                Mixed Doubles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-orange-600">{getCategoryStats("Mixed Doubles")}</div>
              <div className="text-xs text-slate-600">Ranked Players</div>
            </CardContent>
          </Card>
        </div>

        {/* Rankings Tables by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Rankings by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="Men's Singles" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="text-xs">
                    {category.replace("'s", "").replace(" ", "\n")}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category} value={category}>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Player</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Win Rate</TableHead>
                        <TableHead>Recent Form</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getPlayersByCategory(category).map((player) => (
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
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Rankings;
