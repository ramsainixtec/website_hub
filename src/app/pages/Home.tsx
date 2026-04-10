import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Zap, Clock, Shield, Palette, Globe, Smartphone,
  Star, ArrowRight, CheckCircle2, Sparkles, Code2, Layers, MousePointerClick, Play
} from "lucide-react";

const heroImg1 = "https://images.unsplash.com/photo-1768541098191-b56a7c8117a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRpZ2l0YWwlMjBhZ2VuY3klMjB3b3Jrc3BhY2UlMjBuZW9ufGVufDF8fHx8MTc3NTcxMzQ1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const heroImg2 = "https://images.unsplash.com/photo-1619682508024-64c66726a373?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwd2ViJTIwZGV2ZWxvcG1lbnQlMjBjb2RlJTIwc2NyZWVuJTIwcHVycGxlfGVufDF8fHx8MTc3NTcxMzQ1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const heroImg3 = "https://images.unsplash.com/photo-1765830287239-43f592de98a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBncmFkaWVudCUyMGNvbG9yZnVsfGVufDF8fHx8MTc3NTcxMzQ1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const features = [
  { icon: Clock, title: "Ready in 2 Hours", desc: "Fill the form and get your website delivered within 2 hours!", color: "from-violet-500 to-purple-500" },
  { icon: Palette, title: "Custom Design", desc: "Unique designs tailored to match your brand identity", color: "from-fuchsia-500 to-pink-500" },
  { icon: Smartphone, title: "Mobile Friendly", desc: "Works perfectly on every device — phone, tablet, laptop", color: "from-sky-500 to-cyan-500" },
  { icon: Shield, title: "SSL Security", desc: "Free SSL certificate included with every website", color: "from-emerald-500 to-teal-500" },
  { icon: Globe, title: "Domain Setup", desc: "We handle domain registration and hosting setup for you", color: "from-amber-500 to-orange-500" },
  { icon: Zap, title: "Super Fast", desc: "Lightning-fast loading speed for better user experience", color: "from-rose-500 to-red-500" },
];

const stats = [
  { num: "500+", label: "Websites Delivered" },
  { num: "2 hrs", label: "Average Delivery" },
  { num: "98%", label: "Client Satisfaction" },
  { num: "24/7", label: "Support Available" },
];

const testimonials = [
  { name: "Harpreet Singh", biz: "Singh Electricals, Patiala", text: "Incredibly fast service! My website was ready in just 2 hours. Best value for money." },
  { name: "Priya Sharma", biz: "Priya's Salon, Delhi", text: "My salon website turned out so beautiful that customers were genuinely impressed. Highly recommend!" },
  { name: "Rahul Verma", biz: "Verma Properties, Mumbai", text: "Got a professional website at an affordable price. Now I'm getting online leads consistently." },
];

const pricing = [
  { name: "Starter", price: "$99", pages: "1-2 Pages", features: ["Responsive Design", "Contact Form", "WhatsApp Button", "SSL Certificate", "1 Revision"], popular: false },
  { name: "Professional", price: "$299", pages: "3-5 Pages", features: ["Everything in Starter", "Photo Gallery", "Google Maps", "SEO Optimized", "3 Revisions", "Social Media Links"], popular: true },
  { name: "Enterprise", price: "$599", pages: "5+ Pages", features: ["Everything in Professional", "Booking System", "E-Commerce Ready", "Blog Section", "Unlimited Revisions", "Priority Support"], popular: false },
];

