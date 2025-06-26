
import { Link } from "react-router-dom";
import { Calendar, MapPin, Trophy, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/contexts/AppContext";

const Tournaments = () => {
  const { tournaments } = useAppContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Tournaments</h1>
          <p className="text-lg text-slate-600">Browse all available tournaments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((tournament) => (
            <Link key={tournament.id} to={`/tournament/${tournament.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">{tournament.name}</CardTitle>
                    <Badge 
                      variant={tournament.status === 'live' ? 'destructive' : 
                              tournament.status === 'upcoming' ? 'default' : 'secondary'}
                    >
                      {tournament.status}
                    </Badge>
                  </div>
                  <p className="text-slate-600">{tournament.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{tournament.startDate} - {tournament.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-red-600" />
                      <span className="text-sm">{tournament.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{tournament.participants} players</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm">{tournament.events} events</span>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-green-600">
                      Prize Pool: {tournament.prizePool}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {tournaments.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="h-16 w-16 mx-auto text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No tournaments found</h3>
            <p className="text-slate-500">Check back later for upcoming tournaments!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tournaments;
