
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import { LeagueProvider } from "./contexts/LeagueContext";
import Index from "./pages/Index";
import TournamentDetails from "./pages/TournamentDetails";
import PlayerProfile from "./pages/PlayerProfile";
import AdminDashboard from "./pages/AdminDashboard";
import EditTournament from "./pages/EditTournament";
import EditPlayer from "./pages/EditPlayer";
import Rankings from "./pages/Rankings";
import Players from "./pages/Players";
import League from "./pages/League";
import ClubProfile from "./pages/ClubProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <LeagueProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tournament/:id" element={<TournamentDetails />} />
              <Route path="/player/:id" element={<PlayerProfile />} />
              <Route path="/club/:id" element={<ClubProfile />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/tournament/edit/:id" element={<EditTournament />} />
              <Route path="/admin/player/edit/:id" element={<EditPlayer />} />
              <Route path="/rankings" element={<Rankings />} />
              <Route path="/players" element={<Players />} />
              <Route path="/league" element={<League />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LeagueProvider>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
