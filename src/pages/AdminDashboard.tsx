import { useState } from "react";
import { Plus, Users, Trophy, Calendar, Settings, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import { mockTournaments, mockPlayers } from "@/data/mockData";

const AdminDashboard = () => {
  const [newTournament, setNewTournament] = useState({
    name: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    prizePool: "",
    format: "knockout"
  });

  const handleCreateTournament = () => {
    console.log("Creating tournament:", newTournament);
    // Reset form
    setNewTournament({
      name: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      prizePool: "",
      format: "knockout"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Admin Dashboard</h1>
          <p className="text-lg text-slate-600">Manage tournaments, players, and events</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Tournaments</p>
                  <p className="text-3xl font-bold text-blue-600">{mockTournaments.length}</p>
                </div>
                <Trophy className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Players</p>
                  <p className="text-3xl font-bold text-green-600">{mockPlayers.length}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Live Events</p>
                  <p className="text-3xl font-bold text-red-600">2</p>
                </div>
                <Calendar className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Matches</p>
                  <p className="text-3xl font-bold text-purple-600">150</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tournaments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
            <TabsTrigger value="players">Players</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="tournaments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Create Tournament Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Create New Tournament
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Tournament Name</Label>
                    <Input 
                      id="name"
                      value={newTournament.name}
                      onChange={(e) => setNewTournament({...newTournament, name: e.target.value})}
                      placeholder="Enter tournament name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location"
                      value={newTournament.location}
                      onChange={(e) => setNewTournament({...newTournament, location: e.target.value})}
                      placeholder="Enter venue location"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input 
                        id="startDate"
                        type="date"
                        value={newTournament.startDate}
                        onChange={(e) => setNewTournament({...newTournament, startDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input 
                        id="endDate"
                        type="date"
                        value={newTournament.endDate}
                        onChange={(e) => setNewTournament({...newTournament, endDate: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="format">Tournament Format</Label>
                    <Select value={newTournament.format} onValueChange={(value) => setNewTournament({...newTournament, format: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="knockout">Knockout</SelectItem>
                        <SelectItem value="round-robin">Round Robin</SelectItem>
                        <SelectItem value="swiss">Swiss System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="prizePool">Prize Pool</Label>
                    <Input 
                      id="prizePool"
                      value={newTournament.prizePool}
                      onChange={(e) => setNewTournament({...newTournament, prizePool: e.target.value})}
                      placeholder="e.g., $100,000"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description"
                      value={newTournament.description}
                      onChange={(e) => setNewTournament({...newTournament, description: e.target.value})}
                      placeholder="Tournament description"
                      rows={3}
                    />
                  </div>
                  
                  <Button onClick={handleCreateTournament} className="w-full">
                    Create Tournament
                  </Button>
                </CardContent>
              </Card>

              {/* Existing Tournaments */}
              <Card>
                <CardHeader>
                  <CardTitle>Manage Tournaments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTournaments.slice(0, 4).map((tournament) => (
                      <div key={tournament.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{tournament.name}</h4>
                          <p className="text-sm text-slate-600">{tournament.location}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline">View</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="players" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Player Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-500">
                  <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Player management interface</p>
                  <p className="text-sm">Add, edit, and manage player profiles</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matches" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Match Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-500">
                  <Trophy className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Match scheduling and results interface</p>
                  <p className="text-sm">Schedule matches and update live scores</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-500">
                  <Settings className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>System configuration and preferences</p>
                  <p className="text-sm">Manage system settings and preferences</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
