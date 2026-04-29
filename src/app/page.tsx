import Link from "next/link";
import {
  Activity,
  Tv,
  Users,
  BarChart3,
  Zap,
  Shield,
  ChevronRight,
  Monitor,
  Smartphone
} from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-7 w-7 text-emerald-400"/>
            <span className="text-xl font-bold tracking-tight">CrickCast</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <a href="#feature" className="hover:text-white transition">Features</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a href="demo" className="hover:text-white transition">Demo</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href={"/login"} className="text-sm text-zinc-300 hover:text-white transition px-4 py-2" >
              Sign In
            </Link>
            <Link href={"/register"} className="text-sm bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-5 py-2 rounded-full transition" >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-sm text-emerald-400 mb-6">
            <Zap className="w-3.5 h-3.5" />
            Real-Time Cricket Scoring & Overlay
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Professional Cricket
            <br />
            <span className="text-emerald-400">Overlay System</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Score matches ball-by-ball, generate stunning live overlays for OBS & streaming, manage teams, players, and tournaments - all from one powerful dashboard.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={"/register"} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-8 py-3 rounded-full text-base transition">
              Start Free Trail
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href={"demo"} className="flex items-center gap-2 border border-white/20 hover:border-white/40 px-8 py-3 rounded-full text-base transition">
              <Monitor className="w-4 h-4" />
              Watch Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-white/10 px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl hover:text-4xl font-bold text-center mb-4">
            Everything you need
          </h2>
          <p className="text-zinc-400 text-center mb-16 max-w-xl mx-auto">
            Built for cricket enthusiasts, broadcasters, and tournament organizers who demand professional quality.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Activity,
                title: "Live Ball-by-Ball Scoring",
                desc: "Real-time scoring with undo, extras, wickets, DLS Support, powerplay tracking, and full ball-by-ball commentary."
              },
              {
                icon: Tv,
                title: "OBS-Ready Overlays",
                desc: "Beautiful browser-source overlays for scorecards, lower thirds, wagons, Manhattan charts - plug into OBS/StreamYard instantly."
              },
              {
                icon: Users,
                title: "Team & Player Management",
                desc: "Full roster management with player stats, batting/bowling profiles, photos, jersey numbers, and career records."
              },
              {
                icon: BarChart3,
                title: "Deep Analytics",
                desc: "Run rates, partnership graphs, Manhattan/Worm charts, head-to-head records, venue stats, and more."
              },
              {
                icon: Shield,
                title: "Multi-Role Access",
                desc: "Admin, Scorer, Commentator, Analyst roles, Assign scorers to matches. Each role sees only what they need."
              },
              {
                icon: Smartphone,
                title: "Mobile-Friendly Scorer",
                desc: "Scorers can update live from the ground on any mobile device. Responsive scorer panel built for touch."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 hover:border-emerald-500/20 transition">
                <feature.icon className="h-10 w-10 text-emerald-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{ feature.title }</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  { feature.desc }
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-white/10 px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">simple pricing</h2>
          <p className="text-zinc-400 text-center mb-16">
            Start free, upgrade when you grow.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                name: "Free",
                price: "$0",
                features: ["2 Tournaments", "5 Matches/mo", "4 Teams", "1 Scorer", "CrickCast Branding"]
              },
              {
                name: "Starter",
                price: "$19",
                features: ["5 Tournaments", "15 Matches/mo", "10 Teams", "2 Scorer", "Branding Removed"]
              },
              {
                name: "Pro",
                price: "$49",
                popular: true,
                features: ["10 Tournaments", "50 Matches/mo", "20 Teams", "5 Scorer", "Custom Overlays", "API Access"]
              },
              {
                name: "Enterprise",
                price: "Custom",
                features: ["Unlimited Everything", "Priority Support", "Custom Integration", "Dedicated Account Mgr"]
              }
            ].map((plan, i) => (
              <div key={i} className={`rounded-2xl p-6 border ${
                plan.popular ? "border-emerald-500 ring-1 ring-emerald-500/20" : "border-white/10 bg-zinc-900/50"
              }`}>
                { plan.popular && (
                  <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                    Most Popular
                  </div>
                ) }
                <h3 className="text-lg font-semibold">{plan.name}</h3>

                <div className="text-3xl font-bold mt-2 mb-4">
                  {plan.price}
                  {plan.price !== "Custom" && (
                    <span className="text-sm text-zinc-400 font-normal">
                      /mo
                    </span>
                  )}
                </div>
                <ul className="text-sm text-zinc-400 space-y-2">
                  {
                    plan.features.map((f, j) => (
                      <li className="flex items-center gap-2">
                        <div />
                        {f}
                      </li>
                    ))
                  }
                </ul>
                <Link href={"/register"} className={`block text-center mt-6 py-2 rounded-full text-sm font-semibold transition 
                  ${plan.popular ? "bg-emerald-500 hover:bg-emerald-600 text-black" : "border border-white/20 hover:border-white/40"}`}>Get Started</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-emerald-400" />
            <span className="font-semibold">CrickCast</span>
          </div>
          <p className="text-sm text-zinc-500">
            @2026 CrickCast. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
