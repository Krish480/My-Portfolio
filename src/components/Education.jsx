export default function Education() {
  return (
    <section
      id="education"
      className="flex flex-col items-center justify-center px-6 md:px-16 py-20 text-white relative overflow-hidden"
    >
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-3 tracking-wide">
          Education
        </h2>
        <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
      </div>

      {/* Education Card */}
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-5xl w-full border border-yellow-400/30 fade-in hover:scale-[1.02] transition-transform duration-500">
        <h3 className="text-2xl font-semibold text-white mb-2">
          Master of Computer Applications (MCA)
        </h3>
        <p className="text-yellow-400 font-medium mb-2">
          BIST (Bhopal), RGPV University | 2023 - 2025
        </p>
        <p className="text-gray-300 leading-relaxed">
          Pursuing MCA with a focus on{" "}
          <span className="text-yellow-400 font-semibold">Web Development</span>,{" "}
          <span className="text-yellow-400 font-semibold">Cloud Computing</span>, and{" "}
          <span className="text-yellow-400 font-semibold">Artificial Intelligence</span>.
          Developed multiple interactive web projects and completed a major project —{" "}
          <span className="text-yellow-400 font-semibold">Rudra Virtual AI Assistant</span>,
          integrating{" "}
          <span className="text-yellow-400 font-semibold">Flask, ElevenLabs API</span>, and{" "}
          <span className="text-yellow-400 font-semibold">OpenRouter (AI Models)</span>.
        </p>
      </div>
    </section>
  );
}
