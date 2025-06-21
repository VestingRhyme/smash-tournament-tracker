
import { Button } from "@/components/ui/button";
import { Search, TrendingUp, Trophy, Users } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            The Ultimate
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent block">
              Badminton Tournament
            </span>
            Management Platform
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Track live scores, manage tournaments, and follow your favorite players 
            in the most comprehensive badminton platform ever built.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-8 py-3">
              <Search className="mr-2 h-5 w-5" />
              Browse Tournaments
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-3">
              <Trophy className="mr-2 h-5 w-5" />
              Create Tournament
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <TrendingUp className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">1,200+</div>
                <div className="text-blue-200">Active Players</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <Trophy className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">85</div>
                <div className="text-blue-200">Live Tournaments</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <Users className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">15,000+</div>
                <div className="text-blue-200">Matches Played</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
