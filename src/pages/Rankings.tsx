
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/contexts/AppContext";

const Rankings = () => {
  const { players } = useAppContext();

  const getPlayersByCategory = (category: string) => {
    return players
      .filter(player => player.category === category)
      .sort((a, b) => a.ranking - b.ranking);
  };

  const PlayerRankingCard = ({ player, position }: { player: any, position: number }) => (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">
          {position}
        </div>
        <div>
          <h3 className="font-semibold text-lg">{player.name}</h3>
          <p className="text-slate-600">{player.country}</p>
        </div>
      </div>
      <div className="text-right">
        <Badge variant="outline" className="mb-2">
          Rank #{player.ranking}
        </Badge>
        <p className="text-sm text-slate-600">{player.winRate}% Win Rate</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">World Rankings</h1>
          <p className="text-lg text-slate-600">Current BWF World Rankings by Category</p>
        </div>

        <Tabs defaultValue="mens-doubles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="mens-doubles">Men's Doubles</TabsTrigger>
            <TabsTrigger value="womens-doubles">Women's Doubles</TabsTrigger>
            <TabsTrigger value="mens-mixed">Men's XD</TabsTrigger>
            <TabsTrigger value="womens-mixed">Women's XD</TabsTrigger>
          </TabsList>

          <TabsContent value="mens-doubles">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-6 w-6 text-green-600" />
                  Men's Doubles Rankings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {getPlayersByCategory("Men's Doubles").map((player, index) => (
                  <PlayerRankingCard key={player.id} player={player} position={index + 1} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="womens-doubles">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-purple-600" />
                  Women's Doubles Rankings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {getPlayersByCategory("Women's Doubles").map((player, index) => (
                  <PlayerRankingCard key={player.id} player={player} position={index + 1} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mens-mixed">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Medal className="h-6 w-6 text-orange-600" />
                  Men's Mixed Doubles Rankings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {getPlayersByCategory("Mixed Doubles").filter(player => player.name.includes("Zheng") || player.name.includes("Mohammad")).map((player, index) => (
                  <PlayerRankingCard key={player.id} player={player} position={index + 1} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="womens-mixed">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-6 w-6 text-red-600" />
                  Women's Mixed Doubles Rankings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {getPlayersByCategory("Mixed Doubles").filter(player => player.name.includes("Huang")).map((player, index) => (
                  <PlayerRankingCard key={player.id} player={player} position={index + 1} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Rankings;
