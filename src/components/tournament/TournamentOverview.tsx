
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Save } from "lucide-react";

interface TournamentOverviewProps {
  tournament: any;
  participatingPlayers: any[];
  tournamentMatches: any[];
  onUpdateTournament: (updatedTournament: any) => void;
}

const TournamentOverview = ({ 
  tournament, 
  participatingPlayers, 
  tournamentMatches, 
  onUpdateTournament 
}: TournamentOverviewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(tournament);

  const handleSave = () => {
    onUpdateTournament(editData);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Tournament Overview</CardTitle>
        <Button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          variant="outline"
          size="sm"
        >
          {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
          {isEditing ? "Save" : "Edit"}
        </Button>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Tournament Name</Label>
              <Input
                id="name"
                value={editData.name}
                onChange={(e) => setEditData({...editData, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editData.description}
                onChange={(e) => setEditData({...editData, description: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="prizePool">Prize Pool</Label>
                <Input
                  id="prizePool"
                  value={editData.prizePool}
                  onChange={(e) => setEditData({...editData, prizePool: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="events">Events</Label>
                <Input
                  id="events"
                  value={editData.events}
                  onChange={(e) => setEditData({...editData, events: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={editData.startDate}
                  onChange={(e) => setEditData({...editData, startDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={editData.endDate}
                  onChange={(e) => setEditData({...editData, endDate: e.target.value})}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Quick Stats</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Players:</span>
                  <span className="font-medium">{participatingPlayers.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Matches:</span>
                  <span className="font-medium">{tournamentMatches.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Events:</span>
                  <span className="font-medium">{tournament.events}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Tournament Info</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Prize Pool:</strong> {tournament.prizePool}</p>
                <p><strong>Location:</strong> {tournament.location}</p>
                <p><strong>Duration:</strong> {tournament.startDate} - {tournament.endDate}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TournamentOverview;
