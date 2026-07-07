import { Award, ShieldCheck, ExternalLink, Cpu } from "lucide-react";

export default function Certifications() {
  const certificationsList = [
    {
      title: "AWS APAC Solutions Architecture Simulation",
      issuer: "Forage | AWS APAC",
      date: "2024",
      description: "Completed a simulated solutions architect program designing cloud systems and serverless data pipes.",
      skills: ["AWS Lambda", "API Gateway", "Cloud Infrastructure", "Security Group Policies"],
      badgeColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
      title: "Accenture Developer Industry Simulation",
      issuer: "Forage | Accenture",
      date: "2024",
      description: "Completed industry simulation projects debugging frontend API models and implementing accessibility.",
      skills: ["Frontend Optimization", "Debugging API Integrations", "A11y Standards"],
      badgeColor: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    },
    {
      title: "DCA (Diploma in Computer Applications)",
      issuer: "MCU Bhopal University",
      date: "2022",
      description: "Earned a postgraduate-equivalent diploma on office suites, database administration, and basic coding paradigms.",
      skills: ["DBMS Fundamentals", "Operating Systems", "Programming Core Logic"],
      badgeColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    },
  ];

  return (
    <section id="certifications" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            Credentials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
            Certifications & <span className="text-gradient-cyan">Badges</span>
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificationsList.map((cert, idx) => (
            <div
              key={idx}
              className="p-6 glass-card rounded-2xl border border-white/5 flex flex-col justify-between hover:shadow-[0_15px_30px_rgba(6,182,212,0.05)] group"
            >
              <div className="space-y-4">
                {/* Badge Header */}
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-6 h-6 text-cyan-400" />
                  </div>
                  <span className="text-xs font-semibold text-gray-500">{cert.date}</span>
                </div>

                {/* Title */}
                <div>
                  <h4 className="text-lg font-bold text-white leading-snug group-hover:text-cyan-400 transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-gray-500 font-semibold mt-1 uppercase tracking-wider">
                    {cert.issuer}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-xs leading-relaxed">
                  {cert.description}
                </p>
              </div>

              {/* Skills Gained Tags */}
              <div className="mt-6 pt-4 border-t border-white/5 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Verified Gained Skills:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[9px] font-bold px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="section-divider mt-24"></div>
    </section>
  );
}
