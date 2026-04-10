import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Sparkles, Home, Briefcase, FolderOpen, Users, Rocket } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/", icon: Home },
  { label: "Services", path: "/services", icon: Briefcase },
  { label: "Portfolio", path: "/portfolio", icon: FolderOpen },
  { label: "About", path: "/about", icon: Users },
  { label: "Get Started", path: "/get-started", icon: Rocket },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Top navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-200">
                <Sparkles className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">XTEC<span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">Global</span></span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    location.pathname === l.path
                      ? "bg-violet-50 text-violet-700"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  } ${l.path === "/get-started" ? "!bg-gradient-to-r !from-violet-600 !to-fuchsia-500 !text-white hover:!shadow-lg hover:!shadow-violet-200 hover:!scale-[1.02] ml-2" : ""}`}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Mobile/Tablet hamburger */}
            <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-xl hover:bg-slate-50 text-slate-600">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar overlay (mobile/tablet only) */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar panel */}
      <aside
        className={`fixed top-0 left-0 z-[70] h-full w-72 bg-white/95 backdrop-blur-2xl shadow-2xl border-r border-slate-100 md:hidden transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-slate-100">
          <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-200">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">XTEC<span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">Global</span></span>
          </Link>
          <button onClick={() => setOpen(false)} className="p-2 rounded-xl hover:bg-slate-50 text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar nav links */}
        <nav className="flex flex-col gap-1 px-3 py-4">
          {navLinks.map((l) => {
            const Icon = l.icon;
            const isActive = location.pathname === l.path;
            const isGetStarted = l.path === "/get-started";

            return (
              <Link
                key={l.path}
                to={l.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isGetStarted
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-200 mt-3"
                    : isActive
                    ? "bg-violet-50 text-violet-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className={`w-5 h-5 ${isGetStarted ? "text-white" : isActive ? "text-violet-600" : "text-slate-400"}`} />
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-slate-100">
          <p className="text-xs text-slate-400 text-center">&copy; {new Date().getFullYear()} XTEC Global</p>
        </div>
      </aside>
    </>
  );
}
