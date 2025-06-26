
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Crown, Edit, Plus, Trash2 } from "lucide-react";

interface Winner {
  event: string;
  winner: string;
  runnerUp: string;
}

interface TournamentWinnersProps {
  tournament: any;
  participatingPlayers: any[];
  winners: Winner[];
  onAddWinner: (winner: Winner) => void;
  onRemoveWinner: (index: number) => void;
}

const TournamentWinners = ({ 
  tournament, 
  participatingPlayers, 
  winners, 
  onAddWinner, 
  onRemoveWinner 
}: TournamentWinnersProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newWinner, setNewWinner] = useState({ event: "", winner: "", runnerUp: "" });

  const handleAddWinner = () => {
    if (newWinner.event && newWinner.winner) {
      onAddWinner(newWinner);
      setNewWinner({ event: "", winner: "", runnerUp: "" });
    }
  };

  const events = [
    "Men's Singles",
    "Women's Singles", 
    "Men's Doubles",
    "Women's Doubles",
    "Mixed Doubles"
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
          <Crown className="h-5 w-5 md:h-6 md:w-6 text-yellow-600" />
          Tournament Winners
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
            <h4 className="font-semibold mb-3">Add Winner</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label htmlFor="event">Event</Label>
                <Select value={newWinner.event} onValueChange={(value) => setNewWinner({...newWinner, event: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select event" />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map((event) => (
                      <SelectItem key={event} value={event}>{event}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="winner">Winner</Label>
                <Select value={newWinner.winner} onValueChange={(value) => setNewWinner({...newWinner, winner: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select winner" />
                  </SelectTrigger>
                  <SelectContent>
                    {participatingPlayers.map((player) => (
                      <SelectItem key={player.id} value={player.name}>{player.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="runnerUp">Runner-up</Label>
                <Select value={newWinner.runnerUp} onValueChange={(value) => setNewWinner({...newWinner, runnerUp: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select runner-up" />
                  </SelectTrigger>
                  <SelectContent>
                    {participatingPlayers.map((player) => (
                      <SelectItem key={player.id} value={player.name}>{player.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleAddWinner} className="mt-3 w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Winner
            </Button>
          </div>
        )}
        
        <div className="space-y-3">
          {winners.map((winner, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{winner.event}</h4>
                  <p className="text-sm text-slate-600">
                    Champion: 
                    <Link 
                      to={`/tournament/${tournament.id}/player/${participatingPlayers.find(p => p.name === winner.winner)?.id}`}
                      className="font-medium hover:text-blue-600 ml-1"
                    >
                      {winner.winner}
                    </Link>
                  </p>
                  {winner.runnerUp && (
                    <p className="text-sm text-slate-600">
                      Runner-up: 
                      <Link 
                        to={`/tournament/${tournament.id}/player/${participatingPlayers.find(p => p.name === winner.runnerUp)?.id}`}
                        className="font-medium hover:text-blue-600 ml-1"
                      >
                        {winner.runnerUp}
                      </Link>
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Crown className="h-6 w-6 text-yellow-600" />
                  {isEditing && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onRemoveWinner(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {winners.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <Crown className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No winners added yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TournamentWinners;
