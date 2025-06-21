
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Medal, Award } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { mockPlayers } from "@/data/mockData";

const Rankings = () => {
  const categories = [
    { key: "Men's Singles", label: "Men's Singles" },
    { key: "Women's Singles", label: "Women's Singles" },
    { key: "Men's Doubles", label: "Men's Doubles" },
    { key: "Women's Doubles", label: "Women's Doubles" },
    { key: "Mixed Doubles", label: "Mixed Doubles" }
  ];

  const getPlayersForCategory = (category: string) => {
    return mockPlayers
      .filter(player => player.category === category)
      .sort((a, b) => a.ranking - b.ranking);
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-600" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">World Rankings</h1>
          <p className="text-lg text-slate-600">Official BWF World Rankings</p>
        </div>

        <Tabs defaultValue="Men's Singles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            {categories.map((category) => (
              <TabsTrigger key={category.key} value={category.key}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.key} value={category.key}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-yellow-500" />
                    {category.label} Rankings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">Rank</TableHead>
                        <TableHead>Player</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Win Rate</TableHead>
                        <TableHead>Recent Form</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getPlayersForCategory(category.key).map((player) => (
                        <TableRow key={player.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getRankIcon(player.ranking)}
                              <span className="font-bold text-lg">#{player.ranking}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-semibold">{player.name}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{player.country}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-green-500 transition-all duration-300"
                                  style={{ width: `${player.winRate}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{player.winRate}%</span>
                            </div>
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
                          <TableCell>
                            <Link to={`/player/${player.id}`}>
                              <Badge className="cursor-pointer hover:bg-blue-600">
                                View Profile
                              </Badge>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Rankings;
