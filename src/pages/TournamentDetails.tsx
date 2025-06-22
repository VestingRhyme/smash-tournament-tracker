import { useParams } from "react-router-dom";
import { Calendar, MapPin, Trophy, Users, DollarSign, Play, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/contexts/AppContext";

const TournamentDetails = () => {
  const { id } = useParams();
  const { tournaments, matches } = useAppContext();
  const tournament = tournaments.find(t => t.id === id);
  
  if (!tournament) {
    return <div>Tournament not found</div>;
  }

  const tournamentMatches = matches.filter(match => 
    match.tournament === tournament.name
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Tournament Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl font-bold text-slate-800">{tournament.name}</h1>
                <Badge 
                  variant={tournament.status === 'live' ? 'destructive' : 
                          tournament.status === 'upcoming' ? 'default' : 'secondary'}
                  className="text-sm px-3 py-1"
                >
                  {tournament.status}
                </Badge>
              </div>
              
              <p className="text-lg text-slate-600 mb-6">{tournament.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-semibold">Duration</div>
                    <div className="text-sm text-slate-600">{tournament.startDate} - {tournament.endDate}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-red-600" />
                  <div>
                    <div className="font-semibold">Location</div>
                    <div className="text-sm text-slate-600">{tournament.location}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-semibold">Prize Pool</div>
                    <div className="text-sm text-slate-600">{tournament.prizePool}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <Users className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{tournament.participants}</div>
                  <div className="text-sm opacity-90">Players</div>
                </div>
                <div>
                  <Trophy className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{tournament.events}</div>
                  <div className="text-sm opacity-90">Events</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tournament Content */}
        <Tabs defaultValue="matches" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="matches">Live Matches</TabsTrigger>
            <TabsTrigger value="draws">Draws & Brackets</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="space-y-4">
            <div className="grid gap-4">
              {tournamentMatches.map((match) => (
                <Card key={match.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline">{match.category}</Badge>
                          <Badge variant="secondary">{match.round}</Badge>
                          {match.status === 'live' && (
                            <Badge variant="destructive" className="animate-pulse">
                              <Play className="h-3 w-3 mr-1" />
                              LIVE
                            </Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                          <div className="text-lg font-semibold">{match.player1}</div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{match.score}</div>
                          </div>
                          <div className="text-lg font-semibold text-right md:text-left">{match.player2}</div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-6">
                        <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                          <Clock className="h-4 w-4" />
                          {match.time}
                        </div>
                        <div className="text-sm text-slate-600">{match.court}</div>
                        {match.status === 'live' && (
                          <Button size="sm" className="mt-2">
                            Watch Live
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="draws" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tournament Brackets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-500">
                  <Trophy className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Tournament brackets will be displayed here</p>
                  <p className="text-sm">Interactive bracket view coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Match Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-500">
                  <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Detailed schedule view will be displayed here</p>
                  <p className="text-sm">Day-by-day match timeline</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tournament Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-500">
                  <Trophy className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Final results and standings will be displayed here</p>
                  <p className="text-sm">Complete tournament outcomes</p>
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
