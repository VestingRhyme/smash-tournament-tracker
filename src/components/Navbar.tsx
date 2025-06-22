
import { Link, useLocation } from "react-router-dom";
import { Trophy, Users, BarChart3, Settings, Home, Target } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Trophy className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-slate-800">BadmintonPro</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                isActive('/') ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/rankings"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                isActive('/rankings') ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Rankings</span>
            </Link>
            
            <Link
              to="/players"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                isActive('/players') ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Players</span>
            </Link>
            
            <Link
              to="/league"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                isActive('/league') ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              <Target className="h-4 w-4" />
              <span>League</span>
            </Link>
            
            <Link
              to="/admin"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                isActive('/admin') ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>Admin</span>
            </Link>
          </div>
          
          <div className="md:hidden">
            <button className="text-slate-600">
              <Users className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