export function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-violet-950 to-slate-950 min-h-[90vh] flex items-center">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-fuchsia-500/15 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[100px]" />
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 backdrop-blur-xl border border-violet-400/20 rounded-full px-5 py-2 text-sm mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-violet-300 font-medium">Website Ready in 2 Hours!</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-extrabold leading-[1.08] mb-6 text-white tracking-tight">
                We Build{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">Stunning</span>
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />
                </span>
                <br />
                Websites{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Fast</span>
              </h1>

              <p className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed">
                Take your business online in just 2 hours. Fill the form, pay securely, and we deliver a professional website straight to your inbox.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/get-started" className="group inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-4 rounded-2xl hover:shadow-2xl hover:shadow-violet-500/30 hover:scale-[1.03] transition-all duration-300 text-lg">
                  Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/portfolio" className="group inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 text-slate-300 px-8 py-4 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <Play className="w-4 h-4 text-violet-400" /> View Portfolio
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-6 items-center">
                {[
                  { icon: Zap, text: "Super Fast", color: "text-amber-400" },
                  { icon: Shield, text: "SSL Included", color: "text-emerald-400" },
                  { icon: Smartphone, text: "Mobile Ready", color: "text-sky-400" },
                ].map((b) => (
                  <div key={b.text} className="flex items-center gap-2 text-sm text-slate-500">
                    <b.icon className={`w-4 h-4 ${b.color}`} />
                    <span>{b.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right side - Floating cards composition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              {/* Main browser mockup */}
              <div className="relative z-10">
                <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-violet-500/10 overflow-hidden">
                  {/* Browser bar */}
                  <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="flex-1 mx-4 bg-white/5 rounded-lg px-4 py-1.5 text-xs text-slate-500 flex items-center gap-2">
                      <Globe className="w-3 h-3" /> yourwebsite.com
                    </div>
                  </div>
                  {/* Browser content */}
                  <div className="relative aspect-[16/10]">
                    <ImageWithFallback src={heroImg1} alt="Website preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                  </div>
                </div>
              </div>

              {/* Floating card - Code */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 z-20 bg-slate-900/90 backdrop-blur-xl rounded-xl border border-violet-500/20 p-4 shadow-xl shadow-violet-500/10"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="w-4 h-4 text-violet-400" />
                  <span className="text-xs font-semibold text-violet-300">Clean Code</span>
                </div>
                <div className="space-y-1.5 font-mono text-[10px]">
                  <div><span className="text-fuchsia-400">const</span> <span className="text-sky-300">website</span> = <span className="text-amber-300">{`{`}</span></div>
                  <div className="pl-3"><span className="text-emerald-400">speed</span>: <span className="text-amber-300">"blazing"</span>,</div>
                  <div className="pl-3"><span className="text-emerald-400">design</span>: <span className="text-amber-300">"stunning"</span></div>
                  <div><span className="text-amber-300">{`}`}</span></div>
                </div>
              </motion.div>

              {/* Floating card - Design */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -left-8 z-20 bg-slate-900/90 backdrop-blur-xl rounded-xl border border-fuchsia-500/20 p-4 shadow-xl shadow-fuchsia-500/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Pixel Perfect</p>
                    <p className="text-[10px] text-slate-400">Responsive Design</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating card - Stats */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -left-12 z-20 bg-slate-900/90 backdrop-blur-xl rounded-xl border border-emerald-500/20 p-4 shadow-xl shadow-emerald-500/10"
              >
                <div className="flex items-center gap-2 mb-1">
                  <MousePointerClick className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] text-slate-400">Conversion Rate</span>
                </div>
                <p className="text-lg font-extrabold text-emerald-400">+340%</p>
              </motion.div>

              {/* Floating mini image card */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute -top-2 left-8 z-0 w-24 h-24 rounded-xl overflow-hidden border border-white/10 shadow-lg opacity-60"
              >
                <ImageWithFallback src={heroImg3} alt="" className="w-full h-full object-cover" />
              </motion.div>

              {/* Second floating mini image */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-8 -right-4 z-0 w-20 h-20 rounded-xl overflow-hidden border border-white/10 shadow-lg opacity-50"
              >
                <ImageWithFallback src={heroImg2} alt="" className="w-full h-full object-cover" />
              </motion.div>
            </motion.div>

            {/* Mobile hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:hidden"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 to-fuchsia-500/20 rounded-3xl blur-2xl" />
                <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="flex-1 mx-3 bg-white/5 rounded-md px-3 py-1 text-[10px] text-slate-500">yourwebsite.com</div>
                  </div>
                  <ImageWithFallback src={heroImg1} alt="Website preview" className="w-full" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-extrabold bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">{s.num}</p>
                <p className="text-sm text-slate-400 mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 bg-violet-50 px-3 py-1 rounded-full mb-4">Features</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">Why Choose Us?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">We don't just build websites — we set up your complete online presence</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-7 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-lg">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-fuchsia-600 bg-fuchsia-50 px-3 py-1 rounded-full mb-4">Process</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">How Does It Work?</h2>
            <p className="text-slate-500">Your website ready in just 3 simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { step: "01", title: "Fill the Form", desc: "Enter your business details, page preferences, and design choices in our form", color: "from-violet-600 to-purple-600" },
              { step: "02", title: "Make Payment", desc: "Choose your plan and pay securely via Stripe payment gateway", color: "from-fuchsia-600 to-pink-600" },
              { step: "03", title: "Get Your Website!", desc: "We'll build and deliver your website via email within 2 hours", color: "from-amber-500 to-orange-500" },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center group"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white text-2xl font-extrabold mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  {s.step}
                </div>
                <h3 className="font-bold text-slate-900 text-xl mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-4">Pricing</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">Simple & Affordable Pricing</h2>
            <p className="text-slate-500">Fits every business budget — no hidden charges</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricing.map((p) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                  p.popular
                    ? "bg-gradient-to-br from-violet-600 via-fuchsia-600 to-purple-700 text-white shadow-2xl shadow-violet-300/30 scale-105 ring-4 ring-violet-200"
                    : "bg-white border border-slate-200 hover:shadow-xl hover:shadow-slate-200/50"
                }`}
              >
                {p.popular && <span className="inline-block bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full mb-4">MOST POPULAR</span>}
                <h3 className={`text-xl font-bold ${p.popular ? "" : "text-slate-900"}`}>{p.name}</h3>
                <p className={`text-sm mt-1 ${p.popular ? "text-violet-200" : "text-slate-400"}`}>{p.pages}</p>
                <p className="mt-5 mb-7"><span className="text-4xl font-extrabold">{p.price}</span></p>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${p.popular ? "text-violet-200" : "text-emerald-500"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/get-started"
                  className={`block text-center py-3 rounded-xl font-semibold transition-all duration-300 ${
                    p.popular
                      ? "bg-white text-violet-700 hover:bg-violet-50 hover:shadow-lg"
                      : "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white hover:shadow-lg hover:shadow-violet-200"
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full mb-4">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">Client Reviews</h2>
            <p className="text-slate-500">What our satisfied clients have to say</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-slate-50 to-violet-50/30 rounded-2xl p-7 border border-slate-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-600 text-sm mb-5 leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.biz}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-br from-slate-950 via-violet-950 to-slate-950">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-violet-500/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-fuchsia-500/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to Build Your Website?</h2>
          <p className="text-slate-400 mb-8 text-lg">Fill the form now and get your professional website in just 2 hours!</p>
          <Link to="/get-started" className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-9 py-4 rounded-xl hover:shadow-xl hover:shadow-violet-500/25 hover:scale-[1.02] transition-all duration-300 text-lg">
            Start Now — It's Easy <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}