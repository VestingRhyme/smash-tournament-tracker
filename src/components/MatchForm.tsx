
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import PlayerAutocomplete from "./PlayerAutocomplete";

interface MatchFormProps {
  onAddMatch: (match: any) => void;
}

const MatchForm = ({ onAddMatch }: MatchFormProps) => {
  const [newMatch, setNewMatch] = useState({
    team1Player1: "",
    team1Player2: "",
    team2Player1: "",
    team2Player2: "",
    score: "",
    round: "",
    court: "",
    time: "",
    category: "",
    date: "",
    status: "scheduled"
  });

  const isDoublesCategory = newMatch.category.includes("Doubles") || newMatch.category.includes("Mixed");

  const handleSubmit = () => {
    if (!newMatch.team1Player1 || !newMatch.team2Player1 || !newMatch.category) {
      alert("Please fill in all required fields");
      return;
    }

    if (isDoublesCategory && (!newMatch.team1Player2 || !newMatch.team2Player2)) {
      alert("Please fill in all players for doubles match");
      return;
    }

    const match = {
      ...newMatch,
      id: Date.now().toString(),
      tournament: "League Match", // Default tournament name
      player1: isDoublesCategory ? `${newMatch.team1Player1} / ${newMatch.team1Player2}` : newMatch.team1Player1,
      player2: isDoublesCategory ? `${newMatch.team2Player1} / ${newMatch.team2Player2}` : newMatch.team2Player1,
    };

    onAddMatch(match);
    
    // Reset form
    setNewMatch({
      team1Player1: "",
      team1Player2: "",
      team2Player1: "",
      team2Player2: "",
      score: "",
      round: "",
      court: "",
      time: "",
      category: "",
      date: "",
      status: "scheduled"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add New Match
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="category">Category *</Label>
          <Select value={newMatch.category} onValueChange={(value) => setNewMatch({...newMatch, category: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Men's Doubles">Men's Doubles</SelectItem>
              <SelectItem value="Women's Doubles">Women's Doubles</SelectItem>
              <SelectItem value="Men's Mixed">Men's Mixed</SelectItem>
              <SelectItem value="Women's Mixed">Women's Mixed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Team 1 */}
        <div className="border rounded-lg p-4">
          <Label className="text-sm font-semibold text-blue-600 mb-2 block">Team 1</Label>
          <div className={`grid ${isDoublesCategory ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
            <div>
              <Label htmlFor="team1Player1">Player 1 *</Label>
              <PlayerAutocomplete
                value={newMatch.team1Player1}
                onChange={(value) => setNewMatch({...newMatch, team1Player1: value})}
                placeholder="First player name"
                category={newMatch.category}
              />
            </div>
            
            {isDoublesCategory && (
              <div>
                <Label htmlFor="team1Player2">Player 2 *</Label>
                <PlayerAutocomplete
                  value={newMatch.team1Player2}
                  onChange={(value) => setNewMatch({...newMatch, team1Player2: value})}
                  placeholder="Second player name"
                  category={newMatch.category}
                />
              </div>
            )}
          </div>
        </div>

        {/* Team 2 */}
        <div className="border rounded-lg p-4">
          <Label className="text-sm font-semibold text-red-600 mb-2 block">Team 2</Label>
          <div className={`grid ${isDoublesCategory ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
            <div>
              <Label htmlFor="team2Player1">Player 1 *</Label>
              <PlayerAutocomplete
                value={newMatch.team2Player1}
                onChange={(value) => setNewMatch({...newMatch, team2Player1: value})}
                placeholder="First player name"
                category={newMatch.category}
              />
            </div>
            
            {isDoublesCategory && (
              <div>
                <Label htmlFor="team2Player2">Player 2 *</Label>
                <PlayerAutocomplete
                  value={newMatch.team2Player2}
                  onChange={(value) => setNewMatch({...newMatch, team2Player2: value})}
                  placeholder="Second player name"
                  category={newMatch.category}
                />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="round">Round</Label>
            <Input 
              id="round"
              value={newMatch.round}
              onChange={(e) => setNewMatch({...newMatch, round: e.target.value})}
              placeholder="e.g., Semifinals"
            />
          </div>
          
          <div>
            <Label htmlFor="court">Court</Label>
            <Input 
              id="court"
              value={newMatch.court}
              onChange={(e) => setNewMatch({...newMatch, court: e.target.value})}
              placeholder="e.g., Court 1"
            />
          </div>
          
          <div>
            <Label htmlFor="time">Time</Label>
            <Input 
              id="time"
              value={newMatch.time}
              onChange={(e) => setNewMatch({...newMatch, time: e.target.value})}
              placeholder="e.g., 14:30"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date">Date</Label>
            <Input 
              id="date"
              type="date"
              value={newMatch.date}
              onChange={(e) => setNewMatch({...newMatch, date: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="score">Score (if completed)</Label>
            <Input 
              id="score"
              value={newMatch.score}
              onChange={(e) => setNewMatch({...newMatch, score: e.target.value})}
              placeholder="e.g., 21-15, 21-18"
            />
          </div>
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Add Match
        </Button>
      </CardContent>
    </Card>
  );
};

export default MatchForm;
