
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shuttle, Settings } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Shuttle className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BadmintonTourney
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-slate-700 hover:text-blue-600 transition-colors">
              Tournaments
            </Link>
            <Link to="/rankings" className="text-slate-700 hover:text-blue-600 transition-colors">
              Rankings
            </Link>
            <Link to="/players" className="text-slate-700 hover:text-blue-600 transition-colors">
              Players
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <Link to="/admin">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
