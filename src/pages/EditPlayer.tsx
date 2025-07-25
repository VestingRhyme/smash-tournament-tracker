
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/contexts/AppContext";
import { useLeagueContext } from "@/contexts/LeagueContext";

const EditPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { players, updatePlayer } = useAppContext();
  const { clubs } = useLeagueContext();
  const [player, setPlayer] = useState(() => players.find(p => p.id === id));

  useEffect(() => {
    const foundPlayer = players.find(p => p.id === id);
    setPlayer(foundPlayer);
  }, [players, id]);

  if (!player) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-slate-800">Player not found</h1>
          <Button onClick={() => navigate("/admin")} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin
          </Button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (player) {
      updatePlayer(player.id, {
        ...player,
        age: parseInt(player.age.toString()) || player.age,
        ranking: parseInt(player.ranking.toString()) || player.ranking
      });
      console.log("Player updated:", player);
      alert("Player updated successfully!");
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="mb-6">
          <Button onClick={() => navigate("/admin")} variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin
          </Button>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <Save className="h-5 w-5" />
              Edit Player
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Player Name</Label>
              <Input 
                id="name"
                value={player.name}
                onChange={(e) => setPlayer({...player, name: e.target.value})}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="country">Country</Label>
              <Input 
                id="country"
                value={player.country}
                onChange={(e) => setPlayer({...player, country: e.target.value})}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="club">Club</Label>
              <Select value={player.club || "no-club"} onValueChange={(value) => setPlayer({...player, club: value === "no-club" ? "" : value})}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a club" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-club">No Club</SelectItem>
                  {clubs.map((club) => (
                    <SelectItem key={club.id} value={club.name}>
                      {club.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={player.category} onValueChange={(value) => setPlayer({...player, category: value})}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Men's Doubles">Men's Doubles</SelectItem>
                  <SelectItem value="Women's Doubles">Women's Doubles</SelectItem>
                  <SelectItem value="Men's Mixed">Men's Mixed</SelectItem>
                  <SelectItem value="Women's Mixed">Women's Mixed</SelectItem>
                  <SelectItem value="Mixed Doubles">Mixed Doubles</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input 
                  id="age"
                  type="number"
                  value={player.age}
                  onChange={(e) => setPlayer({...player, age: parseInt(e.target.value) || 0})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="height">Height</Label>
                <Input 
                  id="height"
                  value={player.height}
                  onChange={(e) => setPlayer({...player, height: e.target.value})}
                  className="mt-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="ranking">Ranking</Label>
              <Input 
                id="ranking"
                type="number"
                value={player.ranking}
                onChange={(e) => setPlayer({...player, ranking: parseInt(e.target.value) || 0})}
                className="mt-1"
              />
            </div>
            
            <Button onClick={handleSave} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditPlayer;
