
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Trophy } from "lucide-react";

interface TournamentDrawsProps {
  tournament: any;
  participatingPlayers: any[];
  onGenerateDraw: (format: string, selectedPlayers: string[]) => void;
}

const TournamentDraws = ({ 
  tournament, 
  participatingPlayers, 
  onGenerateDraw 
}: TournamentDrawsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [drawFormat, setDrawFormat] = useState("round_robin");
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  const handlePlayerToggle = (playerId: string) => {
    setSelectedPlayers(prev => 
      prev.includes(playerId) 
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId]
    );
  };

  const handleGenerateDraw = () => {
    onGenerateDraw(drawFormat, selectedPlayers);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg md:text-xl">Tournament Draws</CardTitle>
        <Button 
          onClick={() => setIsEditing(!isEditing)}
          variant="outline"
          size="sm"
        >
          <Edit className="h-4 w-4 mr-2" />
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-6">
            <div>
              <Label htmlFor="drawFormat">Tournament Format</Label>
              <Select value={drawFormat} onValueChange={setDrawFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="round_robin">Round Robin</SelectItem>
                  <SelectItem value="knockout">Knockout</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Select Players for Draw ({selectedPlayers.length} selected)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 max-h-60 overflow-y-auto border rounded-lg p-4">
                {participatingPlayers.map((player) => (
                  <div key={player.id} className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      id={player.id}
                      checked={selectedPlayers.includes(player.id)}
                      onChange={() => handlePlayerToggle(player.id)}
                      className="rounded"
                    />
                    <label htmlFor={player.id} className="text-sm cursor-pointer flex-1">
                      {player.name} - {player.club}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={handleGenerateDraw} 
                disabled={selectedPlayers.length < 2}
                className="flex-1"
              >
                Generate {drawFormat === 'round_robin' ? 'Round Robin' : 'Knockout'} Draw
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setSelectedPlayers(participatingPlayers.map(p => p.id))}
              >
                Select All
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setSelectedPlayers([])}
              >
                Clear All
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 md:py-12 text-slate-500">
            <Trophy className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-4 opacity-50" />
            <p className="text-sm md:text-base">Tournament draws will be displayed here</p>
            <p className="text-xs md:text-sm">Current format: {drawFormat === 'round_robin' ? 'Round Robin' : 'Knockout'}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TournamentDraws;
