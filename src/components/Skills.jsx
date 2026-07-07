// import { useState } from "react";
// import { Code2, Database, Server, Wrench, Cpu, CheckCircle } from "lucide-react";

// export default function Skills() {
//   const [activeCategory, setActiveCategory] = useState("All");

//   const categories = ["All", "Frontend", "Backend", "Database", "Tools & Cloud"];

//   const skillsData = [
//     // Frontend
//     { name: "React.js", level: 90, category: "Frontend", icon: "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-1024.png" },
//     { name: "Next.js", level: 85, category: "Frontend", icon: "▲" },
//     { name: "Redux Toolkit", level: 80, category: "Frontend", icon: "🔄" },
//     { name: "Tailwind CSS", level: 95, category: "Frontend", icon: "🎨" },
//     { name: "JavaScript", level: 90, category: "Frontend", icon: "🟨" },
//     { name: "HTML5 & CSS3", level: 95, category: "Frontend", icon: "🌐" },

//     // Backend
//     { name: "Node.js", level: 85, category: "Backend", icon: "🟢" },
//     { name: "Express.js", level: 85, category: "Backend", icon: "🚂" },
//     { name: "Python", level: 80, category: "Backend", icon: "🐍" },
//     { name: "Flask", level: 75, category: "Backend", icon: "🌶️" },

//     // Database
//     { name: "MongoDB", level: 80, category: "Database", icon: "🍃" },
//     { name: "MySQL", level: 85, category: "Database", icon: "🐬" },

//     // Tools & Cloud
//     { name: "Firebase", level: 80, category: "Tools & Cloud", icon: "🔥" },
//     { name: "Git & GitHub", level: 90, category: "Tools & Cloud", icon: "🐙" },
//   ];

//   const filteredSkills =
//     activeCategory === "All"
//       ? skillsData
//       : skillsData.filter((s) => s.category === activeCategory);

//   const getCategoryIcon = (category) => {
//     switch (category) {
//       case "Frontend":
//         return <Code2 className="w-4 h-4 mr-1.5 text-cyan-400" />;
//       case "Backend":
//         return <Server className="w-4 h-4 mr-1.5 text-blue-500" />;
//       case "Database":
//         return <Database className="w-4 h-4 mr-1.5 text-purple-500" />;
//       case "Tools & Cloud":
//         return <Wrench className="w-4 h-4 mr-1.5 text-emerald-400" />;
//       default:
//         return <Cpu className="w-4 h-4 mr-1.5 text-cyan-400" />;
//     }
//   };

//   return (
//     <section id="skills" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
//       <div className="max-w-7xl mx-auto z-10 relative">
//         {/* Section Header */}
//         <div className="flex flex-col items-center text-center mb-16 space-y-3">
//           <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
//             Expertise
//           </span>
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
//             Skills & <span className="text-gradient">Technologies</span>
//           </h2>
//           <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
//         </div>

//         {/* Categories Tab Selector */}
//         <div className="flex flex-wrap justify-center items-center gap-3 mb-16">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setActiveCategory(category)}
//               className={`flex items-center px-5 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-300 border ${
//                 activeCategory === category
//                   ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent shadow-[0_4px_15px_rgba(6,182,212,0.25)]"
//                   : "bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10"
//               } cursor-pointer`}
//             >
//               {getCategoryIcon(category)}
//               {category}
//             </button>
//           ))}
//         </div>

//         {/* Skills Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filteredSkills.map((skill, idx) => (
//             <div
//               key={skill.name}
//               className="p-6 glass-card rounded-2xl border border-white/5 flex flex-col justify-between hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] group animate-fadeIn"
//               style={{ animationDelay: `${idx * 0.05}s` }}
//             >
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300 shadow-inner">
//                     {skill.icon}
//                   </div>
//                   <span className="text-xs font-semibold text-cyan-400/80 uppercase tracking-wider bg-cyan-400/5 px-2 py-1 rounded">
//                     {skill.category}
//                   </span>
//                 </div>

//                 <div>
//                   <h4 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
//                     {skill.name}
//                   </h4>
//                 </div>
//               </div>

//               {/* Progress Visualizer */}
//               <div className="mt-6 space-y-1.5">
//                 <div className="flex items-center justify-between text-xs">
//                   <span className="text-gray-500 font-semibold uppercase tracking-wider flex items-center gap-1">
//                     <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Proficiency
//                   </span>
//                   <span className="text-cyan-400 font-bold">{skill.level}%</span>
//                 </div>
//                 <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
//                   <div
//                     className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out"
//                     style={{ width: `${skill.level}%` }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="section-divider mt-24"></div>
//     </section>
//   );
// }
