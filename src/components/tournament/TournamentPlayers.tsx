
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Users, Plus, Trash2 } from "lucide-react";

interface TournamentPlayersProps {
  tournament: any;
  participatingPlayers: any[];
  allPlayers: any[];
  onAddPlayer: (playerId: string) => void;
  onRemovePlayer: (playerId: string) => void;
}

const TournamentPlayers = ({ 
  tournament, 
  participatingPlayers, 
  allPlayers, 
  onAddPlayer, 
  onRemovePlayer 
}: TournamentPlayersProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState("");

  const availablePlayers = allPlayers.filter(
    player => !participatingPlayers.some(p => p.id === player.id)
  );

  const handleAddPlayer = () => {
    if (selectedPlayer) {
      onAddPlayer(selectedPlayer);
      setSelectedPlayer("");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
          <Users className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
          Tournament Players ({participatingPlayers.length})
        </CardTitle>
        <Button 
          onClick={() => setIsEditing(!isEditing)}
          variant="outline"
          size="sm"
        >
          <Edit className="h-4 w-4 mr-2" />
          {isEditing ? "Done" : "Edit"}
        </Button>
      </CardHeader>
      <CardContent>
        {isEditing && (
          <div className="mb-6 p-4 border rounded-lg bg-slate-50">
            <h4 className="font-semibold mb-3">Add Player to Tournament</h4>
            <div className="flex gap-2">
              <Select value={selectedPlayer} onValueChange={setSelectedPlayer}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select a player" />
                </SelectTrigger>
                <SelectContent>
                  {availablePlayers.map((player) => (
                    <SelectItem key={player.id} value={player.id}>
                      {player.name} - {player.club}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleAddPlayer} disabled={!selectedPlayer}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {participatingPlayers.map((player) => (
            <div key={player.id} className="p-3 md:p-4 border rounded-lg hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {player.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <Link 
                      to={`/player/${player.id}`}
                      className="font-semibold text-sm md:text-base hover:text-blue-600 cursor-pointer"
                    >
                      {player.name}
                    </Link>
                    <p className="text-xs md:text-sm text-slate-600">{player.club}</p>
                    <Badge variant="outline" className="text-xs">
                      Rank #{player.ranking}
                    </Badge>
                  </div>
                </div>
                {isEditing && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onRemovePlayer(player.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TournamentPlayers;
