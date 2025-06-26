
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/contexts/AppContext";

const TournamentPlayerDetails = () => {
  const { tournamentId, playerId } = useParams();
  const navigate = useNavigate();
  const { tournaments, matches, players } = useAppContext();
  
  const tournament = tournaments.find(t => t.id === tournamentId);
  const player = players.find(p => p.id === playerId);
  
  if (!tournament || !player) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-slate-800">Player or Tournament not found</h1>
          <Button onClick={() => navigate(-1)} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Get player's matches in this tournament
  const playerTournamentMatches = matches.filter(match => 
    match.tournament === tournament.name && 
    (match.player1.includes(player.name) || match.player2.includes(player.name))
  );

  // Calculate win/loss ratio
  const completedMatches = playerTournamentMatches.filter(match => 
    match.score && match.score !== "Not started"
  );
  const wins = completedMatches.filter(match => {
    if (match.player1.includes(player.name)) {
      return match.score && match.score.split('-')[0] > match.score.split('-')[1];
    } else {
      return match.score && match.score.split('-')[1] > match.score.split('-')[0];
    }
  }).length;
  const losses = completedMatches.length - wins;

  const getMatchStatus = (match: any) => {
    if (match.score && match.score !== "Not started") {
      return "completed";
    }
    return "scheduled";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button onClick={() => navigate(`/tournament/${tournamentId}`)} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tournament
          </Button>
        </div>

        {/* Player Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {player.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">{player.name}</h1>
              <p className="text-lg text-slate-600">in {tournament.name}</p>
            </div>
          </div>
        </div>

        {/* Tournament Performance Stats */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              Tournament Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{wins}</div>
                <div className="text-sm text-slate-600">Wins</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{losses}</div>
                <div className="text-sm text-slate-600">Losses</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{playerTournamentMatches.length}</div>
                <div className="text-sm text-slate-600">Total Matches</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {completedMatches.length > 0 ? Math.round((wins / completedMatches.length) * 100) : 0}%
                </div>
                <div className="text-sm text-slate-600">Win Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tournament Matches */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              Tournament Matches
            </CardTitle>
          </CardHeader>
          <CardContent>
            {playerTournamentMatches.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No matches found for this player in this tournament</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Opponent</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Round</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {playerTournamentMatches.map((match) => {
                    const isPlayer1 = match.player1.includes(player.name);
                    const opponent = isPlayer1 ? match.player2 : match.player1;
                    
                    let result = "TBD";
                    if (getMatchStatus(match) === 'completed' && match.score) {
                      const scores = match.score.split('-');
                      const playerScore = isPlayer1 ? parseInt(scores[0]) : parseInt(scores[1]);
                      const opponentScore = isPlayer1 ? parseInt(scores[1]) : parseInt(scores[0]);
                      result = playerScore > opponentScore ? "Win" : "Loss";
                    }

                    return (
                      <TableRow key={match.id}>
                        <TableCell className="font-medium">{opponent}</TableCell>
                        <TableCell>{match.category}</TableCell>
                        <TableCell>{match.round || "Round 1"}</TableCell>
                        <TableCell>{match.score || "Not started"}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={result === "Win" ? "default" : result === "Loss" ? "destructive" : "secondary"}
                          >
                            {result}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getMatchStatus(match) === 'completed' ? 'default' : 'secondary'}>
                            {getMatchStatus(match)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TournamentPlayerDetails;
