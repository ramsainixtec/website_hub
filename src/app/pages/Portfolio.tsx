import React, { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ExternalLink, ArrowRight } from "lucide-react";

const portfolioImg1 = "https://images.unsplash.com/photo-1762330464006-46181dfe3381?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdlYnNpdGUlMjBkZXNpZ258ZW58MXx8fHwxNzc1NzExMzUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const portfolioImg2 = "https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwc2hvcHBpbmclMjBvbmxpbmV8ZW58MXx8fHwxNzc1NzExMzU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const portfolioImg3 = "https://images.unsplash.com/photo-1544025162-d76694265947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwd2Vic2l0ZSUyMG1lbnUlMjBmb29kfGVufDF8fHx8MTc3NTcxMTM1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const portfolioImg4 = "https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwcHJvcGVydHklMjB3ZWJzaXRlfGVufDF8fHx8MTc3NTYyNzgwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const portfolioImg5 = "https://images.unsplash.com/photo-1758873271902-a63ecd5b5235?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjB0ZWFtJTIwd29ya2luZyUyMG1vZGVybiUyMG9mZmljZXxlbnwxfHx8fDE3NzU3MTEzNTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const categories = ["All", "Business", "E-Commerce", "Restaurant", "Real Estate"];

const projects = [
  { id: 1, title: "Singh Electricals", category: "Business", desc: "Professional electrical services website with booking system", img: portfolioImg1, tech: ["React", "Tailwind", "Node.js"] },
  { id: 2, title: "Fashion Hub Store", category: "E-Commerce", desc: "Complete online fashion store with cart and payment", img: portfolioImg2, tech: ["Next.js", "Stripe", "MongoDB"] },
  { id: 3, title: "Spice Garden", category: "Restaurant", desc: "Restaurant website with online menu and table booking", img: portfolioImg3, tech: ["React", "Firebase", "Tailwind"] },
  { id: 4, title: "Dream Properties", category: "Real Estate", desc: "Property listing website with search and virtual tours", img: portfolioImg4, tech: ["React", "Supabase", "Maps API"] },
  { id: 5, title: "TechCorp Solutions", category: "Business", desc: "Corporate website for IT consulting firm", img: portfolioImg5, tech: ["React", "Tailwind", "Vercel"] },
  { id: 6, title: "Urban Bites", category: "Restaurant", desc: "Modern cafe website with online ordering", img: portfolioImg3, tech: ["React", "Tailwind", "Stripe"] },
];

export function Portfolio() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-violet-950 to-slate-950 text-white py-24">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-violet-500/15 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-fuchsia-400 bg-fuchsia-500/10 border border-fuchsia-500/20 px-3 py-1 rounded-full mb-5">Our Work</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Our Portfolio</h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              See what we've built — 500+ websites delivered across industries
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-14">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === cat
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-200"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-violet-100/50 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback src={p.img} alt={p.title} className="w-full h-52 object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-5">
                    <span className="text-white text-sm font-medium flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                      <ExternalLink className="w-3.5 h-3.5" /> View Project
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs text-violet-600 font-semibold bg-violet-50 px-2.5 py-1 rounded-full">{p.category}</span>
                  <h3 className="font-bold text-slate-900 mt-3 mb-1 text-lg">{p.title}</h3>
                  <p className="text-sm text-slate-500 mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span key={t} className="text-xs bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded-md font-medium">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-purple-700 text-white text-center">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/3 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Want a Website Like These?</h2>
          <p className="text-violet-100 mb-6 text-lg">Fill the form now and let us build your dream website</p>
          <Link to="/get-started" className="inline-flex items-center gap-2 bg-white text-violet-700 font-semibold px-8 py-3.5 rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
