import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Sparkles } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "About", path: "/about" },
  { label: "Get Started", path: "/get-started" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-200">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">XTEC<span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">Global</span></span>
          </Link>

          {/* Desktop */}
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

          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-xl hover:bg-slate-50 text-slate-600">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 px-4 py-3 space-y-1">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                location.pathname === l.path
                  ? "bg-violet-50 text-violet-700"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
