
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/contexts/AppContext";

const EditTournament = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tournaments, updateTournament } = useAppContext();
  const [tournament, setTournament] = useState(tournaments.find(t => t.id === id));

  useEffect(() => {
    const foundTournament = tournaments.find(t => t.id === id);
    setTournament(foundTournament);
  }, [tournaments, id]);

  if (!tournament) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-slate-800">Tournament not found</h1>
          <Button onClick={() => navigate("/admin")} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin
          </Button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    updateTournament(tournament.id, tournament);
    console.log("Tournament updated:", tournament);
    alert("Tournament updated successfully!");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button onClick={() => navigate("/admin")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin
          </Button>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Save className="h-5 w-5" />
              Edit Tournament
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Tournament Name</Label>
              <Input 
                id="name"
                value={tournament.name}
                onChange={(e) => setTournament({...tournament, name: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location"
                value={tournament.location}
                onChange={(e) => setTournament({...tournament, location: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input 
                  id="startDate"
                  value={tournament.startDate}
                  onChange={(e) => setTournament({...tournament, startDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input 
                  id="endDate"
                  value={tournament.endDate}
                  onChange={(e) => setTournament({...tournament, endDate: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="prizePool">Prize Pool</Label>
              <Input 
                id="prizePool"
                value={tournament.prizePool}
                onChange={(e) => setTournament({...tournament, prizePool: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                value={tournament.description}
                onChange={(e) => setTournament({...tournament, description: e.target.value})}
                rows={3}
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

export default EditTournament;
