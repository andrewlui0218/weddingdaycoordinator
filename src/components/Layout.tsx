import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Package, 
  Users, 
  Info, 
  Phone, 
  Map, 
  Camera,
  Menu, 
  X,
  LogOut,
  LogIn
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../lib/AuthContext';

const navItems = [
  { to: '/', icon: Calendar, label: 'Overall Timetable' },
  { to: '/helper-timetable', icon: Clock, label: 'Helper Timetable' },
  { to: '/materials', icon: Package, label: 'Material List' },
  { to: '/guests', icon: Users, label: 'Guest List' },
  { to: '/hotel-info', icon: Info, label: 'Hotel Room Info' },
  { to: '/contacts', icon: Phone, label: 'Contact List' },
  { to: '/useful-info', icon: Map, label: 'Useful Info' },
  { to: '/photo-list', icon: Camera, label: 'Photo List' },
];

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signIn, signOut } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[980px] h-[calc(100vh-2rem)] md:h-[720px] bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-3xl flex flex-col md:flex-row shadow-[0_40px_80px_rgba(0,0,0,0.05)] overflow-hidden relative">
        
        {/* Mobile Header */}
        <div className="md:hidden border-b border-glass-border p-4 flex items-center justify-between z-20 bg-glass-bg backdrop-blur-md">
          <h1 className="text-xl font-serif italic text-accent-gold">Christy & Andrew</h1>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 -mr-2 text-text-muted hover:text-text-main"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className={cn(
          "absolute md:relative inset-y-0 left-0 z-10 w-64 border-r border-glass-border transform transition-transform duration-200 ease-in-out md:translate-x-0 bg-white/40 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none flex flex-col pt-16 md:pt-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="p-10 hidden md:block">
            <h1 className="text-2xl font-serif italic text-accent-gold mb-10">Christy & Andrew</h1>
          </div>
          <div className="flex flex-col px-6 pb-6 flex-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-3 mb-2 rounded-xl text-sm font-medium transition-all",
                  isActive 
                    ? "bg-white/60 text-text-main shadow-[0_4px_12px_rgba(0,0,0,0.03)]" 
                    : "text-text-muted hover:bg-white/40 hover:text-text-main"
                )}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="p-6 mt-auto border-t border-glass-border/50">
            {user ? (
              <button 
                onClick={signOut}
                className="flex items-center px-4 py-3 w-full rounded-xl text-sm font-medium text-text-muted hover:bg-white/40 hover:text-text-main transition-all"
              >
                <LogOut className="mr-3 h-4 w-4" />
                Sign Out
              </button>
            ) : (
              <button 
                onClick={signIn}
                className="flex items-center px-4 py-3 w-full rounded-xl text-sm font-medium text-text-main bg-white/60 hover:bg-white/80 shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all"
              >
                <LogIn className="mr-3 h-4 w-4" />
                Sign In
              </button>
            )}
          </div>
        </nav>

        {/* Overlay for mobile */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/10 z-0 md:hidden backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
