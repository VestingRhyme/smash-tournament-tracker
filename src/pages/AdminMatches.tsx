
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trophy, ArrowLeft } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MatchForm from "@/components/MatchForm";

const AdminMatches = () => {
  const navigate = useNavigate();
  const { matches, addMatch } = useAppContext();

  const getMatchResult = (match: any) => {
    if (!match.score || match.score === "TBD") return null;
    
    const sets = match.score.split(',').map((s: string) => s.trim());
    let team1SetsWon = 0;
    let team2SetsWon = 0;
    
    sets.forEach((set: string) => {
      const [p1, p2] = set.split('-').map((s: string) => parseInt(s.trim()) || 0);
      if (p1 > p2) {
        team1SetsWon++;
      } else if (p2 > p1) {
        team2SetsWon++;
      }
    });
    
    return team1SetsWon > team2SetsWon ? 'Team 1' : 'Team 2';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <Button onClick={() => navigate("/admin")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin Dashboard
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Match Management</h1>
          <p className="text-gray-600">Add match results and manage match data</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add Match Results */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add Match Results
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <MatchForm onAddMatch={addMatch} />
            </CardContent>
          </Card>

          {/* Matches List */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                All Matches ({matches.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-4">Match</TableHead>
                    <TableHead className="px-4">Category</TableHead>
                    <TableHead className="px-4">Score</TableHead>
                    <TableHead className="px-4">Winner</TableHead>
                    <TableHead className="px-4">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matches.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                        No matches found
                      </TableCell>
                    </TableRow>
                  ) : (
                    matches.map((match) => {
                      const winner = getMatchResult(match);
                      return (
                        <TableRow key={match.id} className="hover:bg-gray-50">
                          <TableCell className="px-4 py-3">
                            <div className="font-medium text-sm">
                              {match.player1} vs {match.player2}
                            </div>
                            <div className="text-xs text-gray-500">{match.tournament}</div>
                          </TableCell>
                          <TableCell className="px-4 py-3 text-sm">{match.category}</TableCell>
                          <TableCell className="px-4 py-3 text-sm font-mono">{match.score}</TableCell>
                          <TableCell className="px-4 py-3 text-sm">
                            {winner ? (
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                winner === 'Team 1' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {winner === 'Team 1' ? match.player1.split(' vs ')[0] : match.player2.split(' vs ')[0]}
                              </span>
                            ) : (
                              <span className="text-gray-400">TBD</span>
                            )}
                          </TableCell>
                          <TableCell className="px-4 py-3 text-sm">
                            {new Date(match.date).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminMatches;
