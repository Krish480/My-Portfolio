import { GitMerge, GitPullRequest, Flame, Code, Terminal } from "lucide-react";

export default function GithubStats() {
  // Generate mock contribution graph days (53 columns * 7 rows = 371 days)
  const totalDays = 371;
  const contributionGrid = Array.from({ length: totalDays }, (_, i) => {
    // Generate weighted random activity levels (0 to 4)
    const rand = Math.random();
    if (rand < 0.5) return 0; // No commits
    if (rand < 0.75) return 1; // Light blue
    if (rand < 0.9) return 2; // Medium blue
    if (rand < 0.97) return 3; // Cyan
    return 4; // Purple
  });

  const getContributionColor = (level) => {
    switch (level) {
      case 0:
        return "bg-white/[0.02] border border-white/[0.03]";
      case 1:
        return "bg-blue-900/40 border border-blue-800/10";
      case 2:
        return "bg-blue-600/50 border border-blue-500/20";
      case 3:
        return "bg-cyan-500/60 border border-cyan-400/20 shadow-[0_0_8px_rgba(6,182,212,0.3)]";
      case 4:
        return "bg-purple-600/70 border border-purple-500/20 shadow-[0_0_10px_rgba(139,92,246,0.4)]";
      default:
        return "bg-white/[0.02]";
    }
  };

  const activityStats = [
    {
      icon: <Flame className="w-5 h-5 text-amber-500 animate-pulse" />,
      label: "Yearly Contributions",
      value: "840+ Commits",
    },
    {
      icon: <GitPullRequest className="w-5 h-5 text-cyan-400" />,
      label: "Active Repositories",
      value: "12+ Live Projects",
    },
    {
      icon: <GitMerge className="w-5 h-5 text-purple-400" />,
      label: "PRs Merged & Collab",
      value: "45+ Merges",
    },
  ];

  const languages = [
    { name: "JavaScript", percent: 62, color: "bg-yellow-400" },
    { name: "React / HTML5", percent: 23, color: "bg-blue-500" },
    { name: "Python / Flask", percent: 15, color: "bg-green-500" },
  ];

  return (
    <section id="github" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            Activity
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
            GitHub <span className="text-gradient">Contributions</span>
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contribution Map */}
          <div className="lg:col-span-8 p-6 md:p-8 glass-card rounded-3xl border border-white/5 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono text-gray-400">krish480@contributions ~ bash</span>
              </div>
              <a
                href="https://github.com/Krish480"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-cyan-400 hover:underline flex items-center gap-1.5"
              >
                View GitHub Profile ↗
              </a>
            </div>

            {/* Grid Container */}
            <div className="overflow-x-auto pb-4">
              <div
                className="grid grid-flow-col gap-1.5"
                style={{
                  gridTemplateRows: "repeat(7, minmax(0, 1fr))",
                  width: "max-content",
                }}
              >
                {contributionGrid.map((level, i) => (
                  <div
                    key={i}
                    className={`w-3.5 h-3.5 rounded-sm transition-all duration-300 hover:scale-125 ${getContributionColor(
                      level
                    )}`}
                    title={`Activity Level ${level}`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Legend Map */}
            <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
              <span>Less active</span>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-white/[0.02] border border-white/[0.03]"></span>
                <span className="w-3 h-3 rounded-sm bg-blue-900/40 border border-blue-800/10"></span>
                <span className="w-3 h-3 rounded-sm bg-blue-600/50 border border-blue-500/20"></span>
                <span className="w-3 h-3 rounded-sm bg-cyan-500/60 border border-cyan-400/20"></span>
                <span className="w-3 h-3 rounded-sm bg-purple-600/70 border border-purple-500/20"></span>
              </div>
              <span>More active</span>
            </div>
          </div>

          {/* Right Column: Code Stats */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
            {/* Quick Metrics */}
            <div className="p-6 glass-card rounded-2xl border border-white/5 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400">Coding Metrics</h4>
              <div className="space-y-4">
                {activityStats.map((stat, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {stat.icon}
                      <span className="text-xs text-gray-400">{stat.label}</span>
                    </div>
                    <span className="text-sm font-extrabold text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Languages */}
            <div className="p-6 glass-card rounded-2xl border border-white/5 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                <Code className="w-4 h-4 text-cyan-400" /> Languages Distribution
              </h4>
              <div className="space-y-4">
                {/* Language bars */}
                <div className="space-y-3">
                  {languages.map((lang) => (
                    <div key={lang.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white font-medium">{lang.name}</span>
                        <span className="text-gray-400">{lang.percent}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${lang.color} rounded-full`}
                          style={{ width: `${lang.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="section-divider mt-24"></div>
    </section>
  );
}
