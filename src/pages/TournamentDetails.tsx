
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar, MapPin, Trophy, Users, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/contexts/AppContext";
import TournamentOverview from "@/components/tournament/TournamentOverview";
import TournamentPlayers from "@/components/tournament/TournamentPlayers";
import TournamentMatches from "@/components/tournament/TournamentMatches";
import TournamentDraws from "@/components/tournament/TournamentDraws";
import TournamentWinners from "@/components/tournament/TournamentWinners";

const TournamentDetails = () => {
  const { id } = useParams();
  const { tournaments, matches, players, updateTournament, updateMatch } = useAppContext();
  const tournament = tournaments.find(t => t.id === id);
  const [winners, setWinners] = useState([
    { event: "Men's Doubles", winner: "Player A", runnerUp: "Player B" },
    { event: "Women's Doubles", winner: "Player C", runnerUp: "Player D" },
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

  const handleUpdateTournament = (updatedTournament: any) => {
    updateTournament(tournament.id, updatedTournament);
  };

  const handleAddPlayer = (playerId: string) => {
    // Logic to add player to tournament
    console.log("Adding player to tournament:", playerId);
  };

  const handleRemovePlayer = (playerId: string) => {
    // Logic to remove player from tournament
    console.log("Removing player from tournament:", playerId);
  };

  const handleUpdateMatch = (matchId: string, updates: any) => {
    updateMatch(matchId, updates);
  };

  const handleGenerateDraw = (format: string, selectedPlayers: string[]) => {
    console.log("Generating draw:", format, selectedPlayers);
  };

  const handleAddWinner = (winner: any) => {
    setWinners(prev => [...prev, winner]);
  };

  const handleRemoveWinner = (index: number) => {
    setWinners(prev => prev.filter((_, i) => i !== index));
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
                  {tournament.status || 'upcoming'}
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
            <TournamentOverview
              tournament={tournament}
              participatingPlayers={participatingPlayers}
              tournamentMatches={tournamentMatches}
              onUpdateTournament={handleUpdateTournament}
            />
          </TabsContent>

          <TabsContent value="players" className="space-y-4">
            <TournamentPlayers
              tournament={tournament}
              participatingPlayers={participatingPlayers}
              allPlayers={players}
              onAddPlayer={handleAddPlayer}
              onRemovePlayer={handleRemovePlayer}
            />
          </TabsContent>

          <TabsContent value="matches" className="space-y-4">
            <TournamentMatches
              tournament={tournament}
              tournamentMatches={tournamentMatches}
              participatingPlayers={participatingPlayers}
              onUpdateMatch={handleUpdateMatch}
            />
          </TabsContent>

          <TabsContent value="draws" className="space-y-4">
            <TournamentDraws
              tournament={tournament}
              participatingPlayers={participatingPlayers}
              onGenerateDraw={handleGenerateDraw}
            />
          </TabsContent>

          <TabsContent value="winners" className="space-y-4">
            <TournamentWinners
              tournament={tournament}
              participatingPlayers={participatingPlayers}
              winners={winners}
              onAddWinner={handleAddWinner}
              onRemoveWinner={handleRemoveWinner}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TournamentDetails;
