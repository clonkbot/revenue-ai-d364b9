import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Animated counter component
function AnimatedCounter({ target, duration = 2000, prefix = '', suffix = '' }: { target: number; duration?: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// Revenue pulse animation
function RevenuePulse() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(245,166,35,0.1) 0%, transparent 70%)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

// Metric card component
function MetricCard({ title, value, change, icon, delay }: { title: string; value: string; change: string; icon: string; delay: number }) {
  const isPositive = change.startsWith('+');
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-[#141414] border border-white/5 rounded-2xl p-4 md:p-6 hover:border-amber-500/30 transition-all duration-500">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <span className="text-gray-500 text-xs md:text-sm font-medium tracking-wider uppercase">{title}</span>
          <span className="text-xl md:text-2xl">{icon}</span>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2 font-display">{value}</div>
        <div className={`text-xs md:text-sm font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
          {change} from last month
        </div>
      </div>
    </motion.div>
  );
}

// Feature card component
function FeatureCard({ title, description, icon, delay }: { title: string; description: string; icon: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
    >
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-white/5 rounded-3xl p-5 md:p-8 h-full hover:border-amber-500/20 transition-all duration-500">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 font-display">{title}</h3>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

// Live activity feed
function ActivityFeed() {
  const activities = [
    { user: 'Sarah K.', action: 'hit $50K MRR milestone', time: '2m ago', amount: '+$12,000' },
    { user: 'Marcus T.', action: 'closed enterprise deal', time: '5m ago', amount: '+$45,000' },
    { user: 'Elena R.', action: 'launched pricing tier', time: '8m ago', amount: '+$8,500' },
    { user: 'James W.', action: 'automated outreach', time: '12m ago', amount: '+$22,000' },
    { user: 'Priya M.', action: 'scaled ad spend', time: '15m ago', amount: '+$31,000' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="bg-[#141414] border border-white/5 rounded-2xl p-4 md:p-6 overflow-hidden"
    >
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        <span className="text-gray-400 text-xs md:text-sm font-medium tracking-wider uppercase">Live Activity</span>
      </div>
      <div className="space-y-3 md:space-y-4">
        {activities.map((activity, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 + i * 0.1 }}
            className="flex items-center justify-between py-2 md:py-3 border-b border-white/5 last:border-0"
          >
            <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-black text-xs font-bold flex-shrink-0">
                {activity.user.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-white text-xs md:text-sm font-medium truncate block">{activity.user}</span>
                <span className="text-gray-500 text-xs truncate block">{activity.action}</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0 ml-2">
              <div className="text-emerald-400 text-xs md:text-sm font-bold">{activity.amount}</div>
              <div className="text-gray-600 text-xs">{activity.time}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Main MRR Display
function MRRDisplay() {
  const [currentMRR, setCurrentMRR] = useState(67432);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMRR(prev => prev + Math.floor(Math.random() * 500) + 100);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 blur-3xl" />
      <div className="relative bg-[#111111] border border-amber-500/20 rounded-3xl p-6 md:p-10 lg:p-12 text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-amber-500 text-xs md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] mb-3 md:mb-4"
        >
          YOUR PROJECTED MRR
        </motion.div>
        <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-3 md:mb-4 font-display tracking-tight">
          $<AnimatedCounter target={currentMRR} duration={2000} />
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm md:text-base">
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            +32.5% growth rate
          </span>
          <span className="text-gray-500">on track for $100K</span>
        </div>
        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold rounded-xl text-sm md:text-base hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-500/25"
          >
            Accelerate to $100K
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 md:px-8 py-3 md:py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-sm md:text-base hover:bg-white/10 transition-all duration-300"
          >
            View Roadmap
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// Navigation
function Navigation({ mobileMenuOpen, setMobileMenuOpen }: { mobileMenuOpen: boolean; setMobileMenuOpen: (open: boolean) => void }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
            <span className="text-black font-bold text-lg md:text-xl">R</span>
          </div>
          <span className="text-white font-bold text-lg md:text-xl font-display">REVENUE.AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Features</a>
          <a href="#pricing" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Pricing</a>
          <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Success Stories</a>
          <button className="px-5 py-2.5 bg-white text-black font-bold rounded-lg text-sm hover:bg-gray-100 transition-colors">
            Start Free Trial
          </button>
        </div>
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#111111] border-t border-white/5"
          >
            <div className="px-4 py-6 space-y-4">
              <a href="#features" className="block text-gray-400 hover:text-white transition-colors text-base font-medium py-2">Features</a>
              <a href="#pricing" className="block text-gray-400 hover:text-white transition-colors text-base font-medium py-2">Pricing</a>
              <a href="#testimonials" className="block text-gray-400 hover:text-white transition-colors text-base font-medium py-2">Success Stories</a>
              <button className="w-full px-5 py-3 bg-white text-black font-bold rounded-lg text-base hover:bg-gray-100 transition-colors">
                Start Free Trial
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-body overflow-x-hidden">
      <Navigation mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[128px]" />
        <RevenuePulse />
      </div>

      {/* Main content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-28 md:pt-32 lg:pt-40 pb-16 md:pb-20 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-10 md:mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 mb-6 md:mb-8">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                <span className="text-amber-500 text-xs md:text-sm font-medium">$100B+ Revenue Generated</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 font-display tracking-tight leading-tight">
                Your Path to<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">$100K MRR</span>
              </h1>
              <p className="text-gray-400 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-4">
                AI-powered revenue intelligence that predicts, optimizes, and accelerates your path to six-figure monthly recurring revenue.
              </p>
            </motion.div>

            <MRRDisplay />

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mt-10 md:mt-16">
              <MetricCard title="Conversion Rate" value="12.8%" change="+4.2%" icon="📈" delay={0.6} />
              <MetricCard title="Active Users" value="24,891" change="+18.3%" icon="👥" delay={0.7} />
              <MetricCard title="Avg. Deal Size" value="$4,250" change="+22.1%" icon="💎" delay={0.8} />
              <MetricCard title="Churn Rate" value="2.1%" change="-0.8%" icon="🎯" delay={0.9} />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 lg:py-32 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 font-display">Revenue Acceleration Suite</h2>
              <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto">Every tool you need to hit $100K MRR, powered by cutting-edge AI</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <FeatureCard
                title="Predictive Analytics"
                description="AI models that forecast your revenue trajectory with 94% accuracy, identifying growth opportunities before they emerge."
                icon="🔮"
                delay={0.1}
              />
              <FeatureCard
                title="Smart Pricing Engine"
                description="Dynamic pricing optimization that maximizes your ARPU while maintaining competitive positioning in real-time."
                icon="⚡"
                delay={0.2}
              />
              <FeatureCard
                title="Churn Prevention"
                description="Identify at-risk customers 30 days in advance with AI-powered signals and automated win-back campaigns."
                icon="🛡️"
                delay={0.3}
              />
              <FeatureCard
                title="Revenue Attribution"
                description="Multi-touch attribution modeling that reveals exactly which channels drive your highest-value customers."
                icon="🎯"
                delay={0.4}
              />
              <FeatureCard
                title="Expansion Intelligence"
                description="Surface upsell and cross-sell opportunities with perfect timing recommendations for each account."
                icon="🚀"
                delay={0.5}
              />
              <FeatureCard
                title="Growth Playbooks"
                description="AI-generated playbooks based on what's working for similar companies at your stage. No more guesswork."
                icon="📚"
                delay={0.6}
              />
            </div>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Revenue Chart */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#141414] border border-white/5 rounded-2xl p-4 md:p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                  <div>
                    <h3 className="text-white text-lg md:text-xl font-bold font-display">Revenue Trajectory</h3>
                    <p className="text-gray-500 text-xs md:text-sm">Path to $100K MRR</p>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-400 text-xl md:text-2xl font-bold">$67,432</div>
                    <div className="text-gray-500 text-xs md:text-sm">Current MRR</div>
                  </div>
                </div>
                {/* Simulated chart */}
                <div className="h-48 md:h-64 relative">
                  <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgb(245, 166, 35)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="rgb(245, 166, 35)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M0 180 Q50 170 100 140 T200 100 T300 50 T400 20"
                      fill="none"
                      stroke="#F5A623"
                      strokeWidth="3"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, ease: "easeOut" }}
                    />
                    <path
                      d="M0 180 Q50 170 100 140 T200 100 T300 50 T400 20 V200 H0 Z"
                      fill="url(#chartGradient)"
                    />
                  </svg>
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-600 px-2">
                    <span>Jan</span>
                    <span>Mar</span>
                    <span>May</span>
                    <span>Jul</span>
                    <span>Sep</span>
                    <span>Nov</span>
                  </div>
                  <div className="absolute top-0 right-0 bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full">
                    $100K Target
                  </div>
                </div>
              </motion.div>

              {/* Activity Feed */}
              <ActivityFeed />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 blur-3xl" />
              <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#111111] border border-amber-500/20 rounded-3xl p-8 md:p-12 lg:p-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 font-display">Ready to Hit $100K MRR?</h2>
                <p className="text-gray-400 text-base md:text-lg mb-6 md:mb-8 max-w-xl mx-auto">Join 2,400+ founders who've accelerated their path to six-figure revenue with REVENUE.AI</p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold rounded-xl text-base md:text-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-500/25"
                  >
                    Start 14-Day Free Trial
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 md:px-10 py-4 md:py-5 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-base md:text-lg hover:bg-white/10 transition-all duration-300"
                  >
                    Book a Demo
                  </motion.button>
                </div>
                <p className="text-gray-600 text-xs md:text-sm mt-4 md:mt-6">No credit card required · Setup in 5 minutes</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 md:py-12 px-4 md:px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-600 text-xs md:text-sm">
              Requested by <a href="https://twitter.com/SMBuilds_" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-400 transition-colors">@SMBuilds_</a> · Built by <a href="https://twitter.com/clonkbot" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-400 transition-colors">@clonkbot</a>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
