import React from "react";
import { Link } from "react-router";
import { Sparkles, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center">
                <Sparkles className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">XTEC<span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Global</span></span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Professional website development service. Your website ready in 2 hours!
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <div className="space-y-2.5">
              {[["Home", "/"], ["Services", "/services"], ["Portfolio", "/portfolio"], ["About", "/about"]].map(([label, path]) => (
                <Link key={path} to={path} className="block text-sm text-slate-500 hover:text-violet-400 transition">{label}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <div className="space-y-2.5 text-sm text-slate-500">
              <p>Business Websites</p>
              <p>E-Commerce Stores</p>
              <p>Landing Pages</p>
              <p>Portfolio Sites</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <div className="space-y-3 text-sm text-slate-500">
              <div className="flex items-center gap-2.5"><Mail className="w-4 h-4 text-violet-400" /> sanant@xtecglobal.com</div>
              <div className="flex items-center gap-2.5"><Phone className="w-4 h-4 text-violet-400" /> +91 98765 43210</div>
              <div className="flex items-center gap-2.5"><MapPin className="w-4 h-4 text-violet-400" /> India & Australia</div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/50 mt-12 pt-6 text-center text-sm text-slate-600">
          &copy; {new Date().getFullYear()} XTEC Global. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
