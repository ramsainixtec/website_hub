import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Target, Heart, Zap, Users, ArrowRight } from "lucide-react";

const teamImg = "https://images.unsplash.com/photo-1758873271902-a63ecd5b5235?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjB0ZWFtJTIwd29ya2luZyUyMG1vZGVybiUyMG9mZmljZXxlbnwxfHx8fDE3NzU3MTEzNTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const values = [
  { icon: Zap, title: "Speed", desc: "Delivered in 2 hours — because your time is valuable", color: "from-violet-500 to-purple-500" },
  { icon: Heart, title: "Quality", desc: "Every website is pixel-perfect and professionally designed", color: "from-fuchsia-500 to-pink-500" },
  { icon: Target, title: "Affordability", desc: "Premium quality at budget-friendly prices — no hidden charges", color: "from-amber-500 to-orange-500" },
  { icon: Users, title: "Support", desc: "24/7 WhatsApp support — any question, anytime", color: "from-emerald-500 to-teal-500" },
];

const milestones = [
  { year: "2020", title: "Company Founded", desc: "XTEC Global was founded with a simple mission", color: "from-violet-600 to-purple-600" },
  { year: "2021", title: "100+ Websites", desc: "Delivered over 100 websites in our first year", color: "from-fuchsia-600 to-pink-600" },
  { year: "2023", title: "International Expansion", desc: "Started working with clients in Australia, UK and US", color: "from-sky-500 to-cyan-500" },
  { year: "2025", title: "500+ Clients", desc: "Helped over 500 businesses establish their online presence", color: "from-amber-500 to-orange-500" },
];

export function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-violet-950 to-slate-950 text-white py-24">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-violet-500/15 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mb-5">Our Story</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">About XTEC Global</h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              We provide affordable and professional websites to small businesses — all delivered within 2 hours
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 bg-violet-50 px-3 py-1 rounded-full mb-5">About Us</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-slate-500 leading-relaxed">
                <p>
                  XTEC Global started with a simple observation — many small businesses didn't have a website because
                  it was an expensive and time-consuming process.
                </p>
                <p>
                  We thought — if we could make this process so simple that any business owner could get their website
                  just by filling out a form, how many businesses could go online?
                </p>
                <p>
                  Today we've served over 500 businesses — in India, Australia, UK and the US. Our mission is:
                  <strong className="text-slate-800"> To bring every business online, affordably and quickly.</strong>
                </p>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-6">
                {[["500+", "Websites"], ["4+", "Countries"], ["98%", "Satisfaction"]].map(([num, label]) => (
                  <div key={label}>
                    <p className="text-3xl font-extrabold bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">{num}</p>
                    <p className="text-sm text-slate-400 mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-violet-200/40 to-fuchsia-200/40 rounded-3xl blur-2xl" />
                <ImageWithFallback src={teamImg} alt="Our team" className="relative rounded-2xl shadow-lg w-full" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-4">Values</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-7 border border-slate-100 text-center hover:shadow-xl hover:shadow-violet-100/50 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <v.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-lg">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full mb-4">Timeline</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">Our Journey</h2>
          </div>
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${m.color} text-white flex items-center justify-center font-extrabold flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {m.year}
                </div>
                <div className="pt-1">
                  <h3 className="font-bold text-slate-900 text-lg">{m.title}</h3>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-purple-700 text-white text-center">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Let's Build Something Great</h2>
          <p className="text-violet-100 mb-6 text-lg">Building your website is our job — let's get started!</p>
          <Link to="/get-started" className="inline-flex items-center gap-2 bg-white text-violet-700 font-semibold px-8 py-3.5 rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
