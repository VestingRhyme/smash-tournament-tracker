
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Play } from "lucide-react";

interface TournamentMatchesProps {
  tournament: any;
  tournamentMatches: any[];
  participatingPlayers: any[];
  onUpdateMatch: (matchId: string, updates: any) => void;
}

const TournamentMatches = ({ 
  tournament, 
  tournamentMatches, 
  participatingPlayers, 
  onUpdateMatch 
}: TournamentMatchesProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingMatch, setEditingMatch] = useState<string | null>(null);
  const [matchUpdates, setMatchUpdates] = useState<{[key: string]: any}>({});

  const getMatchStatus = (match: any) => {
    if (match.score && match.score !== "Not started") {
      return "completed";
    }
    return "scheduled";
  };

  const handleScoreUpdate = (matchId: string, score: string) => {
    setMatchUpdates(prev => ({
      ...prev,
      [matchId]: { ...prev[matchId], score }
    }));
  };

  const saveMatchUpdate = (matchId: string) => {
    if (matchUpdates[matchId]) {
      onUpdateMatch(matchId, matchUpdates[matchId]);
    }
    setEditingMatch(null);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
          <Play className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
          Tournament Matches
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Match</TableHead>
              <TableHead>Round</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Status</TableHead>
              {isEditing && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tournamentMatches.map((match) => (
              <TableRow key={match.id}>
                <TableCell>
                  <div className="font-medium">
                    <Link 
                      to={`/tournament/${tournament.id}/player/${participatingPlayers.find(p => match.player1.includes(p.name))?.id}`}
                      className="hover:text-blue-600"
                    >
                      {match.player1}
                    </Link>
                    {" vs "}
                    <Link 
                      to={`/tournament/${tournament.id}/player/${participatingPlayers.find(p => match.player2.includes(p.name))?.id}`}
                      className="hover:text-blue-600"
                    >
                      {match.player2}
                    </Link>
                  </div>
                  <div className="text-sm text-slate-600">{match.category}</div>
                </TableCell>
                <TableCell>{match.round || "Round 1"}</TableCell>
                <TableCell>
                  {isEditing && editingMatch === match.id ? (
                    <div className="flex gap-2">
                      <Input
                        value={matchUpdates[match.id]?.score || match.score || ""}
                        onChange={(e) => handleScoreUpdate(match.id, e.target.value)}
                        placeholder="21-19, 21-15"
                        className="w-32"
                      />
                      <Button 
                        size="sm" 
                        onClick={() => saveMatchUpdate(match.id)}
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    match.score || "Not started"
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={getMatchStatus(match) === 'completed' ? 'default' : 'secondary'}>
                    {getMatchStatus(match)}
                  </Badge>
                </TableCell>
                {isEditing && (
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingMatch(match.id)}
                    >
                      Edit Score
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TournamentMatches;
