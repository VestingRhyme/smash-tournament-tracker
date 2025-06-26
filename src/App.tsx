
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AppProvider } from "@/contexts/AppContext";
import { LeagueProvider } from "@/contexts/LeagueContext";
import Index from "@/pages/Index";
import Rankings from "@/pages/Rankings";
import Players from "@/pages/Players";
import PlayerProfile from "@/pages/PlayerProfile";
import League from "@/pages/League";
import Tournaments from "@/pages/Tournaments";
import TournamentDetails from "@/pages/TournamentDetails";
import TournamentPlayerDetails from "@/pages/TournamentPlayerDetails";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminPlayers from "@/pages/AdminPlayers";
import AdminTournaments from "@/pages/AdminTournaments";
import AdminMatches from "@/pages/AdminMatches";
import AdminFixtures from "@/pages/AdminFixtures";
import AdminClubs from "@/pages/AdminClubs";
import EditPlayer from "@/pages/EditPlayer";
import EditTournament from "@/pages/EditTournament";
import ClubProfile from "@/pages/ClubProfile";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <LeagueProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/rankings" element={<Rankings />} />
              <Route path="/players" element={<Players />} />
              <Route path="/player/:id" element={<PlayerProfile />} />
              <Route path="/league" element={<League />} />
              <Route path="/tournaments" element={<Tournaments />} />
              <Route path="/tournament/:id" element={<TournamentDetails />} />
              <Route path="/tournament/:tournamentId/player/:playerId" element={<TournamentPlayerDetails />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/players" element={<AdminPlayers />} />
              <Route path="/admin/tournaments" element={<AdminTournaments />} />
              <Route path="/admin/matches" element={<AdminMatches />} />
              <Route path="/admin/fixtures" element={<AdminFixtures />} />
              <Route path="/admin/clubs" element={<AdminClubs />} />
              <Route path="/admin/player/edit/:id" element={<EditPlayer />} />
              <Route path="/admin/tournament/edit/:id" element={<EditTournament />} />
              <Route path="/club/:id" element={<ClubProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          <Toaster />
        </LeagueProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
