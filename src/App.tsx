
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Players from "./pages/Players";
import PlayerProfile from "./pages/PlayerProfile";
import EditPlayer from "./pages/EditPlayer";
import Rankings from "./pages/Rankings";
import League from "./pages/League";
import ClubProfile from "./pages/ClubProfile";
import TournamentDetails from "./pages/TournamentDetails";
import TournamentPlayerDetails from "./pages/TournamentPlayerDetails";
import EditTournament from "./pages/EditTournament";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPlayers from "./pages/AdminPlayers";
import AdminMatches from "./pages/AdminMatches";
import AdminTournaments from "./pages/AdminTournaments";
import AdminClubs from "./pages/AdminClubs";
import AdminFixtures from "./pages/AdminFixtures";
import NotFound from "./pages/NotFound";
import { AppProvider } from "./contexts/AppContext";
import { LeagueProvider } from "./contexts/LeagueContext";

function App() {
  return (
    <AppProvider>
      <LeagueProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/players" element={<Players />} />
            <Route path="/player/:id" element={<PlayerProfile />} />
            <Route path="/rankings" element={<Rankings />} />
            <Route path="/league" element={<League />} />
            <Route path="/club/:id" element={<ClubProfile />} />
            <Route path="/tournament/:id" element={<TournamentDetails />} />
            <Route path="/tournament/:tournamentId/player/:playerId" element={<TournamentPlayerDetails />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/players" element={<AdminPlayers />} />
            <Route path="/admin/player/edit/:id" element={<EditPlayer />} />
            <Route path="/admin/matches" element={<AdminMatches />} />
            <Route path="/admin/tournaments" element={<AdminTournaments />} />
            <Route path="/admin/tournament/edit/:id" element={<EditTournament />} />
            <Route path="/admin/clubs" element={<AdminClubs />} />
            <Route path="/admin/fixtures" element={<AdminFixtures />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </LeagueProvider>
    </AppProvider>
  );
}

export default App;
