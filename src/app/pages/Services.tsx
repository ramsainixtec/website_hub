import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  Globe, ShoppingCart, FileText, Briefcase, Utensils, Building2,
  Stethoscope, Dumbbell, Scissors, Truck, GraduationCap, ArrowRight
} from "lucide-react";

const services = [
  { icon: Globe, title: "Business Website", desc: "Professional website for any business — contact form, gallery, services page all included", price: "From $99", color: "from-violet-500 to-purple-500" },
  { icon: ShoppingCart, title: "E-Commerce Store", desc: "Online store with product catalog, cart, payment integration and order management", price: "From $499", color: "from-fuchsia-500 to-pink-500" },
  { icon: FileText, title: "Landing Page", desc: "Single page website for a specific campaign, offer or product promotion", price: "From $79", color: "from-sky-500 to-cyan-500" },
  { icon: Briefcase, title: "Portfolio Site", desc: "Showcase your work beautifully — perfect for photographers, designers and freelancers", price: "From $149", color: "from-amber-500 to-orange-500" },
];

const industries = [
  { icon: Utensils, name: "Restaurant / Cafe", desc: "Menu, online ordering, reservations" },
  { icon: Building2, name: "Real Estate", desc: "Property listings, virtual tours" },
  { icon: Stethoscope, name: "Healthcare / Clinic", desc: "Appointment booking, patient info" },
  { icon: Dumbbell, name: "Fitness / Gym", desc: "Class schedules, memberships" },
  { icon: Scissors, name: "Salon / Beauty", desc: "Service menu, booking system" },
  { icon: Truck, name: "Transport / Logistics", desc: "Tracking, fleet management" },
  { icon: GraduationCap, name: "Education / Coaching", desc: "Course listings, student portal" },
  { icon: Briefcase, name: "Legal / Finance", desc: "Consultation booking, case studies" },
];

const process = [
  { step: "1", title: "Requirements Form", desc: "Fill out our detailed form with all your preferences and business details", color: "from-violet-600 to-purple-600" },
  { step: "2", title: "Payment", desc: "Select your plan and pay securely via Stripe — everything is transparent, no hidden charges", color: "from-fuchsia-600 to-pink-600" },
  { step: "3", title: "Design & Development", desc: "Our team designs and develops your website — delivered within 2 hours", color: "from-sky-500 to-cyan-500" },
  { step: "4", title: "Delivery & Launch", desc: "Once ready, you'll receive an email — review it and go live", color: "from-amber-500 to-orange-500" },
];

export function Services() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-violet-950 to-slate-950 text-white py-24">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-fuchsia-500/15 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full mb-5">What We Offer</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Our Services</h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              We build every type of website — from simple business sites to full e-commerce stores
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-slate-50 to-violet-50/30 rounded-2xl p-8 border border-slate-100 hover:shadow-xl hover:shadow-violet-100/50 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-start gap-5">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <s.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
                    <p className="text-slate-500 text-sm mb-3 leading-relaxed">{s.desc}</p>
                    <p className="text-violet-600 font-bold text-lg">{s.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-fuchsia-600 bg-fuchsia-50 px-3 py-1 rounded-full mb-4">Industries</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">Industries We Serve</h2>
            <p className="text-slate-500">Customized website solutions for every industry</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/50 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-100 to-fuchsia-100 flex items-center justify-center mb-4">
                  <ind.icon className="w-5 h-5 text-violet-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{ind.name}</h3>
                <p className="text-xs text-slate-400">{ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-4">Process</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">Our Process</h2>
            <p className="text-slate-500">Simple 4-step process — from form to website</p>
          </div>
          <div className="space-y-8">
            {process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} text-white flex items-center justify-center font-extrabold text-lg flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {p.step}
                </div>
                <div className="pt-1">
                  <h3 className="font-bold text-slate-900 text-lg">{p.title}</h3>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-purple-700 text-white text-center">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready to Start?</h2>
          <p className="text-violet-100 mb-6 text-lg">Fill the form now and get your dream website</p>
          <Link to="/get-started" className="inline-flex items-center gap-2 bg-white text-violet-700 font-semibold px-8 py-3.5 rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
