import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, Trophy, Users, DollarSign, Edit, Crown, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/contexts/AppContext";

const TournamentDetails = () => {
  const { id } = useParams();
  const { tournaments, matches, players } = useAppContext();
  const tournament = tournaments.find(t => t.id === id);
  const [isEditingPlayers, setIsEditingPlayers] = useState(false);
  const [isEditingMatches, setIsEditingMatches] = useState(false);
  const [isEditingDraws, setIsEditingDraws] = useState(false);
  const [isEditingWinners, setIsEditingWinners] = useState(false);
  const [newWinner, setNewWinner] = useState({ event: "", winner: "", runnerUp: "" });
  const [winners, setWinners] = useState([
    { event: "Men's Doubles", winner: "Player A / Player B", runnerUp: "Player C / Player D" },
    { event: "Women's Doubles", winner: "Player E / Player F", runnerUp: "Player G / Player H" },
  ]);
  
  if (!tournament) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-slate-800">Tournament not found</h1>
        </div>
      </div>
    );
  }

  const tournamentMatches = matches.filter(match => 
    match.tournament === tournament.name
  );

  const participatingPlayers = players.filter(player => 
    tournamentMatches.some(match => 
      match.player1.includes(player.name) || match.player2.includes(player.name)
    )
  );

  const handleAddWinner = () => {
    if (newWinner.event && newWinner.winner) {
      setWinners([...winners, newWinner]);
      setNewWinner({ event: "", winner: "", runnerUp: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Tournament Header */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-6 md:mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4 md:gap-6">
            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
                <h1 className="text-2xl md:text-4xl font-bold text-slate-800">{tournament.name}</h1>
                <Badge 
                  variant={tournament.status === 'live' ? 'destructive' : 
                          tournament.status === 'upcoming' ? 'default' : 'secondary'}
                  className="text-xs md:text-sm px-2 md:px-3 py-1"
                >
                  {tournament.status}
                </Badge>
              </div>
              
              <p className="text-base md:text-lg text-slate-600 mb-4 md:mb-6">{tournament.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                  <div>
                    <div className="font-semibold text-sm md:text-base">Duration</div>
                    <div className="text-xs md:text-sm text-slate-600">{tournament.startDate} - {tournament.endDate}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 md:h-5 md:w-5 text-red-600" />
                  <div>
                    <div className="font-semibold text-sm md:text-base">Location</div>
                    <div className="text-xs md:text-sm text-slate-600">{tournament.location}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                  <div>
                    <div className="font-semibold text-sm md:text-base">Prize Pool</div>
                    <div className="text-xs md:text-sm text-slate-600">{tournament.prizePool}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 md:p-6 text-white w-full lg:w-auto">
              <div className="grid grid-cols-2 gap-4 md:gap-6 text-center">
                <div>
                  <Users className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2" />
                  <div className="text-xl md:text-2xl font-bold">{tournament.participants}</div>
                  <div className="text-xs md:text-sm opacity-90">Players</div>
                </div>
                <div>
                  <Trophy className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2" />
                  <div className="text-xl md:text-2xl font-bold">{tournament.events}</div>
                  <div className="text-xs md:text-sm opacity-90">Events</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tournament Content */}
        <Tabs defaultValue="overview" className="space-y-4 md:space-y-6">
          <TabsList className="grid w-full grid-cols-5 text-xs md:text-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="players">Players</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="draws">Draws</TabsTrigger>
            <TabsTrigger value="winners">Winners</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tournament Overview</CardTitle>
              </CardHeader>
              <CardContent>
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
                      <p><strong>Format:</strong> Single/Double Elimination</p>
                      <p><strong>Entry Fee:</strong> Included in prize pool</p>
                      <p><strong>Registration:</strong> Closed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="players" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Users className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                  Tournament Players
                </CardTitle>
                <Button 
                  onClick={() => setIsEditingPlayers(!isEditingPlayers)}
                  variant="outline"
                  size="sm"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditingPlayers ? "Done" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {participatingPlayers.map((player) => (
                    <div key={player.id} className="p-3 md:p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {player.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <Link 
                            to={`/tournament/${id}/player/${player.id}`}
                            className="font-semibold text-sm md:text-base hover:text-blue-600 cursor-pointer"
                          >
                            {player.name}
                          </Link>
                          <p className="text-xs md:text-sm text-slate-600">{player.category}</p>
                          <Badge variant="outline" className="text-xs">
                            Rank #{player.ranking}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matches" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Play className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                  Tournament Matches
                </CardTitle>
                <Button 
                  onClick={() => setIsEditingMatches(!isEditingMatches)}
                  variant="outline"
                  size="sm"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditingMatches ? "Done" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Match</TableHead>
                      <TableHead>Round</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tournamentMatches.map((match) => (
                      <TableRow key={match.id}>
                        <TableCell>
                          <div className="font-medium">{match.player1} vs {match.player2}</div>
                          <div className="text-sm text-slate-600">{match.category}</div>
                        </TableCell>
                        <TableCell>{match.round || "Round 1"}</TableCell>
                        <TableCell>{match.score || "Not started"}</TableCell>
                        <TableCell>
                          <Badge variant={match.status === 'completed' ? 'default' : 'secondary'}>
                            {match.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="draws" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg md:text-xl">Tournament Draws</CardTitle>
                <Button 
                  onClick={() => setIsEditingDraws(!isEditingDraws)}
                  variant="outline"
                  size="sm"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditingDraws ? "Save" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent>
                {isEditingDraws ? (
                  <div className="space-y-4">
                    <div className="text-center py-8 text-slate-500">
                      <Edit className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-sm md:text-base">Draw editing interface</p>
                      <p className="text-xs md:text-sm">Manage tournament brackets and seeding</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 md:py-12 text-slate-500">
                    <Trophy className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-sm md:text-base">Tournament draws will be displayed here</p>
                    <p className="text-xs md:text-sm">Interactive bracket view</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="winners" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Crown className="h-5 w-5 md:h-6 md:w-6 text-yellow-600" />
                  Tournament Winners
                </CardTitle>
                <Button 
                  onClick={() => setIsEditingWinners(!isEditingWinners)}
                  variant="outline"
                  size="sm"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditingWinners ? "Done" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent>
                {isEditingWinners && (
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
                            <SelectItem value="Men's Doubles">Men's Doubles</SelectItem>
                            <SelectItem value="Women's Doubles">Women's Doubles</SelectItem>
                            <SelectItem value="Mixed Doubles">Mixed Doubles</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="winner">Winner</Label>
                        <Input
                          value={newWinner.winner}
                          onChange={(e) => setNewWinner({...newWinner, winner: e.target.value})}
                          placeholder="Winner name(s)"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="runnerUp">Runner-up</Label>
                        <Input
                          value={newWinner.runnerUp}
                          onChange={(e) => setNewWinner({...newWinner, runnerUp: e.target.value})}
                          placeholder="Runner-up name(s)"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <Button onClick={handleAddWinner} className="mt-3 w-full md:w-auto">
                      Add Winner
                    </Button>
                  </div>
                )}
                
                <div className="space-y-3">
                  {winners.map((winner, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-lg">{winner.event}</h4>
                          <p className="text-sm text-slate-600">Champion: <span className="font-medium">{winner.winner}</span></p>
                          {winner.runnerUp && (
                            <p className="text-sm text-slate-600">Runner-up: <span className="font-medium">{winner.runnerUp}</span></p>
                          )}
                        </div>
                        <Trophy className="h-6 w-6 text-yellow-600 self-center md:self-auto" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TournamentDetails;
