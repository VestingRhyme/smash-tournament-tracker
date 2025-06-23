
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Users } from "lucide-react";
import { Link } from "react-router-dom";
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
    <Link to={`/player/${player.id}`} className="block">
      <div className="flex items-center justify-between p-3 md:p-4 border rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-sm md:text-base">
            {position}
          </div>
          <div>
            <h3 className="font-semibold text-base md:text-lg hover:text-blue-600">{player.name}</h3>
            <p className="text-slate-600 text-sm">{player.country}</p>
          </div>
        </div>
        <div className="text-right">
          <Badge variant="outline" className="mb-2 text-xs md:text-sm">
            Rank #{player.ranking}
          </Badge>
          <p className="text-xs md:text-sm text-slate-600">{player.winRate}% Win Rate</p>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="mb-6 md:mb-8 text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-slate-800 mb-2">World Rankings</h1>
          <p className="text-base md:text-lg text-slate-600">Current BWF World Rankings by Category</p>
        </div>

        <Tabs defaultValue="mens-doubles" className="space-y-4 md:space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 text-xs md:text-sm">
            <TabsTrigger value="mens-doubles">Men's Doubles</TabsTrigger>
            <TabsTrigger value="womens-doubles">Women's Doubles</TabsTrigger>
            <TabsTrigger value="mens-xd">Men's XD</TabsTrigger>
            <TabsTrigger value="womens-xd">Women's XD</TabsTrigger>
            <TabsTrigger value="mixed-doubles" className="hidden md:block">Mixed Doubles</TabsTrigger>
          </TabsList>

          <TabsContent value="mens-doubles">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Award className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                  Men's Doubles Rankings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                {getPlayersByCategory("Men's Doubles").map((player, index) => (
                  <PlayerRankingCard key={player.id} player={player} position={index + 1} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="womens-doubles">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Trophy className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
                  Women's Doubles Rankings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                {getPlayersByCategory("Women's Doubles").map((player, index) => (
                  <PlayerRankingCard key={player.id} player={player} position={index + 1} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mens-xd">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Users className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                  Men's XD Rankings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                {getPlayersByCategory("Men's Mixed").map((player, index) => (
                  <PlayerRankingCard key={player.id} player={player} position={index + 1} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="womens-xd">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Medal className="h-5 w-5 md:h-6 md:w-6 text-pink-600" />
                  Women's XD Rankings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                {getPlayersByCategory("Women's Mixed").map((player, index) => (
                  <PlayerRankingCard key={player.id} player={player} position={index + 1} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mixed-doubles">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Users className="h-5 w-5 md:h-6 md:w-6 text-orange-600" />
                  Mixed Doubles Rankings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                {getPlayersByCategory("Mixed Doubles").map((player, index) => (
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
